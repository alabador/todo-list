import { addProjectEvent, initCreateTaskEvent, selectCurrentProjectEvent, } from "./events";
import { currentProject, projects, setProject } from "./projects";

export function initialPageLoad() {
    initCreateTaskEvent();
    setProject('all');
    addProjectEvent();
    selectCurrentProjectEvent();
};

export function displayTaskList() {

}

export function getTasks() {
    console.log(currentProject);
}