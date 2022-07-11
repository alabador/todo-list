import { createTaskInDom, initForm } from "./createElements";
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
    const currentTask = createTaskInDom(task);
    tasks.push(task);
    console.log(tasks);
    taskList.append(currentTask);
    // currentTask.addEventListener('click', function() {
    //     this.classList.toggle('active');
    // });
    cancelForm();
};