import { createTaskInDom, initForm } from "./createElements";
import { newTask, tasks, addTaskToList } from "./taskActions";

export function openForm() {
    const body = document.querySelector('body');
    body.append(initForm());
    document.querySelector('.add').disabled = true;
}

export function cancelForm() {
    const form = document.querySelector('.form-div');
    form.parentElement.removeChild(form);
    document.querySelector('.add').disabled = false;
}

export function addTaskToDom() {
    //get object from tasks and append
    //have another funciton to show tasks

    const taskList = document.querySelector('.task-list');
    const currentTask = createTaskInDom(newTask);
    taskList.append(currentTask);
    // console.log(taskList.childNodes);
};