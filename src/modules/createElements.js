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

export const form = elFactory('div', {class: 'form-div'}, 
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

/*Kept here temporarily to retain old functionality. Remove when 
code for task is updated*/

/*Creates form in dom*/
// export function initForm() {
//     const formDiv = document.createElement('div');
//     formDiv.classList.add('form-div');

//     const form = document.createElement('form');
//     form.classList.add('form');
//     form.setAttribute('id', 'form');

//     const closeDiv = document.createElement('div');
//     closeDiv.classList.add('close-div');
//     closeDiv.textContent = 'X';


//     const headerDiv = document.createElement('div');
//     headerDiv.classList.add('input-div', 'form-header-div');
//     const formHeader = document.createElement('h2');
//     formHeader.classList.add('form-header');
//     formHeader.textContent = 'Add Task';

//     const titleDiv = document.createElement('div');
//     titleDiv.classList.add('input-div', 'title-div');
//     const titleInput = document.createElement('input');
//     titleInput.classList.add('form-input', 'form-title');
//     titleInput.setAttribute("id", "title");
//     titleInput.setAttribute("name", "title");
//     titleInput.setAttribute('required', 'true');
//     const titleLabel = document.createElement('label');
//     titleLabel.setAttribute('for', 'title');
//     titleLabel.textContent = 'Title';

//     const descriptionDiv = document.createElement('div');
//     descriptionDiv.classList.add('input-div', 'description-div');
//     const description = document.createElement('textarea');
//     description.classList.add('form-input', 'form-description');
//     description.setAttribute('id', 'description');
//     description.setAttribute('name', 'description');
//     description.setAttribute('required', 'true');
//     const descriptionLabel = document.createElement('label');
//     descriptionLabel.setAttribute('for', 'description');
//     descriptionLabel.textContent = 'Description';

//     const dateDiv = document.createElement('div');
//     dateDiv.classList.add('input-div', 'date-div');
//     const date = document.createElement('input');
//     date.setAttribute('type', 'date');
//     date.classList.add('form-input', 'form-date');
//     date.setAttribute('id', 'date');
//     date.setAttribute('name', 'due-date');
//     date.setAttribute('required', 'true');
//     const dateLabel = document.createElement('label');
//     dateLabel.setAttribute('for', 'date');
//     dateLabel.textContent = 'Due Date';
    
//     const priorityDiv = document.createElement('div');
//     priorityDiv.classList.add('input-div', 'priority-div');
//     const priority = document.createElement('select');
//     priority.classList.add('form-input', 'form-priority');
//     priority.setAttribute('id', 'priority');
//     priority.setAttribute('required', 'true');
//     priority.setAttribute('name', 'priority');
//     const priorityLabel = document.createElement('label');
//     priorityLabel.setAttribute('for', 'priority');
//     priorityLabel.textContent = 'Priority';

//     const selectPrio = document.createElement('option');
//     selectPrio.setAttribute('value','');
//     selectPrio.textContent = 'Select Priority';
//     const lowPrio = document.createElement('option');
//     lowPrio.setAttribute('value','low');
//     lowPrio.textContent = 'Low';
//     const midPrio = document.createElement('option');
//     midPrio.setAttribute('value','mid');
//     midPrio.textContent = 'Mid';
//     const highPrio = document.createElement('option');
//     highPrio.setAttribute('value','high');
//     highPrio.textContent = 'High';

//     const buttonDiv = document.createElement('div');
//     buttonDiv.classList.add('input-div');
//     const taskButton = document.createElement('button');
//     taskButton.classList.add('form-button');
//     taskButton.textContent = 'Add';
//     taskButton.setAttribute('form', 'form');

//     headerDiv.append(formHeader);
//     priority.append(selectPrio, lowPrio, midPrio, highPrio);
//     priorityDiv.append(priorityLabel, priority);
//     dateDiv.append(dateLabel, date);
//     descriptionDiv.append(descriptionLabel, description);
//     titleDiv.append(titleLabel, titleInput);
//     buttonDiv.append(taskButton);
//     form.append(closeDiv, headerDiv, titleDiv, descriptionDiv, dateDiv, priorityDiv, buttonDiv);
//     formDiv.append(form);

//     return formDiv;
// }

/*Super long function, i know. 
This creates the task in the dom, using the values of the new task
created from the constructor*/

export function createTaskInDom(task) {
    const taskContainer = document.createElement('li');
    taskContainer.classList.add('task');
    taskContainer.id = task.title;

    const taskViewDiv = document.createElement('div');
    taskViewDiv.classList.add('task-view-div');

    /*Task details*/
    const taskDetailsDiv = document.createElement('div');
    taskDetailsDiv.classList.add('task-details-div');
    const taskDetails = document.createElement('p');
    taskDetails.classList.add('task-details', 'details-child');
    const taskProject = document.createElement('p');
    taskProject.classList.add('task-details', 'details-child');
    taskProject.textContent = `Project: ${task.project}`
    taskDetails.textContent = `Description: ${task.description}`;

    /*Create all elements inside task display*/
    const checkboxDiv = document.createElement('div');
    checkboxDiv.classList.add('task-checkbox-div');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('task-checkbox');
    checkbox.addEventListener('click', function(e){
        if (e.target == this){
            console.log('stopped');
            e.stopPropagation();
            return;
        }
    })

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('task-title-div');
    const title = document.createElement('p');
    title.classList.add('task-title');
    title.textContent = task.title;
    
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('task-date-div');
    const date = document.createElement('p');
    date.classList.add('task-date');
    date.textContent = task.dueDate;

    const prioDiv = document.createElement('div');
    let priority = task.priority;
    let priorityClass = getPriority(priority);
    prioDiv.classList.add(priorityClass, 'task-prio-div');

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions-div'); 

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('task-delete-button');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa', 'fa-trash');
    deleteButton.append(deleteIcon);
    
    deleteButton.addEventListener('click', function(e){
        if (e.target !== this){
            taskContainer.remove();
            tasks.pop();
            e.stopPropagation();
            return;
        }
    })
    
    const editButton = document.createElement('button');
    editButton.classList.add('task-edit-button');
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa', 'fa-edit');
    editButton.append(editIcon);
    
    editButton.addEventListener('click', function(e){
        if (e.target !== this){
            
            function edit() {
                editTask();
                const form = document.querySelector('#form');
                
                form.querySelector('#title').value = task.title;
                form.querySelector('#description').value = task.description;
                form.querySelector('#date').value = task.dueDate;
                form.querySelector('#priority').value = task.priority;
                
                form.addEventListener('submit', function(e) {
                    const editedTask = newTask();
                    
                    title.textContent = editedTask.title;
                    date.textContent = editedTask.dueDate;
                    priority = editedTask.priority;
                    priorityClass = getPriority(priority);
                    prioDiv.removeAttribute("class");
                    prioDiv.classList.add(priorityClass, 'task-prio-div');
                    taskProject.textContent = `Project: ${editedTask.project}`
                    taskDetails.textContent = `Description: ${editedTask.description}`;
                    
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

    taskActions.append(editButton, deleteButton)
    checkboxDiv.append(checkbox);
    titleDiv.append(title);
    dateDiv.append(date);
    taskViewDiv.append(prioDiv,checkbox,titleDiv,dateDiv, taskActions);
    taskDetailsDiv.append(taskDetails);
    taskContainer.append(taskViewDiv, taskDetailsDiv);
    
    taskContainer.addEventListener('click', function(e) {
        this.classList.toggle('active');
    });

    return taskContainer;
}

