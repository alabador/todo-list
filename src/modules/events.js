import { createTask } from "./taskActions";

function initCreateTaskEvent() {
    const createButton = document.querySelector('.add');
    createButton.addEventListener('click', createTask);
};

export {initCreateTaskEvent};