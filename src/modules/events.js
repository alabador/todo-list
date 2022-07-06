import { createTask } from "./taskActions";
import { cancelForm } from "./dom";

function initCreateTaskEvent() {
    const createButton = document.querySelector('.add');
    createButton.addEventListener('click', createTask);
};

function cancelTaskCreate() {
    const cancelButton = document.querySelector('.close-div');
    cancelButton.addEventListener('click', cancelForm);
}

export {initCreateTaskEvent, cancelTaskCreate};