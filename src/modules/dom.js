import { addProjectOptions, createTaskInDom, createTaskInDomv2, initForm } from "./createElements";
import { newTask } from "./taskActions";
import { currentProject } from "./projects";

export function openForm() {
    const body = document.querySelector('body');
    body.append(initForm());
    // addProjectOptions();
    document.querySelector('.add').disabled = true;
};

export function cancelForm() {
    const form = document.querySelector('.form-div');
    form.parentElement.removeChild(form);
    document.querySelector('.add').disabled = false;
};

export function cancelProjectForm() {
    const form = document.querySelector('#project-add-form');
    form.parentElement.removeChild(form);
}

export function addTaskToDom() {
    const taskList = document.querySelector('.task-list');
    const task = newTask();
    const currentTask = createTaskInDomv2(task);
    currentProject.push(task);
    taskList.append(currentTask);
    cancelForm();
};