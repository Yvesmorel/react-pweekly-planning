import { render } from "@testing-library/react";
import Calendar from "..";
import "@testing-library/jest-dom";
import { TaskFeildsType } from "../definitions";
import { icsToJson } from "ics-to-json";

import ical from "ical";

export function parseICSToTasks(
  icsData: string,
  group: string
): TaskFeildsType[] {
  const events = ical.parseICS(icsData);
  const tasks: TaskFeildsType[] = [];

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
      const taskExpiryDate = event.rrule?.options.until
        ? new Date(event.rrule.options.until)
        : new Date();

      const task: TaskFeildsType[][number] = {
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

      if (!event.start) return [];

      // Gestion des occurrences récurrentes
      if (event.rrule) {
        const occurrences = event.rrule.between(
          event.start,
          taskExpiryDate || new Date()
        );

        occurrences.forEach((occurrence) => {
          tasks.push({
            ...task,
            taskStart: occurrence.getTime(),
            taskEnd: occurrence.getTime() + (taskEnd - taskStart),
            taskDate: new Date(occurrence.getTime()),
            dayIndex: new Date(occurrence.getTime()).getDay(),
          });
        });
      }
    }
  }

  return tasks;
}

import axios from "axios";
// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed
const convert = async (fileLocation: string[]) => {

  try {
    const task = fileLocation.map(async (link)  => {
      const icsRes = await axios.get(link);
      const icstext:string = await icsRes.data;
      const data = parseICSToTasks(icstext, "morel");
      return data;
    });

    console.log(task);
    return "success";
  } catch (error) {
    return "error";
  }
};


export function convertTasksToIcsFormat(tasks: TaskFeildsType[]) {
  const ics = tasks.reduce((previousIcs: string, task: TaskFeildsType) => {
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
