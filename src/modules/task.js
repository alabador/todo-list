

class Task {
    constructor(title, description, dueDate, priority){
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
    }

    get title() {
        return this._title;
    }

    set title(newTitle) {
        return this._title = newTitle;
    }

    get description() {
        return this._description;
    }
    
    set description(newDescription) {
        return this._description = newDescription;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(newDueDate) {
        return this._dueDate = newDueDate;
    }

    get priority () {
        return this._priority;
    }

    set priority (newPriority) {
        return this._priority = newPriority
    }
}

export {Task};