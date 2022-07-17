

export const projects = {
    all: [],
};

export let currentProject = [];

function setProject(project) {
    //something will call this function that sets currentProject to passed argument
    currentProject = project;
};

function selectProject() {
    //logic to choose project, prob called by clicking on tab in nav
};

function addProject(project) {
    //adds project to project object
};

//a new project is created (projects)
// this project is added to object (projects)
// ex: projects.work = []

//for this, create a function that adds a property to object