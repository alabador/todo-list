import { createTask } from "./taskActions";

function initCreateTaskEvent() {
    const createButton = document.querySelector('.create-task');
    createButton.addEventListener('click', createTask);
};

export {initCreateTaskEvent};