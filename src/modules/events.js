import { createTask, newTask } from "./taskActions";
import { addTaskToDom, cancelForm, editTaskInDom } from "./dom";
import { addProjectToProjects, createProjectFormInDom, createTaskInDom } from "./createElements";
import { getTasks } from "./pageload";
import { currentProject, currentProjectName, displayCurrentProject, displayProjects, projects, setProject } from "./projects";
import { forEach } from "lodash";

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
        projectsList.prepend(createProjectFormInDom());
        addProjectToProjects();
        // projectsList.prepend(createProjectInDom());
    });
}

function selectCurrentProjectEvent() {
    const projectList = document.querySelector('.projects-list');
    const addProject = document.querySelector('#add-project');
    const inbox = document.querySelector('.inbox');
    const nav = document.querySelector('.nav');

    
    // inbox.addEventListener('click', function(e) {
    //     const home = document.querySelector('.home');
    //     const project = home.querySelector('.project');
    //     const projects = document.querySelectorAll('.project');
    //     if(e.target === project){
    //         setProject('all');
    //         displayCurrentProject();
    //         displayProjects();
    //         currentProjectName = 'all';
    //     };
    // })

    nav.addEventListener('click', function(e) {
        const project = nav.querySelector('.project');
        const projects = document.querySelectorAll('.project');

        if(e.target === inbox){
            e.stopPropagation();
            setProject('all');
            displayCurrentProject();
            displayProjects();
            currentProjectName = 'all';
            projects.forEach(project => project.classList.remove('project-highlight'));
            e.target.classList.add('project-highlight');

        };

        if(e.target !== addProject && e.target.classList.contains('project') && e.target !== inbox){
            e.stopPropagation();
            const projectText = e.target.textContent;
            setProject(projectText);
            displayCurrentProject();
            displayProjects();
            currentProjectName = projectText;
            projects.forEach(project => project.classList.remove('project-highlight'));
            e.target.classList.toggle('project-highlight');
        };
    })
};

// function navHighlight() {
//     const projects = document.querySelectorAll('.project');
//     const projectsArray = Array.from(projects);
//     projects.forEach(project => {

//     })
// }

export {initCreateTaskEvent, cancelTaskCreateEvent, saveValuesEvent, addProjectEvent, selectCurrentProjectEvent};