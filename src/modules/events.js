import { createTask, newTask } from "./taskActions";
import { addTaskToDom, cancelForm, editTaskInDom } from "./dom";
import { createProjectInDom, createTaskInDom } from "./createElements";
import { getTasks } from "./pageload";
import { currentProject } from "./projects";

function initCreateTaskEvent() {
    const createButton = document.querySelector('.add');
    createButton.addEventListener('click', createTask);
};

function cancelTaskCreateEvent() {
    const cancelButton = document.querySelector('.close-div');
    cancelButton.addEventListener('click', cancelForm);
};

//start editing logic from here, in addtasktodom in dom.js
function saveValuesEvent() {
    const form = document.querySelector('.form');
    form.addEventListener('submit', function(e) {
        addTaskToDom();
        e.preventDefault();
        getTasks();
    });
};

function addProjectEvent() {
    const addProject = document.querySelector('.add-project');
    addProject.addEventListener('click', function(){
        //create input/form to create a button for project
        const projectsList = document.querySelector('.projects-list');
        projectsList.prepend(createProjectInDom());
    });
}

export {initCreateTaskEvent, cancelTaskCreateEvent, saveValuesEvent, addProjectEvent};