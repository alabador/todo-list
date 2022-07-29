import { createTask, newTask } from "./taskActions";
import { addTaskToDom, cancelForm, defaultView, editTaskInDom, switchProjectView } from "./dom";
import { addProjectToProjects, createProjectFormInDom, createTaskInDom } from "./createElements";
import { getTasks } from "./pageload";
import { currentProject, currentProjectName, displayCurrentProject, displayProjects, projects, setProject } from "./projects";
import { forEach } from "lodash";
import { saveProjectToLocalStorage, saveToLocalStorage } from "./localStorage";

function initCreateTaskEvent() {
    const createButton = document.querySelector('.add');
    createButton.addEventListener('click', createTask);
};

function cancelTaskCreateEvent() {
    const cancelButton = document.querySelector('.close-div');
    cancelButton.addEventListener('click', cancelForm);
};

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
        const projectsList = document.querySelector('.projects-list');
        projectsList.prepend(createProjectFormInDom());
        addProjectToProjects();
    });
}

function selectCurrentProjectEvent() {
    const projectList = document.querySelector('.projects-list');
    const addProject = document.querySelector('#add-project');
    const inbox = document.querySelector('.inbox');
    const nav = document.querySelector('.nav');

    inbox.classList.add('project-highlight');

    nav.addEventListener('click', function(e) {
        const project = nav.querySelector('.project');
        const projects = document.querySelectorAll('.project');

        if(e.target === inbox){
            e.stopPropagation();
            saveProjectToLocalStorage();
            setProject('all');
            currentProjectName = 'all';
            projects.forEach(project => project.classList.remove('project-highlight'));
            e.target.classList.add('project-highlight');
            switchProjectView();
        };

        if(e.target !== addProject && e.target.classList.contains('project') && e.target !== inbox){
            e.stopPropagation();
            saveProjectToLocalStorage();
            const projectText = e.target.textContent;
            setProject(projectText);
            currentProjectName = projectText;
            projects.forEach(project => project.classList.remove('project-highlight'));
            e.target.classList.toggle('project-highlight');
            switchProjectView();
        };
    })
};

export function deleteProject() {
    const projectList = document.querySelector('.projects-list');

    projectList.addEventListener('click', function(e) {
        if(e.target.classList.contains('fa-trash')) {
            e.stopPropagation();

            const projectName = e.target.parentNode.textContent;

            delete projects[projectName];
            e.target.parentNode.remove();
            // displayProjects();

            const inbox = document.querySelector('.inbox');
            inbox.classList.add('project-highlight');
            defaultView();

            //Add logic to switch view of task list to another project/inbox
        }
    })
}

export {initCreateTaskEvent, cancelTaskCreateEvent, saveValuesEvent, addProjectEvent, selectCurrentProjectEvent};