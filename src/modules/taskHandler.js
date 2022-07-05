import { Task } from "./task";

const tasks = [];

function createTask() {
    /*Press button to bring up dialog to create task*/
    /*Initialize process of task creation*/
};

function editTaskProperties() {
    /*Task formation - fill out fields to get task properties*/
    
};

function addTaskToList(task) {
    /* Appends task to array*/
    /* task argument is a dom element filled with object info 
        that is created from another function*/
    const taskList = document.querySelector('.task-list');
    taskList.append(task);
};
