import { addProjectEvent, deleteProject, initCreateTaskEvent, selectCurrentProjectEvent, } from "./events";
import { currentProject, projects, setProject } from "./projects";

export function initialPageLoad() {
    initCreateTaskEvent();
    setProject('all');
    addProjectEvent();
    selectCurrentProjectEvent();
    deleteProject();
};

export function displayTaskList() {

}

export function getTasks() {
    console.log(currentProject);
}