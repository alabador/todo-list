import { addProjectEvent, initCreateTaskEvent, } from "./events";
import { currentProject, projects, setProject } from "./projects";

export function initialPageLoad() {
    initCreateTaskEvent();
    setProject('all');
    addProjectEvent();
};

export function displayTaskList() {

}

export function getTasks() {
    console.log(currentProject);
}