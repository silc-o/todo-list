import "./styles.css";
import { addProject, getAllProjects, setActiveProject, getActiveProject, addTodo, toggleTodo, deleteTodo, deleteProject } from "./AppManager.js";
import { loadProjects } from "./StorageManager.js";
import { renderAllTasks, renderNext7DaysTasks, renderProjectList, renderTodayTasks, renderActiveProject } from "./DOMManager.js";

// test creating projects
addProject("Work");
addProject("Personal");
console.log("All projects:", getAllProjects());

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

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (currentTodoId === null) {
    addTodo({
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: DueInput.value,
      priority: priorityInput.value,
    });
  } else {
    const project = getActiveProject();
    const todo = project.getTodoById(todoId);
    todo.title = titleInput.value;
    todo.description = descriptionInput.value;
    todo.dueDate = DueInput.value;
    todo.priority = priorityInput.value;

    currentTodoId = null;
  }

  renderActiveProject();
  todoModal.close();
})

todoContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const card = event.target.closest('.todo-card');
    deleteTodo(card.dataset.id);
    renderActiveProject();
  }

  if (event.target.classList.contains('edit-btn')) {
    const project = getActiveProject();
    const card = event.target.closest('.todo-card');
    const todoId = card.dataset.id;
    const todo = project.find(todo => todo.id === todoId);

    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    DueInput.value = todo.dueDate;
    priorityInput.value = todo.priority;

    currentTodoId = todoId
    todoModal.showModal();
  }
})