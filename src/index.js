import "./styles.css";
import { addProject, getAllProjects, setActiveProject, getActiveProject, addTodo, toggleTodo, deleteTodo, deleteProject, findProjectByTodoId } from "./AppManager.js";
import { loadProjects, saveProjects } from "./StorageManager.js";
import { renderAllTasks, renderNext7DaysTasks, renderProjectList, renderTodayTasks, renderActiveProject, refreshCurrentView } from "./DOMManager.js";

renderAllTasks();
renderProjectList();
loadProjects();

document.querySelector('#nav-home ul').addEventListener('click', (event) => {
  if (event.target.id === 'all-task') renderAllTasks();
  if (event.target.id === 'today-task') renderTodayTasks();
  if (event.target.id === 'sevenD-task') renderNext7DaysTasks();
});

document.querySelector('#nav-projects ul').addEventListener('click', (event) => {
  const li = event.target.closest('li');
  
  if (!li) return;
  
  const projectId = li.dataset.id;
  setActiveProject(projectId);
  renderActiveProject();
});

const todoModal = document.querySelector('#todo-modal');
const addTodoBtn = document.querySelector('#add-todo-btn');
const closeBtn = document.querySelector('#close-todo-dialog');
const todoForm = document.querySelector('#todo-form');

addTodoBtn.addEventListener('click', () => {
  const today = new Date().toISOString().split('T')[0];
  document.querySelector('#todo-due-date').min = today;
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

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (currentTodoId === null) { // submit
    addTodo({
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: DueInput.value,
      priority: priorityInput.value,
    });
  } else { // edit
    const project = findProjectByTodoId(currentTodoId);
    const todo = project.getTodoById(currentTodoId);
    todo.title = titleInput.value;
    todo.description = descriptionInput.value;
    todo.dueDate = DueInput.value;
    todo.priority = priorityInput.value;

    currentTodoId = null;
  }

  saveProjects(getAllProjects());
  refreshCurrentView(); // re-renders correct view
  todoModal.close();
})

todoContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const card = event.target.closest('.todo-card');
    deleteTodo(card.dataset.id);
    renderActiveProject();
  }

  if (event.target.classList.contains('edit-btn')) {
    const card = event.target.closest('.todo-card');
    const todoId = card.dataset.id;
    const project = findProjectByTodoId(todoId);
    const todo = project.getTodoById(todoId);

    if (!project) return;

    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    DueInput.value = todo.dueDate;
    priorityInput.value = todo.priority;

    currentTodoId = todoId
    todoModal.showModal();
  }
})

const projectDialog = document.querySelector('#project-dialog');
const projectForm = document.querySelector('#project-form');
const closeProjectDialog = document.querySelector('#close-project-dialog');

document.querySelector('#add-project-btn').addEventListener('click', () => {
  projectDialog.showModal();
});

closeProjectDialog.addEventListener('click', () => {
  projectDialog.close();
});

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#project-name-input').value;
  addProject(name);
  renderProjectList(); // update sidebar
  console.log("projects after add:", getAllProjects());
  projectDialog.close();
});