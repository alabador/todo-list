import { Task } from "./task";
import { openForm } from "./dom";
import { cancelTaskCreateEvent, saveValuesEvent, editValuesEvent } from "./events";
import { getTasks } from "./pageload";
import { currentProject, currentProjectName } from "./projects";

export function createTask() {
    openForm();
    cancelTaskCreateEvent();
    saveValuesEvent();
};

export function editTask() {
    openForm();
    cancelTaskCreateEvent();
    console.log('form opened');
    // editValuesEvent();
};

export function newTask() {
    const propertiesArray = getValues();
    const task = new Task(...propertiesArray);
    task.project = currentProjectName;
    return task;
};

function getValues() {
    const valueArray = [];
    const inputs = document.querySelectorAll('.form-input');
    for (let i=0; i<inputs.length; i++) {
        const currentInputValue = inputs[i].value;
        valueArray.push(currentInputValue);
    }
    return valueArray;
};

export function getPriority(priority) {
    if (priority == 'low') {
        return 'low';
    }
    else if (priority == 'mid'){
        return 'mid';
    }
    else if (priority == 'high') {
        return 'high';
    }
    else {
        return;
    }
};