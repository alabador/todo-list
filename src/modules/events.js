import { createTask, newTask } from "./taskActions";
import { addTaskToDom, cancelForm, editTaskInDom } from "./dom";
import { createTaskInDom } from "./createElements";
import { getTasks } from "./pageload";
import { tasks } from "./taskActions";

function initCreateTaskEvent() {
    const createButton = document.querySelector('.add');
    createButton.addEventListener('click', createTask);
};

function cancelTaskCreateEvent() {
    const cancelButton = document.querySelector('.close-div');
    cancelButton.addEventListener('click', cancelForm);
};

//start editing logic from here, in addtasktodom in dom.js
function saveValuesEvent() {
    const form = document.querySelector('.form');
    form.addEventListener('submit', function(e) {
        addTaskToDom();
        e.preventDefault();
        getTasks();
    });
};


export {initCreateTaskEvent, cancelTaskCreateEvent, saveValuesEvent};