import { getAllTodos } from "./AppManager";
import { createTaskCard, updateSectionTitle, noTaskOutput } from "./DOMManager";
import { sortTodosByPriority } from "./helpers";

export function loadTodayTasks() {
  const todayString = new Date().toISOString().split('T')[0];
  const content = document.querySelector('#content')
  content.innerHTML = "";
  
  updateSectionTitle("Tasks Today");
  
  const todos = getAllTodos();
  const todayTodos = todos.filter(todo => todo.dueDate === todayString);
  
  if (todayTodos.length !== 0) {
    sortTodosByPriority(todayTodos);
    todayTodos.forEach(todo => createTaskCard(todo));
  } else {
    noTaskOutput();
  }
}