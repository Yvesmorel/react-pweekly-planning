var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "@testing-library/jest-dom";
import ical from "ical";
export function parseICSToTasks(icsData, group) {
    var _a;
    const events = ical.parseICS(icsData);
    const tasks = [];
    for (const key in events) {
        const event = events[key];
        if (event.type === "VEVENT") {
            const taskStart = event.start
                ? new Date(event.start).getTime()
                : new Date().getTime();
            const taskEnd = event.end
                ? new Date(event.end).getTime()
                : new Date().getTime();
            const taskDate = event.start ? new Date(event.start) : new Date();
            const taskSummary = event.summary || "";
            const taskLocation = event.location || "";
            const taskTimezone = "";
            const taskCreatedAt = event.created
                ? new Date(event.created)
                : new Date();
            const taskExpiryDate = ((_a = event.rrule) === null || _a === void 0 ? void 0 : _a.options.until)
                ? new Date(event.rrule.options.until)
                : new Date();
            const task = {
                taskStart,
                taskEnd,
                taskDate,
                taskSummary,
                taskLocation,
                taskTimzone: taskTimezone,
                groupId: group,
                dayIndex: taskDate.getDay() || 0,
                taskId: event.uid || "",
                taskCreatedAt,
                taskExpiryDate,
            };
            tasks.push(task);
            if (!event.start)
                return [];
            // Gestion des occurrences récurrentes
            if (event.rrule) {
                const occurrences = event.rrule.between(event.start, taskExpiryDate || new Date());
                occurrences.forEach((occurrence) => {
                    tasks.push(Object.assign(Object.assign({}, task), { taskStart: occurrence.getTime(), taskEnd: occurrence.getTime() + (taskEnd - taskStart), taskDate: new Date(occurrence.getTime()), dayIndex: new Date(occurrence.getTime()).getDay() }));
                });
            }
        }
    }
    return tasks;
}
import axios from "axios";
// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed
const convert = (fileLocation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = fileLocation.map((link) => __awaiter(void 0, void 0, void 0, function* () {
            const icsRes = yield axios.get(link);
            const icstext = yield icsRes.data;
            const data = parseICSToTasks(icstext, "morel");
            return data;
        }));
        console.log(task);
        return "success";
    }
    catch (error) {
        return "error";
    }
});
export function convertTasksToIcsFormat(tasks) {
    const ics = tasks.reduce((previousIcs, task) => {
        previousIcs += `

        BEGIN:VCALENDAR
        VERSION:1.0
        BEGIN:VEVENT
        DTSTART:${task.taskStart}
        DTEND:${task.taskEnd}
        LOCATION:
        DESCRIPTION:Purpose: Provide example of this file type Document file type: ICS Version: 1.0 Created by http://www.online-convert.com More example files: http://www.online-convert.com/file-type License: http://creativecommons.org/licenses Feel free to use & share the file according to the license above.
        SUMMARY:ICS test file
        PRIORITY:3
        END:VEVENT
        END:VCALENDAR

    `;
        return previousIcs;
    }, "");
    return ics;
}
test("the fetch fails with an error", () => {
    return convert([
        "https://firebasestorage.googleapis.com/v0/b/ashtonv2.appspot.com/o/example.ics?alt=media&token=679cab97-cde2-4074-b96f-b63c10f1b7e2",
        "https://firebasestorage.googleapis.com/v0/b/ashtonv2.appspot.com/o/example.ics?alt=media&token=679cab97-cde2-4074-b96f-b63c10f1b7e2",
    ]).catch((error) => expect(error).toMatch("error"));
});
