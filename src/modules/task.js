
export class Task {
    constructor(title, description, dueDate, priority, project = 'all'){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
};