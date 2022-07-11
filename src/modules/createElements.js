import { newTask, getPriority } from "./taskActions";

/*This file is so long, please let me know a way to make dom
elements in js in a cleaner way*/

export function initForm() {
    const formDiv = document.createElement('div');
    formDiv.classList.add('form-div');

    const form = document.createElement('form');
    form.classList.add('form');
    form.setAttribute('id', 'form');

    const closeDiv = document.createElement('div');
    closeDiv.classList.add('close-div');
    closeDiv.textContent = 'X';


    const headerDiv = document.createElement('div');
    headerDiv.classList.add('input-div', 'form-header-div');
    const formHeader = document.createElement('h2');
    formHeader.classList.add('form-header');
    formHeader.textContent = 'Add Task';

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('input-div', 'title-div');
    const titleInput = document.createElement('input');
    titleInput.classList.add('form-input', 'form-title');
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute('required', 'true');
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('input-div', 'description-div');
    const description = document.createElement('textarea');
    description.classList.add('form-input', 'form-description');
    description.setAttribute('id', 'description');
    description.setAttribute('name', 'description');
    description.setAttribute('required', 'true');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description';

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('input-div', 'date-div');
    const date = document.createElement('input');
    date.setAttribute('type', 'date');
    date.classList.add('form-input', 'form-date');
    date.setAttribute('id', 'date');
    date.setAttribute('name', 'due-date');
    date.setAttribute('required', 'true');
    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'date');
    dateLabel.textContent = 'Due Date';
    
    const priorityDiv = document.createElement('div');
    priorityDiv.classList.add('input-div', 'priority-div');
    const priority = document.createElement('select');
    priority.classList.add('form-input', 'form-priority');
    priority.setAttribute('id', 'priority');
    priority.setAttribute('required', 'true');
    priority.setAttribute('name', 'priority');
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.textContent = 'Priority';

    const selectPrio = document.createElement('option');
    selectPrio.setAttribute('value','');
    selectPrio.textContent = 'Select Priority';
    const lowPrio = document.createElement('option');
    lowPrio.setAttribute('value','low');
    lowPrio.textContent = 'Low';
    const midPrio = document.createElement('option');
    midPrio.setAttribute('value','mid');
    midPrio.textContent = 'Mid';
    const highPrio = document.createElement('option');
    highPrio.setAttribute('value','high');
    highPrio.textContent = 'High';

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('input-div');
    const taskButton = document.createElement('button');
    taskButton.classList.add('form-button');
    taskButton.textContent = 'Add';
    taskButton.setAttribute('form', 'form');

    headerDiv.append(formHeader);
    priority.append(selectPrio, lowPrio, midPrio, highPrio);
    priorityDiv.append(priorityLabel, priority);
    dateDiv.append(dateLabel, date);
    descriptionDiv.append(descriptionLabel, description);
    titleDiv.append(titleLabel, titleInput);
    buttonDiv.append(taskButton);
    form.append(closeDiv, headerDiv, titleDiv, descriptionDiv, dateDiv, priorityDiv, buttonDiv);
    formDiv.append(form);

    return formDiv;
}

export function createTaskInDom(task) {
    const wrapper = document.createElement('div');
    
    const taskContainer = document.createElement('li');
    taskContainer.classList.add('task');

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
    const priority = task.priority;
    const priorityClass = getPriority(priority);
    prioDiv.classList.add(priorityClass, 'task-prio-div');

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions-div'); 

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('task-delete-button');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa', 'fa-trash');
    deleteButton.append(deleteIcon);
    
    const editButton = document.createElement('button');
    editButton.classList.add('task-edit-button');
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa', 'fa-edit');
    editButton.append(editIcon);
    editButton.addEventListener('click', function(e){
        if (e.target !== this){
            console.log('stopped');
            e.stopPropagation();
            return;
        }
    })

    taskActions.append(editButton, deleteButton)
    checkboxDiv.append(checkbox);
    titleDiv.append(title);
    dateDiv.append(date);
    // taskContainer.append(prioDiv,checkbox,titleDiv,dateDiv, taskActions);
    taskViewDiv.append(prioDiv,checkbox,titleDiv,dateDiv, taskActions);
    taskDetailsDiv.append(taskDetails);
    taskContainer.append(taskViewDiv, taskDetailsDiv);
    taskContainer.addEventListener('click', function(e) {
        this.classList.toggle('active');
    });
    
    return taskContainer;
}