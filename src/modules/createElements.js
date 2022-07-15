import { editTaskInDom, openForm, cancelForm} from "./dom";
import { editValuesEvent } from "./events";
import { newTask, getPriority, editTask, tasks } from "./taskActions";
import { getTasks } from "./pageload";
import { el } from "date-fns/locale";

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
            elFactory('div', {class: 'input-div'}, 
                elFactory('button', {class: 'form-button', form:'form'}, 'Add')
            )
        )
    );
    return form;
}

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

    deleteButton.addEventListener('click', function(e){
        if (e.target !== this){
            taskLi.remove();
            let index = tasks.indexOf(task);
            tasks.splice(index, 1);
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
                    let index = tasks.indexOf(task);
                    const children = taskList.children;
                    const child = taskList.children[index];
                    const nextChild = taskList.children[index + 1];
        
                    tasks.splice(index, 1, editedTask);
                    taskList.removeChild(child);
                    taskList.insertBefore(createTaskInDomv2(editedTask), nextChild);

                    
                    task.title = editedTask.title;
                    task.dueDate = editedTask.dueDate;
                    task.priority = editedTask.priority;
                    task.project = editedTask.project;
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

    return taskLi;
}

// export function createTaskInDom(task) {
//     const taskContainer = document.createElement('li');
//     taskContainer.classList.add('task');
//     taskContainer.id = task.title;

//     const taskViewDiv = document.createElement('div');
//     taskViewDiv.classList.add('task-view-div');

//     /*Task details*/
//     const taskDetailsDiv = document.createElement('div');
//     taskDetailsDiv.classList.add('task-details-div');
//     const taskDetails = document.createElement('p');
//     taskDetails.classList.add('task-details', 'details-child');
//     const taskProject = document.createElement('p');
//     taskProject.classList.add('task-details', 'details-child');
//     taskProject.textContent = `Project: ${task.project}`
//     taskDetails.textContent = `Description: ${task.description}`;

//     /*Create all elements inside task display*/
//     const checkboxDiv = document.createElement('div');
//     checkboxDiv.classList.add('task-checkbox-div');
//     const checkbox = document.createElement('input');
//     checkbox.setAttribute('type', 'checkbox');
//     checkbox.classList.add('task-checkbox');
//     checkbox.addEventListener('click', function(e){
//         if (e.target == this){
//             console.log('stopped');
//             e.stopPropagation();
//             return;
//         }
//     })

//     const titleDiv = document.createElement('div');
//     titleDiv.classList.add('task-title-div');
//     const title = document.createElement('p');
//     title.classList.add('task-title');
//     title.textContent = task.title;
    
//     const dateDiv = document.createElement('div');
//     dateDiv.classList.add('task-date-div');
//     const date = document.createElement('p');
//     date.classList.add('task-date');
//     date.textContent = task.dueDate;

//     const prioDiv = document.createElement('div');
//     let priority = task.priority;
//     let priorityClass = getPriority(priority);
//     prioDiv.classList.add(priorityClass, 'task-prio-div');

//     const taskActions = document.createElement('div');
//     taskActions.classList.add('task-actions-div'); 

//     const deleteButton = document.createElement('button');
//     deleteButton.classList.add('task-delete-button');
//     const deleteIcon = document.createElement('i');
//     deleteIcon.classList.add('fa', 'fa-trash');
//     deleteButton.append(deleteIcon);
    
//     deleteButton.addEventListener('click', function(e){
//         if (e.target !== this){
//             taskContainer.remove();
//             tasks.pop();
//             e.stopPropagation();
//             return;
//         }
//     })
    
//     const editButton = document.createElement('button');
//     editButton.classList.add('task-edit-button');
//     const editIcon = document.createElement('i');
//     editIcon.classList.add('fa', 'fa-edit');
//     editButton.append(editIcon);
    
    // editButton.addEventListener('click', function(e){
    //     if (e.target !== this){
            
    //         function edit() {
    //             editTask();
    //             const form = document.querySelector('#form');
                
    //             form.querySelector('#title').value = task.title;
    //             form.querySelector('#description').value = task.description;
    //             form.querySelector('#date').value = task.dueDate;
    //             form.querySelector('#priority').value = task.priority;
                
    //             form.addEventListener('submit', function(e) {
    //                 const editedTask = newTask();
                    
    //                 title.textContent = editedTask.title;
    //                 date.textContent = editedTask.dueDate;
    //                 priority = editedTask.priority;
    //                 priorityClass = getPriority(priority);
    //                 prioDiv.removeAttribute("class");
    //                 prioDiv.classList.add(priorityClass, 'task-prio-div');
    //                 taskProject.textContent = `Project: ${editedTask.project}`
    //                 taskDetails.textContent = `Description: ${editedTask.description}`;
                    
    //                 task.title = editedTask.title;
    //                 task.dueDate = editedTask.dueDate;
    //                 task.priority = editedTask.priority;
    //                 task.project = editedTask.project;
    //                 task.description = editedTask.description;
                    
    //                 getTasks();
    //                 e.preventDefault();
    //                 cancelForm();
    //             })
    //             return;
    //         }
    //         edit();
    //         e.stopPropagation();
    //         return;
    //     }
    // })

//     taskActions.append(editButton, deleteButton)
//     checkboxDiv.append(checkbox);
//     titleDiv.append(title);
//     dateDiv.append(date);
//     taskViewDiv.append(prioDiv,checkbox,titleDiv,dateDiv, taskActions);
//     taskDetailsDiv.append(taskDetails);
//     taskContainer.append(taskViewDiv, taskDetailsDiv);
    
//     taskContainer.addEventListener('click', function(e) {
//         this.classList.toggle('active');
//     });

//     return taskContainer;
// }

