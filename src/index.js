import "./styles.css";
import { addProject, getAllProjects, setActiveProject, getActiveProject, addTodo, toggleTodo, deleteTodo, deleteProject } from "./AppManager.js";
import { loadProjects } from "./StorageManager.js";
import { renderAllTasks, renderNext7DaysTasks, renderProjectList, renderTodayTasks, renderActiveProject } from "./DOMManager.js";

// // test creating projects
// addProject("Work");
// addProject("Personal");
// console.log("All projects:", getAllProjects());

// // test setting active project
// const workProject = getAllProjects()[0];
// setActiveProject(workProject.id);
// console.log("Active project:", getActiveProject());

// // test adding todos
// addTodo(workProject.id, {
//   title: "Finish report",
//   description: "Q4 report",
//   dueDate: "2024-01-15",
//   priority: "high",
//   notes: "Include Q3 comparison"
// });

// addTodo(workProject.id, {
//   title: "Send email",
//   description: "To manager",
//   dueDate: "2024-01-10",
//   priority: "low",
//   notes: ""
// });

// console.log("Work todos:", workProject.getTodos());

// // test toggle
// const firstTodo = workProject.getTodos()[0];
// console.log("Before toggle:", firstTodo.isComplete); // false
// toggleTodo(workProject.id, firstTodo.id);
// console.log("After toggle:", firstTodo.isComplete); // true

// // test localStorage saved correctly
// console.log("localStorage:", localStorage.getItem("todo_app_projects"));

// // test loading from localStorage
// const loaded = loadProjects();
// console.log("Loaded from storage:", loaded);

renderAllTasks();
renderProjectList();

document.querySelector('#nav-home ul').addEventListener('click', (event) => {
  if (event.target.id === 'all-task') renderAllTasks();
  if (event.target.id === 'today-task') renderTodayTasks();
  if (event.target.id === 'sevenD-task') renderNext7DaysTasks();
});

document.querySelector('#nav-projects ul').addEventListener('click', (event) => {
  const li = event.target.closest('li');
  setActiveProject(li.dataset.id);  
  renderActiveProject();
});
