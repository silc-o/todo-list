export default class Project {
  constructor (title, todos = []) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.todos = todos;
  }

  getTodos() {
    return [...this.todos];
  }

  getTodoById(todoId) {
    return this.todos.find(todo => todo.id === todoId) || null;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}