import { createTaskInDom, createTaskInDomv2, initForm } from "./createElements";
import { newTask, tasks,} from "./taskActions";

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
    const taskList = document.querySelector('.task-list');
    const task = newTask();
    const currentTask = createTaskInDomv2(task);
    tasks.push(task);
    taskList.append(currentTask);
    cancelForm();
};