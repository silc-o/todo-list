import { getAllTodos } from "./AppManager";
import { createTaskCard, updateSectionTitle, noTaskOutput } from "./DOMManager";
import { sortTodosByPriority } from "./helpers";

function getLocalDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays); // Adds offsetDays (e.g., 0 for today, 7 for 7 days ahead)

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`; // "YYYY-MM-DD"
}

export function loadNext7DaysTasks() {
  const content = document.querySelector('#content')
  content.innerHTML = "";

  updateSectionTitle("Next 7 Days Tasks");

  const today = getLocalDate(0);
  const nextWeek = getLocalDate(7);

  const upcomingTodos = getAllTodos().filter(todo => {
    return todo.dueDate >= today && todo.dueDate <= nextWeek;
  });

  if (upcomingTodos.length !== 0) {
    sortTodosByPriority(upcomingTodos);
    upcomingTodos.forEach(todo => createTaskCard(todo));
  } else {
    noTaskOutput();
  }
}