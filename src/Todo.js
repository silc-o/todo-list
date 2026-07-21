export default class Todo {
  constructor(name, description, dueDate, priority = 'low', notes, id = crypto.randomUUID()) {
    this.id = id;
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