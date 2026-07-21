class Project {
  constructor (name, todos = []) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = todos;
  }

  getTodos() {
    return [...this.todos];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}