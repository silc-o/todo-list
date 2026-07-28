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
// });

// addTodo(workProject.id, {
//   title: "Send email",
//   description: "To manager",
//   dueDate: "2024-01-10",
//   priority: "low",
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

const todoModal = document.querySelector('#todo-modal');
const addTodoBtn = document.querySelector('#add-todo-btn');
const closeBtn = document.querySelector('#close-todo-dialog');
const todoForm = document.querySelector('#todo-form');

addTodoBtn.addEventListener('click', () => {
  todoModal.showModal();
})

closeBtn.addEventListener('click', () => {
  todoModal.close();
})

const titleInput = document.querySelector('#todo-title');
const descriptionInput = document.querySelector('#todo-description');
const DueInput = document.querySelector('#todo-due-date');
const priorityInput = document.querySelector('#todo-priority');

let currentTodoId = null;

const todoContainer = document.querySelector('#content');

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (currentTodoId === null) {
    addTodo({
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: DueInput.value,
      priority: priorityInput.value,
    });
  } else {
    const project = getActiveProject();
    const todo = project.find(todo => todo.id === currentTodoId);
    todo.title = titleInput.value;
    todo.description = descriptionInput.value;
    todo.dueDate = DueInput.value;
    todo.priorityInput = priorityInput.value;

    currentTodoId = null;
  }

  renderActiveProject();
  dialog.close();
})

todoContainer.addEventListener('click', (e) => {
  if (event.target.classList.contains('delete')) {
    const card = event.target.closest('.todo-card');
    const todoId = card.dataset.id;
    deleteTodo(todoId);
    renderActiveProject();
  }

  if (event.target.classList.contains('edit')) {
    const project = getActiveProject();
    const card = event.target.closest('.todo-card');
    const todoId = card.dataset.id;
    const todo = project.find(todo => todo.id === todoId);

    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    DueInput.value = todo.dueDate;
    priorityInput.value = todo.priorityInput;

    currentTodoId = todoId
    todoModal.showModal();
  }
})