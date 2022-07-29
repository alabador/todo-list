import { defaultView } from "./dom";
import { addProjectEvent, deleteProject, initCreateTaskEvent, selectCurrentProjectEvent, } from "./events";
import { currentProject, projects, setProject } from "./projects";

export function initialPageLoad() {
    initCreateTaskEvent();
    setProject('all');
    addProjectEvent();
    selectCurrentProjectEvent();
    deleteProject();
    defaultView();
};

export function displayTaskList() {

}

export function getTasks() {
    console.log(currentProject);
}