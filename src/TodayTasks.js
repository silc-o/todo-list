import { getAllTodos } from "./AppManager";
import { createTaskCard, updateSectionTitle, noTaskOutput, clearContent } from "./DOMManager";
import { sortTodosByPriority } from "./helpers";

export function loadTodayTasks() {
  clearContent();
  const todayString = new Date().toISOString().split('T')[0];
  
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