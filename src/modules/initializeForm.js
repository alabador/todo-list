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
    form.append(headerDiv, titleDiv, descriptionDiv, dateDiv, priorityDiv, buttonDiv);
    formDiv.append(closeDiv, form);

    return formDiv;
}