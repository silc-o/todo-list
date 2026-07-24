import "./styles.css";
import { loadAllTask } from "./AllTask.js";

import { addProject, getAllProjects, setActiveProject, getActiveProject, addTodo, toggleTodo, deleteTodo, deleteProject } from "./AppManager.js";
import { loadProjects } from "./StorageManager.js";
import { loadTodayTasks } from "./TodayTasks.js";
import { loadNext7DaysTasks } from "./NextSevenDays.js";

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

loadAllTask();

document.querySelector('#all-task').addEventListener('click', loadAllTask);
document.querySelector('#today-task').addEventListener('click', loadTodayTasks);
document.querySelector('#sevenD-task').addEventListener('click', loadNext7DaysTasks )