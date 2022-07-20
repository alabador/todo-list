import { cancelProjectForm } from "./dom";


export const projects = {
    all: [],
};

export let currentProject = [];
export let currentProjectName = 'all';

export function setProject(project) {
    //select project to assign to current project
    //puts argument in an object, returns array of object keys
    currentProject =  projects[project];
};

export function chooseFromProjects() {
    const projectList = Object.keys(projects);
    return projectList;
}

export function addProject(project) {
    //adds project to project object
    const projectList = Object.keys(projects);
    if (!projectList.includes(project)){
        projects[project] = [];
    }
    else {
        alert("Choose a different name, project names must be unique.");
    }
};

export function displayProjects() {
    console.log(projects);
}

export function displayCurrentProject() {
    console.log(currentProject);
}

//a new project is created (projects)
// this project is added to object (projects)
// ex: projects.work = []

//for this, create a function that adds a property to object