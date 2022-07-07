import { createTask, newTask } from "./taskActions";
import { addTaskToDom, cancelForm } from "./dom";

function initCreateTaskEvent() {
    const createButton = document.querySelector('.add');
    createButton.addEventListener('click', createTask);
};

function cancelTaskCreateEvent() {
    const cancelButton = document.querySelector('.close-div');
    cancelButton.addEventListener('click', cancelForm);
};

function saveValuesEvent() {
    const formButton = document.querySelector('.form-button');
    formButton.addEventListener('click', addTaskToDom);
};

function getValues() {
    const valueArray = [];
    const inputs = document.querySelectorAll('.form-input');
    for (let i=0; i<inputs.length; i++) {
        const currentInputValue = inputs[i].value;
        valueArray.push(currentInputValue);
    }
    console.log(valueArray);
    return valueArray;
};

export {initCreateTaskEvent, cancelTaskCreateEvent, saveValuesEvent, getValues};