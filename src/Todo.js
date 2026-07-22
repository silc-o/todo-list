export default class Todo {
  constructor({ title, description, dueDate, priority = 'low', notes = '', isComplete = false, id = crypto.randomUUID() }) {
    this.id = id;
    this.title.title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.isComplete = false;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  updatePriority(priorityLevel) {
    this.priority = priorityLevel;
  }
}