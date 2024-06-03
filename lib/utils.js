var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import moment from "moment";
// Obtenir la date actuelle
const currentDate = new Date();
// Obtenir le jour de la semaine (dimanche = 0, lundi = 1, ..., samedi = 6)
const currentDayOfWeek = currentDate.getDay();
// Calculer la date de début de la semaine en millisecondes
const startDate = new Date(currentDate);
startDate.setDate(startDate.getDate() - currentDayOfWeek);
startDate.setHours(0, 0, 0, 0);
const startDateMilliseconds = startDate.getTime();
// Calculer la date de fin de la semaine en millisecondes
const endDate = new Date(currentDate);
endDate.setDate(endDate.getDate() + (6 - currentDayOfWeek));
endDate.setHours(23, 59, 59, 999);
const endDateMilliseconds = endDate.getTime();
function getDayHourly(weekOffset) {
    const dailyHours = [];
    let dayOffset = weekOffset;
    if (currentDate.getDay() === 0) {
        dayOffset = dayOffset - 7;
    }
    // Boucle pour calculer les heures de début et de fin de chaque jour de la semaine
    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startDate);
        dayDate.setDate(startDate.getDate() + i);
        const dayStart = new Date(dayDate);
        dayStart.setHours(1, 0, 0, 0);
        const dayEnd = new Date(dayDate);
        dayEnd.setHours(23, 59, 59, 59);
        dailyHours.push({
            positionDay: i,
            day: new Date(dayStart.getTime() + dayOffset * 86400000),
            start: dayStart.getTime() + dayOffset * 86400000,
            end: dayEnd.getTime() + dayOffset * 86400000,
        });
    }
    return dailyHours;
}
// Tableau pour stocker les heures de début et de fin de chaque jour de la semaine
function millisecondsToDate(milliseconds) {
    const date = new Date(milliseconds);
    // Récupération du jour de la semaine
    const daysOfWeek = ["Mon", "Tues", "Wed", "Thur", "Frid", "Sat", "Sun"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    // Récupération de l'heure
    let hours = date.getHours();
    // Conversion de l'heure au format 12 heures
    // hours = hours % 12 || 12;
    // Récupération des minutes
    const minutes = date.getMinutes();
    // Construction de la date au format souhaité
    const formattedDate = `${hours.toString().padStart(2, "0")}h:${minutes
        .toString()
        .padStart(2, "0")}`;
    return { formattedDate, dayOfWeek };
}
function millisecondsToInt(milliseconds) {
    const date = new Date(milliseconds);
    // Récupération du jour de la semaine
    const daysOfWeek = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    // Récupération du jour du mois
    const dayOfMonth = date.getDate();
    // Récupération du mois
    const months = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
    ];
    const month = months[date.getMonth()];
    // Récupération de l'heure
    let hours = date.getHours();
    const amOrPm = hours >= 12 ? " pm" : " am";
    // Conversion de l'heure au format 12 heures
    // hours = hours % 12 || 12;
    // Récupération des minutes
    const minutes = date.getMinutes();
    // Construction de la date au format souhaité
    const formattedDate = hours.toString().padStart(2, "0");
    return { formattedDate, dayOfWeek };
}
function getWeekDays(jump) {
    const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Frid", "Sat"];
    const month = [
        "Jan",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jui",
        "Juil",
        "Aôu",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // Récupérer le jour de la semaine (0 pour dimanche, 1 pour lundi, etc.)
    let weekDays = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date();
        const diff = i - currentDayOfWeek;
        if (currentDayOfWeek === 0) {
            day.setDate(currentDate.getDate() + diff + jump - 7);
        }
        else {
            day.setDate(currentDate.getDate() + diff + jump);
        }
        const formattedDay = `${days[day.getDay()]}. ${day.getDate()},  ${month[day.getMonth()]}  ${day.getFullYear()}`;
        weekDays.push({
            day: days[day.getDay()],
            dayMonth: month[day.getMonth()],
            dayYear: day.getFullYear(),
            dayOfTheMonth: day.getDate(),
        });
    }
    return weekDays;
}
function getCalandarDays(jump) {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const month = [
        "Jan",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jui",
        "Juil",
        "Aôu",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // Récupérer le jour de la semaine (0 pour dimanche, 1 pour lundi, etc.)
    let weekDays = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date();
        const diff = i - currentDayOfWeek;
        day.setDate(currentDate.getDate() + diff + jump);
        const formattedDay = day;
        weekDays.push(formattedDay);
    }
    return weekDays;
}
function getWeekMonthAndYear(jump) {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // Récupérer le jour de la semaine (0 pour dimanche, 1 pour lundi, etc.)
    let weekMonthYear = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date();
        const diff = i - currentDayOfWeek;
        day.setDate(currentDate.getDate() + diff + jump);
        const formattedDay = `${days[day.getMonth()]} - ${day.getFullYear()}`;
        weekMonthYear.push(formattedDay);
    }
    return weekMonthYear;
}
function displayDayOnModalLeft(jump) {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // Récupérer le jour de la semaine (0 pour dimanche, 1 pour lundi, etc.)
    let dayModal = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date();
        const diff = i - currentDayOfWeek;
        day.setDate(currentDate.getDate() + diff + jump);
        dayModal.push(day);
    }
    return dayModal;
}
function getWeeksListUpdate(annee) {
    // Créer un objet Date pour le premier jour de l'année
    const premierJour = new Date(annee, 0, 1);
    // Créer un tableau vide pour stocker les semaines
    const weeksList = [];
    // Créer des tableaux pour les jours de la semaine et les mois
    const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const months = [
        "Jan",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jui",
        "Juil",
        "Aôu",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    // Obtenir le nombre de semaines dans l'année
    const nombreSemaines = moment().year(annee).weeksInYear();
    // Faire une boucle sur les semaines
    for (let i = 0; i < nombreSemaines; i++) {
        // Calculer le début et la fin de la semaine en ajoutant le nombre de jours correspondant
        const weekStart = new Date(annee, 0, 1 + i * 7 - premierJour.getDay());
        const weekEnd = new Date(annee, 0, 1 + i * 7 - premierJour.getDay() + 6);
        // Formater les dates au format souhaité
        const formattedStart = `${daysOfWeek[weekStart.getDay()]}.${weekStart.getDate()}  ${months[weekStart.getMonth()]}  ${weekStart.getFullYear()}`;
        const formattedEnd = `${daysOfWeek[weekEnd.getDay()]}.${weekEnd.getDate()}  ${months[weekEnd.getMonth()]}  ${weekEnd.getFullYear()}`;
        // Ajouter la semaine au tableau
        weeksList.push(`${formattedStart} - ${formattedEnd}`);
    }
    // Retourner le tableau des semaines
    return weeksList;
}
function getWeeksList() {
    const today = new Date();
    const weeksList = [];
    const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const months = [
        "Jan",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jui",
        "Juil",
        "Aôu",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    for (let i = -5; i <= 5; i++) {
        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i * 7 - today.getDay());
        const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i * 7 - today.getDay() + 6);
        const options = {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        };
        const dayOfWeek = daysOfWeek[weekStart.getDay()];
        const formattedStart = `${daysOfWeek[weekStart.getDay()]}.${weekStart.getDate()}  ${months[weekStart.getMonth()]}  ${weekStart.getFullYear()}`;
        // const formattedStart = weekStart.toLocaleDateString('fr-FR', options);
        const formattedEnd = `${daysOfWeek[weekEnd.getDay()]}.${weekEnd.getDate()}  ${months[weekEnd.getMonth()]}  ${weekEnd.getFullYear()}`;
        weeksList.push(`${formattedStart} - ${formattedEnd}`);
    }
    return weeksList;
}
function getDoubleWeeksList() {
    const today = new Date();
    const weeksList = [];
    const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const months = [
        "Jan",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jui",
        "Juil",
        "Aôu",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    for (let i = -5; i <= 5; i++) {
        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i * 7 - today.getDay());
        const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i * 7 - today.getDay() + 13);
        const options = {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        };
        const dayOfWeek = daysOfWeek[weekStart.getDay()];
        const formattedStart = `${daysOfWeek[weekStart.getDay()]}.${weekStart.getDate()}  ${months[weekStart.getMonth()]}  ${weekStart.getFullYear()}`;
        // const formattedStart = weekStart.toLocaleDateString('fr-FR', options);
        const formattedEnd = `${daysOfWeek[weekEnd.getDay()]}.${weekEnd.getDate()}  ${months[weekEnd.getMonth()]}  ${weekEnd.getFullYear()}`;
        weeksList.push(`${formattedStart} - ${formattedEnd}`);
    }
    return weeksList;
}
function formatDateToCustomFormat(dateString) {
    // Tableau contenant les noms des jours de la semaine en français
    const daysOfWeek = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
    ];
    // Tableau contenant les noms des mois en français
    const months = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
    ];
    // Créer un objet Date à partir de la chaîne de caractères
    const date = new Date(dateString);
    // Récupérer le jour de la semaine, le jour du mois et le mois
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    // Formater la date dans le format 'jour_de_la_semaine jour_du_mois mois'
    const formattedDate = `${dayOfWeek} ${dayOfMonth} ${month}`;
    return formattedDate;
}
function clickedDate(dateString) {
    // Créer un objet Date à partir de la chaîne de caractères
    const date = new Date(dateString);
    return date;
}
const calculateTimeOfDayRange = (start, end) => {
    const hourToMillisecond = 3600000;
    const range = [];
    for (let i = start; i < end; i += hourToMillisecond) {
        range.push(i);
    }
    return range;
};
/**
 * Get the ISO week number for a given date.
 * @param date - The date to get the week number for.
 * @returns The ISO week number.
 */
