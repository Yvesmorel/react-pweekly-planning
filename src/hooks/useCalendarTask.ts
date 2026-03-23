import { useCallback, useEffect, useRef, useState } from "react";
import { TaskFeildsType } from "../definitions";

type Task = TaskFeildsType

type TaskBucket = {
    list: Task[];
    indexMap: Record<string, number>;
};

type TasksStore = Record<string, TaskBucket>;

const STORAGE_KEY = "calendar_tasks";

export function useCalendarTask(timeZone?: string) {


    const tasksRef = useRef<TasksStore>({});
    const scheduleCleanRef = useRef<() => void>(null);
    const [render, forceRender] = useState(0);



    const cleanExpiredTasks = () => {
        const store = tasksRef.current;

        for (const hash in store) {
            const bucket = store[hash];


            const validTasks = bucket.list.filter(isValidTask);

            if (validTasks.length === bucket.list.length) continue;


            const newIndexMap: Record<string, number> = {};

            validTasks.forEach((task, index) => {
                newIndexMap[task.id] = index;
            });


            store[hash] = {
                list: validTasks,
                indexMap: newIndexMap,
            };
        }

        saveToStorage();
        forceRender((x) => x + 1);
    };

    const cleanExpiredTasksByHash = (hash: string) => {
        const bucket = tasksRef.current[hash];
        if (!bucket) return;


        const validTasks = bucket.list.filter(isValidTask);


        if (validTasks.length === bucket.list.length) return;


        const newIndexMap: Record<string, number> = {};

        validTasks.forEach((task, index) => {
            newIndexMap[task.id] = index;
        });


        tasksRef.current[hash] = {
            list: validTasks,
            indexMap: newIndexMap,
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
    const addTask = (hash: string, task: Task) => {
        if (!tasksRef.current[hash]) {
            tasksRef.current[hash] = {
                list: [],
                indexMap: {},
            };
        }

        const bucket = tasksRef.current[hash];
        const index = bucket.list.length;

        bucket.list.push(task);
        bucket.indexMap[task.id] = index;

        saveToStorage();
        scheduleClean();
        forceRender((x) => x + 1);
    };


    const getTasks = (hash: string): Task[] => {
        const bucket = tasksRef.current[hash];
        if (!bucket) return [];

        return bucket.list
    };

    const getTask = (hash: string, taskId: string) => {
        const bucket = tasksRef.current[hash];
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
        const bucket = tasksRef.current[hash];


        if (!bucket) return;

        const index = bucket.indexMap[taskId];


        if (index === undefined) return;

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
        const bucket = tasksRef.current[hash];
        if (!bucket) return;

        const index = bucket.indexMap[taskId];
        if (index === undefined) return;

        const lastIndex = bucket.list.length - 1;
        const lastTask = bucket.list[lastIndex];

        [bucket.list[index], bucket.list[lastIndex]] = [
            bucket.list[lastIndex],
            bucket.list[index],
        ];

        bucket.indexMap[lastTask.id] = index;

        bucket.list.pop();
        delete bucket.indexMap[taskId];

        saveToStorage();
        scheduleClean();
        forceRender((x) => x + 1);
    };

    return {
        tasks: tasksRef.current,
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