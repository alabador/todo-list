import { initForm } from "./initializeForm";
import { newTask } from "./taskActions";

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
    const task = newTask();
    
};