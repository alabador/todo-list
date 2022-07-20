import { openForm, cancelForm, cancelProjectForm} from "./dom";
import { newTask, getPriority, editTask } from "./taskActions";
import { getTasks } from "./pageload";
import { addProject, currentProject, displayProjects, projects } from "./projects";

const elFactory = (type, attributes, ...children) => {
    const el = document.createElement(type);

    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    };

    children.forEach(child => {
        if(typeof child === 'string') {
            el.appendChild(document.createTextNode(child));
        }
        else {
            el.appendChild(child);
        }
    })

    return el;
};

export function initForm() {
    const form = elFactory('div', {class: 'form-div'}, 
        elFactory('form', {class: 'form', id: 'form'}, 
            elFactory('div', {class: 'close-div'}, 'X'),
            elFactory('div', {class: 'input-div form-header-div'}, 
                elFactory('h2', {class: 'form-header'}, 'Add Task')
            ),
            elFactory('div', {class: 'input-div title-div'}, 
                elFactory('label', {for: 'title'}, 'Title'),
                elFactory('input', {class: 'form-input form-title', id:'title',
                name:'title', required:'true'})
            ),
            elFactory('div', {class: 'input-div description-div'}, 
                elFactory('label', {for: 'description'}, 'Description'),
                elFactory('textarea', {class: 'form-input form-description', id:'description',
                name:'description', required:'true'})
            ),
            elFactory('div', {class: 'input-div date-div'},
                elFactory('label', {for: 'date'}, 'Due Date'),
                elFactory('input', {type: 'date', class: 'form-input form-date', 
                id:'date', name:'due-date', required:'true'})
            ),
            elFactory('div', {class: 'input-div priority-div'},
                elFactory('label', {for: 'priority'}, 'Priority'),
                elFactory('select', {class: 'form-input form-priority', 
                id:'priority', name:'priority', required:'true'}, 
                    elFactory('option', {value:''}, 'Select Priority'),
                    elFactory('option', {value:'low'}, 'Low'),
                    elFactory('option', {value:'mid'}, 'Mid'),
                    elFactory('option', {value:'high'}, 'High')
                )
            ),
            // elFactory('div', {class: 'input-div project-div'},
            //     elFactory('label', {for: 'project'}, 'Project'),
            //     elFactory('select', {class: 'form-input form-project', 
            //     id:'project', name:'project', required:'true'},
            //         elFactory('option', {value:''}, 'Select a Project')
            //     )
            // ),
            elFactory('div', {class: 'input-div'}, 
                elFactory('button', {class: 'form-button', form:'form'}, 'Add')
            )
        )
    );
    return form;
}

// export function addProjectOptions() {
//     const form = document.querySelector('#form');
//     const projectSelect = form.querySelector('#project');
//     const projectList = Object.keys(projects);
//     for (let i=0; i<projectList.length; i++){
//         projectSelect.options[projectSelect.options.length] = new Option(projectList[i], projectList[i]);
//     }
// };

export function createProjectFormInDom() {
    const input = elFactory('input', {class: 'project-add-form-input', form:'project-add-form', 
    placeholder: 'Enter Project Name', id:'project-add-form-input', required:'true'});
    const form = elFactory('form', {class: 'project-add-form', id: 'project-add-form'}, 
        input,
        elFactory('div', {class: 'project-add-form-ctas'}, 
            elFactory('button', {class: 'form-button form-add', form:'project-add-form', type:'submit'}, 'Add'), 
            elFactory('button', {class: 'form-button form-cancel', form:'project-add-form'}, 'Cancel')
        )
    );

    return form;
};

export function addProjectToProjects() {
    const form = document.querySelector('#project-add-form');
    const input = form.querySelector('#project-add-form-input');
    const projectsList = document.querySelector('.projects-list');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        addProject(input.value);
        const project = elFactory('button', {class: 'nav-button project'}, 
            elFactory('i', {class: 'fa fa-list'}),
            input.value
        )
        projectsList.prepend(project);
        displayProjects();
        cancelProjectForm();
    })
}

// export function createProjectInDom() {
//     const project = elFactory('button', {class: '.nav-button'}, 
//         elFactory('i', {class: '.fa fa-list'}),
//         input.value
//     )
//     console.log(input.value);
//     return project;
// }

//Pass in task as argument, gives values to pass into dom.
export function createTaskInDomv2(task) {
    const editButton = elFactory('button', {class:'task-edit-button'}, 
    elFactory('i', {class:'fa fa-edit'}));
    const deleteButton = elFactory('button', {class:'task-delete-button'}, 
    elFactory('i', {class:'fa fa-trash'}));
    const checkbox = elFactory('input', {class:'task-checkbox', type:'checkbox'})
    
    const taskLi = elFactory('li', {class:'task', id:`${task.title}`},
        //Task View 
        elFactory('div', {class:'task-view-div'}, 
            elFactory('div', {class:`task-prio-div ${getPriority(task.priority)}`}),
            checkbox,
            elFactory('div', {class:'task-title-div'}, 
                elFactory('p', {class:'task-title'}, `${task.title}`)
            ),
            elFactory('div', {class:'task-date-div'}, 
                elFactory('p', {class:'task-date'}, `${task.dueDate}`)
            ),
            elFactory('div', {class:'task-actions-div'}, 
                editButton,
                deleteButton
            )
        ),
        //Task Details
        elFactory('div', {class:'task-details-div'}, 
            elFactory('p', {class:'task-details details-child'}, `Project: ${task.project}`),
            elFactory('p', {class:'task-details details-child'}, `Description: ${task.description}`)
        )
    );

    checkbox.addEventListener('click', function(e){
        if (e.target == this){
            console.log('stopped');
            e.stopPropagation();
            return;
        }
    })

    deleteButton.addEventListener('click', function(e){
        if (e.target !== this){
            taskLi.remove();
            let index = currentProject.indexOf(task);
            currentProject.splice(index, 1);
            e.stopPropagation();
            return;
        }
    });

    editButton.addEventListener('click', function(e){
        if (e.target !== this){
            //delete old task and replace with new one, use index of task
            function edit() {
                editTask();
                const form = document.querySelector('#form');
                
                form.querySelector('#title').value = task.title;
                form.querySelector('#description').value = task.description;
                form.querySelector('#date').value = task.dueDate;
                form.querySelector('#priority').value = task.priority;
                
                form.addEventListener('submit', function(e) {
                    const editedTask = newTask();
                    const taskList = document.querySelector('.task-list');
                    let index = currentProject.indexOf(task);
                    const children = taskList.children;
                    const child = taskList.children[index];
                    const nextChild = taskList.children[index + 1];
        
                    currentProject.splice(index, 1, editedTask);
                    taskList.removeChild(child);
                    taskList.insertBefore(createTaskInDomv2(editedTask), nextChild);

                    
                    task.title = editedTask.title;
                    task.dueDate = editedTask.dueDate;
                    task.priority = editedTask.priority;
                    // task.project = editedTask.project;
                    task.description = editedTask.description;
                    
                    getTasks();
                    e.preventDefault();
                    cancelForm();
                })
                return;
            }
            edit();
            e.stopPropagation();
            return;
        }
    })

    taskLi.addEventListener('click', function(e) {
        this.classList.toggle('active');
    });

    return taskLi;
}

