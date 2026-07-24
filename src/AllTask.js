import { getAllTodos } from "./AppManager.js";
import { createTaskCard, updateSectionTitle, noTaskOutput } from "./DOMManager";

export function loadAllTask() {
  updateSectionTitle("All Tasks");
  const content = document.querySelector('#content')
  content.innerHTML = "";

  const todos = getAllTodos();

  if (todos.length !== 0) {
    todos.forEach(todo => createTaskCard(todo));
  } else {
    noTaskOutput();
  }
}