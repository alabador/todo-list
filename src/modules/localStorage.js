import { currentProject, currentProjectName, projects } from "./projects";

export function saveTaskToLocalStorage(task) {
    window.localStorage.setItem(task.title, JSON.stringify(task));
}

export function getTaskFromLocalStorage(task) {
    return JSON.parse(window.localStorage.getItem(task.title));
}


/*Functions below save created tasks in the current project*/
export function saveProjectToLocalStorage() {
    window.localStorage.setItem(currentProjectName, JSON.stringify(currentProject));
}

export function getFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem(currentProjectName));
}

/*Purpose of below functions are to saved created projects*/
export function saveProjectListToLocalStorage() {
    window.localStorage.setItem('projectList', JSON.stringify(projects));
}

export function getProjectListFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem('projectList'));
}