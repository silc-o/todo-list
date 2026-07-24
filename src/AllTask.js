import { getAllTodos } from "./AppManager.js";
import { createTaskCard, updateSectionTitle, noTaskOutput, clearContent } from "./DOMManager";
import { sortTodosByPriority } from "./helpers.js";

export function loadAllTask() {
  clearContent();
  updateSectionTitle("All Tasks");

  const todos = getAllTodos();

  if (todos.length !== 0) {
    sortTodosByPriority(todos);
    todos.forEach(todo => createTaskCard(todo));
  } else {
    noTaskOutput();
  }
}