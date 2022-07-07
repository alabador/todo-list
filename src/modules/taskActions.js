import { Task } from "./task";
import { openForm } from "./dom";
import { cancelTaskCreateEvent, getValues, saveValuesEvent } from "./events";

const tasks = [];

export function createTask() {
    openForm();
    cancelTaskCreateEvent();
    saveValuesEvent();
};

export function newTask() {
    const propertiesArray = getValues();
    const task = new Task(...propertiesArray);
    return task;
};

// function getTaskTitle(array) {
//     const title = array[0];
//     return title;
// }

function editTaskProperties() {
    /*Task formation - fill out fields to get task properties*/
    
};