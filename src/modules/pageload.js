import { initCreateTaskEvent, } from "./events";
import { tasks } from "./taskActions";

export function initialPageLoad() {
    initCreateTaskEvent();
};

export function displayTaskList() {

}

export function getTasks() {
    console.log(tasks);
}