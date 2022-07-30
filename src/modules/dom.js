import { addProjectOptions, createTaskInDom, createTaskInDomv2, initForm } from "./createElements";
import { newTask } from "./taskActions";
import { currentProject, currentProjectName, setProject } from "./projects";
import { getFromLocalStorage, getTaskFromLocalStorage, saveProjectListToLocalStorage, saveProjectToLocalStorage, saveTaskToLocalStorage } from "./localStorage";

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

    //save task in local storage
    // saveTaskToLocalStorage(task);
    //call task from local storage and use as argument
    // const savedTask = getTaskFromLocalStorage(task);

    const currentTask = createTaskInDomv2(task);
    // const currentTask = createTaskInDomv2(savedTask);
    
    /*Task object added to project array*/
    currentProject.push(task);
    saveProjectToLocalStorage();
    saveProjectListToLocalStorage();

    taskList.append(currentTask);
    cancelForm();
};

export function switchProjectView() {
    const taskList = document.querySelector('.task-list');
    let savedTasks = getFromLocalStorage();
    if (savedTasks === null) {
        savedTasks = [];
    }
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // for(let i=0; i<currentProject.length; i++){
    for(let i=0; i<savedTasks.length; i++){
        // const currentTaskDom = createTaskInDomv2(currentProject[i]);
        const currentTaskDom = createTaskInDomv2(savedTasks[i]);
        taskList.append(currentTaskDom);
    }
}

/*Resets to inbox project*/
export function defaultView() {
    const taskList = document.querySelector('.task-list');

    let savedTasks = getFromLocalStorage();
    if (savedTasks === null) {
        savedTasks = [];
    }

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // for(let i=0; i<currentProject.length; i++){
    for(let i=0; i<savedTasks.length; i++){
        setProject('all');
        // const currentTaskDom = createTaskInDomv2(currentProject[i]);
        
        console.log('huh');
        const currentTaskDom = createTaskInDomv2(savedTasks[i]);
        taskList.append(currentTaskDom);
    }
}