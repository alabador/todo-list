import { currentProject, currentProjectName } from "./projects";

export function saveTaskToLocalStorage(task) {
    window.localStorage.setItem(task.title, JSON.stringify(task));
}

export function getTaskFromLocalStorage(task) {
    return JSON.parse(window.localStorage.getItem(task.title));
}


export function saveProjectToLocalStorage() {
    window.localStorage.setItem(currentProjectName, JSON.stringify(currentProject));
}

export function getFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem(currentProjectName));
}