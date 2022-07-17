import { initCreateTaskEvent, } from "./events";
import { currentProject } from "./projects";

export function initialPageLoad() {
    initCreateTaskEvent();
};

export function displayTaskList() {

}

export function getTasks() {
    console.log(currentProject);
}