import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { Task, TaskFeildsType, TasksStore } from "../definitions";
import { getHash, updateOffsetWithDateCalendar } from "../lib/utils";



const STORAGE_KEY = "calendar_tasks";

export function useCalendarTask(hashScope: "week" | "group" | "day", timeZone?: string) {


    const tasksRef = useRef<TasksStore>({ buckets: {}, dataLength: 0, taskCache: {} });
    const scheduleCleanRef = useRef<() => void>(null);
    const [render, forceRender] = useState(0);




    const cleanExpiredTasks = () => {
        const store = tasksRef.current;
        let newDataLength = 0;

        for (const hash in store.buckets) {
            const bucket = store.buckets[hash];


            const validTasks = bucket.list.filter(isValidTask);
            newDataLength += validTasks.length;

            if (validTasks.length === bucket.list.length) continue;


            const newIndexMap: Record<string, number> = {};
            let sumOfTaskDuration = 0;
            validTasks.forEach((task, index) => {
                newIndexMap[task.id] = index;
                sumOfTaskDuration += task.taskEnd - task.taskStart;
            });


            store.buckets[hash] = {
                list: validTasks,
                indexMap: newIndexMap,
                sumOfTaskDuration,
            };
        }

        store.dataLength = newDataLength;
        saveToStorage();
        forceRender((x) => x + 1);
    };

    const cleanExpiredTasksByHash = (hash: string) => {
        const bucket = tasksRef.current.buckets[hash];
        if (!bucket) return;


        const validTasks = bucket.list.filter(isValidTask);


        if (validTasks.length === bucket.list.length) return;

        const removedCount = bucket.list.length - validTasks.length;
        tasksRef.current.dataLength -= removedCount;

        const newIndexMap: Record<string, number> = {};
        let sumOfTaskDuration = 0;
        validTasks.forEach((task, index) => {
            newIndexMap[task.id] = index;
            sumOfTaskDuration += task.taskEnd - task.taskStart;
        });


        tasksRef.current.buckets[hash] = {
            list: validTasks,
            indexMap: newIndexMap,
            sumOfTaskDuration,
        };

        saveToStorage();
        forceRender((x) => x + 1);
    };




    if (!scheduleCleanRef.current) {
        scheduleCleanRef.current = (() => {
            let timeout: any;

            return () => {
                clearTimeout(timeout);

                timeout = setTimeout(() => {
                    if ("requestIdleCallback" in window) {
                        requestIdleCallback(() => {
                            cleanExpiredTasks();
                        });
                    } else {
                        setTimeout(() => cleanExpiredTasks(), 0);
                    }
                }, 2000);
            };
        })();
    }

    const scheduleClean = scheduleCleanRef.current;

    const getNow = () => {
        const now = new Date();
        if (timeZone) {
            return new Date(now.toLocaleString("en-US", { timeZone }));
        }
        return now;
    };


    const isValidTask = (task: Task) => {
        if (!task.taskExpiryDate) return false;
        return new Date(task.taskExpiryDate) > getNow();
    };

    // 💾 SAVE → O(1)
    const saveToStorage = () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasksRef.current)
        );
    };

    // 📦 LOAD (sans clean)
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return;


        tasksRef.current = JSON.parse(stored);
        forceRender((x) => x + 1);
    }, []);

    // ➕ ADD → O(1)
    const addTask = (task: Task) => {
        const offset = updateOffsetWithDateCalendar(task.taskDate)
        const hash = getHash(offset, task.groupId, task.dayIndex)[hashScope]

        if (!tasksRef.current.buckets[hash]) {
            tasksRef.current.buckets[hash] = {
                list: [],
                indexMap: {},
                sumOfTaskDuration: 0,
            };
        }


        const bucket = tasksRef.current.buckets[hash];
        const index = bucket.list.length;


        bucket.list.push({ ...task, hash });
        bucket.indexMap[task.id] = index;
        bucket.sumOfTaskDuration += task.taskEnd - task.taskStart;
        tasksRef.current.dataLength++;

        saveToStorage();
        scheduleClean();
        forceRender((x) => x + 1);

    };


    const getTasks = (hash: string): Task[] => {
        const bucket = tasksRef.current.buckets[hash];
        if (!bucket) return [];

        return bucket.list
    };

    const getTask = (hash: string, taskId: string) => {
        const bucket = tasksRef.current.buckets[hash];
        if (!bucket) return;
        const index = bucket.indexMap[taskId]
        if (index === undefined) return;
        return bucket.list[index]
    };
    // ✏️ UPDATE → O(1)
    const updateTask = (
        hash: string,
        taskId: string,
        updatedTask: Partial<Task>
    ) => {

        const bucket = tasksRef.current.buckets[hash];
        if (!bucket) return;


        const index = bucket.indexMap[taskId];


        if (index === undefined) return;


        const oldTAskDuration = bucket.list[index].taskEnd - bucket.list[index].taskStart;
        if (updatedTask.taskEnd && updatedTask.taskStart) {
            const newTAskDuration = updatedTask.taskEnd - updatedTask.taskStart;

            if (newTAskDuration !== oldTAskDuration) {
                bucket.sumOfTaskDuration = bucket.sumOfTaskDuration - oldTAskDuration + newTAskDuration;
            }
        }
        bucket.list[index] = {
            ...bucket.list[index],
            ...updatedTask,
        };


        saveToStorage();
        scheduleClean();
        forceRender((x) => x + 1);
    };

    // ❌ DELETE → O(1)
    const deleteTask = (hash: string, taskId: string) => {
        const bucket = tasksRef.current.buckets[hash];
        if (!bucket) return;

        const index = bucket.indexMap[taskId];
        if (index === undefined) return;

        const lastIndex = bucket.list.length - 1;
        const lastTask = bucket.list[lastIndex];

        const oldTAskDuration = bucket.list[index].taskEnd - bucket.list[index].taskStart;


        [bucket.list[index], bucket.list[lastIndex]] = [
            bucket.list[lastIndex],
            bucket.list[index],
        ];

        bucket.indexMap[lastTask.id] = index;

        bucket.list.pop();
        delete bucket.indexMap[taskId];
        bucket.sumOfTaskDuration -= oldTAskDuration;
        tasksRef.current.dataLength--;

        saveToStorage();
        scheduleClean();
        forceRender((x) => x + 1);

    };

    const tasks = useMemo(() => ({
        ...tasksRef.current
    }), [render]);

    return {
        tasks,
        addTask,
        getTasks,
        updateTask,
        deleteTask,
        cleanExpiredTasks,
        cleanExpiredTasksByHash,
        isValidTask,
        getTask
    };
}