function getWeekNumber(date) {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return weekNumber;
}
/**
 * Update the selected date to avoid issues with weeks starting on Sunday.
 * @param dateSelectionnee - The selected date.
 * @returns The updated date.
 */
function updateSelectedDateForEcartSemaine(dateSelectionnee) {
    const updatedDate = new Date(dateSelectionnee.getTime());
    if (updatedDate.getDay() === 0) {
        updatedDate.setDate(updatedDate.getDate() + 1);
    }
    return updatedDate;
}
/**
 * Calculate the week difference between the selected date and the current date.
 * @param dateSelectionnee - The selected date.
 * @returns The week difference in days.
 */
function calculerEcartSemaine(dateSelectionnee) {
    if (!dateSelectionnee) {
        return 0;
    }
    const selectedDateUpdated = updateSelectedDateForEcartSemaine(dateSelectionnee);
    const dateActuelle = new Date();
    const anneeActuelle = dateActuelle.getFullYear();
    const numeroSemaineActuelle = getWeekNumber(dateActuelle);
    const anneeSelectionnee = selectedDateUpdated.getFullYear();
    const numeroSemaineSelectionnee = getWeekNumber(selectedDateUpdated);
    const ecartSemaine = semainesDepuisOrigine(anneeSelectionnee, numeroSemaineSelectionnee) -
        semainesDepuisOrigine(anneeActuelle, numeroSemaineActuelle);
    return ecartSemaine * 7;
}
/**
 * Calculate the number of weeks since an arbitrary origin date (January 1, 2022).
 * @param annee - The year.
 * @param numeroSemaine - The week number.
 * @returns The number of weeks since the origin date.
 */
