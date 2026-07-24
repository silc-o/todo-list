import { getAllTodos } from "./AppManager.js";
import { createTaskCard, updateSectionTitle, noTaskOutput } from "./DOMManager";
import { sortTodosByPriority } from "./helpers.js";

export function loadAllTask() {
  updateSectionTitle("All Tasks");
  const content = document.querySelector('#content')
  content.innerHTML = "";

  const todos = getAllTodos();

  if (todos.length !== 0) {
    sortTodosByPriority(todos);
    todos.forEach(todo => createTaskCard(todo));
  } else {
    noTaskOutput();
  }
}