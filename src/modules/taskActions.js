import { Task } from "./task";
import { openForm } from "./dom";
import { cancelTaskCreate } from "./events";

const tasks = [];

function createTask() {
    openForm();
    cancelTaskCreate();
};



function editTaskProperties() {
    /*Task formation - fill out fields to get task properties*/
    
};

function addTaskToList(task) {
    /* Appends task to array*/
    /* task argument is a dom element filled with object info 
        that is created from another function*/
};

export {createTask};