function semainesDepuisOrigine(annee, numeroSemaine) {
    const dateActuelle = new Date();
    const dateOrigine = new Date(dateActuelle.getFullYear() - 2, 0, 1);
    console.log(dateOrigine);
    const anneeOrigine = dateOrigine.getFullYear();
    const numeroSemaineOrigine = getWeekNumber(dateOrigine);
    let nombreSemaines = 0;
    for (let i = anneeOrigine; i < annee; i++) {
        nombreSemaines += moment().year(i).isoWeeksInYear();
    }
    nombreSemaines += numeroSemaine - numeroSemaineOrigine;
    return nombreSemaines;
}
function getSessionStorageRecordForDragAndDrop(tasks, positionDay, dropGroupId) {
    const dragtaskId = window.sessionStorage.getItem("calendardragtaskId");
    const dragtaskStart = window.sessionStorage.getItem("calendardragtaskStart");
    const dragtaskEnd = window.sessionStorage.getItem("calendardragtaskEnd");
    const dragdayIndex = window.sessionStorage.getItem("calendardragdayIndex");
    let newTask;
    let newTasks = [];
    window.sessionStorage.clear();
    if (!dragdayIndex || !dragtaskStart || !dragtaskEnd || !dragtaskId || !tasks)
        return;
    const dragTask = tasks.find((task) => task.taskId === dragtaskId);
    const dayIndex = parseInt(dragdayIndex);
    let ecartDaysIndex = positionDay - dayIndex;
    const convertTaskDropStart = new Date(parseInt(dragtaskStart));
    convertTaskDropStart.setDate(convertTaskDropStart.getDate() + ecartDaysIndex);
    const taskDropStart = convertTaskDropStart.getTime();
    let convertTaskDropEnd = new Date(parseInt(dragtaskEnd));
    convertTaskDropEnd.setDate(convertTaskDropEnd.getDate() + ecartDaysIndex);
    const taskDropEnd = convertTaskDropEnd.getTime();
    const taskDropDate = new Date(taskDropStart);
    if (dragTask) {
        const { taskStart, taskEnd, taskDate, groupId, dayIndex } = dragTask, rest = __rest(dragTask, ["taskStart", "taskEnd", "taskDate", "groupId", "dayIndex"]);
        newTask = Object.assign({ taskStart: taskDropStart, taskEnd: taskDropEnd, taskDate: taskDropDate, groupId: dropGroupId, dayIndex: positionDay }, rest);
        const dragTaskIndex = tasks.findIndex((task) => task.taskId === dragtaskId);
        newTasks = [...tasks];
        newTasks.splice(dragTaskIndex, 1, newTask);
    }
    return { taskDropStart, taskDropEnd, taskDropDate, newTask, newTasks };
}
function compareWeekOffset(calendarDate, weekOffset, taskDate) {
    if (taskDate.getDay() === 0 && calculerEcartSemaine(taskDate) === -7) {
        return true;
    }
    if (calendarDate)
        return (calculerEcartSemaine(calendarDate) === calculerEcartSemaine(taskDate));
    return weekOffset === calculerEcartSemaine(taskDate);
}
const sumHoursByGroups = (groupId, tasks, weekOffset, calendarDate) => {
    let sum = 0;
    tasks === null || tasks === void 0 ? void 0 : tasks.forEach((task) => {
        if (task.groupId === groupId &&
            compareWeekOffset(calendarDate, weekOffset, task.taskDate) === true) {
            sum += (task.taskEnd - task.taskStart) / 3600000;
        }
    });
    return sum;
};
function saveTasksToLocalStorage(tasks) {
    const tasksSavedString = window.localStorage.getItem("CalendarTaskSaved");
    const tasksString = JSON.stringify(tasks);
    if (tasksSavedString === tasksString)
        return;
    if (tasksString === "[]")
        return;
    const backup = [...tasks.filter((task) => task.taskExpiryDate)];
    window.localStorage.setItem("CalendarTaskSaved", JSON.stringify(backup));
}
export { getWeeksListUpdate, saveTasksToLocalStorage, clickedDate, getCalandarDays, startDateMilliseconds, endDateMilliseconds, getDayHourly, millisecondsToDate, getWeekDays, formatDateToCustomFormat, displayDayOnModalLeft, millisecondsToInt, getWeekMonthAndYear, getWeeksList, getDoubleWeeksList, calculerEcartSemaine, calculateTimeOfDayRange, getSessionStorageRecordForDragAndDrop, compareWeekOffset, sumHoursByGroups, };
