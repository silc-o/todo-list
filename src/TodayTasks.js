import { getAllTodos } from "./AppManager";
import { createTaskCard, updateSectionTitle, noTaskOutput } from "./DOMManager";

export function loadTodayTasks() {
  const todayString = new Date().toISOString().split('T')[0];
  updateSectionTitle("All Tasks");
  const content = document.querySelector('#content')

  content.innerHTML = "";
  
  const todos = getAllTodos();
  const todayTodos = todos.filter(todo => todo.dueDate === todayString);
  
  if (todayTodos.length !== 0) {
    todayTodos.forEach(todo => createTaskCard(todo));
  } else {
    noTaskOutput();
  }
}