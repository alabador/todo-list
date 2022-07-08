import { Task } from "./task";
import { openForm } from "./dom";
import { cancelTaskCreateEvent, saveValuesEvent } from "./events";

export let tasks = [];

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

function getValues() {
    const valueArray = [];
    const inputs = document.querySelectorAll('.form-input');
    for (let i=0; i<inputs.length; i++) {
        const currentInputValue = inputs[i].value;
        valueArray.push(currentInputValue);
    }
    return valueArray;
};

// export function addTaskToList() {
//     const task = newTask();
//     tasks.push(task);
// }

// function getTaskTitle(array) {
//     const title = array[0];
//     return title;
// }

function editTaskProperties() {
    /*Task formation - fill out fields to get task properties*/
    
};