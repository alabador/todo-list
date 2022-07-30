import { defaultView } from "./dom";
import { addProjectEvent, deleteProject, initCreateTaskEvent, selectCurrentProjectEvent, } from "./events";
import { getProjectListFromLocalStorage } from "./localStorage";
import { currentProject, projects, setProject } from "./projects";

export function initialPageLoad() {
    initCreateTaskEvent();
    setProject('all');
    addProjectEvent();
    selectCurrentProjectEvent();
    deleteProject();
    getProjectListFromLocalStorage();
    defaultView();
};

export function displayTaskList() {

}

export function getTasks() {
    console.log(currentProject);
}