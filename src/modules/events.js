import { createTask, newTask } from "./taskActions";
import { addTaskToDom, cancelForm } from "./dom";
import { createTaskInDom } from "./createElements";

function initCreateTaskEvent() {
    const createButton = document.querySelector('.add');
    createButton.addEventListener('click', createTask);
};

function cancelTaskCreateEvent() {
    const cancelButton = document.querySelector('.close-div');
    cancelButton.addEventListener('click', cancelForm);
};

function saveValuesEvent() {
    const form = document.querySelector('.form');
    form.addEventListener('submit', function(e) {
        addTaskToDom();
        e.preventDefault();
    });
};

export {initCreateTaskEvent, cancelTaskCreateEvent, saveValuesEvent};