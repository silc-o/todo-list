import { getActiveProject, getAllTodos, getAllProjects } from "./AppManager";
import { sortTodosByPriority, getLocalDate } from "./helpers";

const content = document.querySelector('#content');

export function createTaskCard(todo) {
  const todoCard = document.createElement('div')
  todoCard.classList.add('todo-card')

  const todoCardLeft = document.createElement('div');
  todoCardLeft.classList.add('todo-left');
  const toggleBtn = document.createElement('button');
  toggleBtn.classList.add('toggle-btn');
  toggleBtn.setAttribute('aria-label', 'Mark as complete');

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container')

  const todoTitle = document.createElement('div');
  todoTitle.classList.add('todo-title');
  todoTitle.textContent = todo.title;

  const todoNotes = document.createElement('div');
  todoNotes.textContent = todo.description;
  titleContainer.appendChild(todoTitle);
  titleContainer.appendChild(todoNotes);

  todoCardLeft.appendChild(toggleBtn);
  todoCardLeft.appendChild(titleContainer);

  const todoCardRight = document.createElement('div');
  todoCardRight.classList.add('todo-right');
  const dateTime = document.createElement('time');
  dateTime.textContent = todo.dueDate;

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn')
  editBtn.textContent = 'edit';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = 'delete';

  todoCardRight.appendChild(dateTime);
  todoCardRight.appendChild(editBtn);
  todoCardRight.appendChild(deleteBtn);

  todoCard.appendChild(todoCardLeft);
  todoCard.appendChild(todoCardRight);

  content.appendChild(todoCard);
}

export function updateSectionTitle(title) {
  const sectionTitle = document.querySelector('#section-title');
  sectionTitle.textContent = title;
}

export function noTaskOutput() {
  const noTask = document.createElement('div');
  noTask.classList.add('no-task');
  noTask.textContent = 'Yay, No Tasks!';
  content.appendChild(noTask);
}

export function clearContent() {
  content.innerHTML = "";
} 

export function createProjectList(projectArray) {
  const projectList = document.querySelector('#nav-projects ul');
  
  projectArray.forEach(project => {
    const projectItem = document.createElement('li');
    projectItem.dataset.id = project.id;
    projectItem.classList.add('project-item');

    const projectName = document.createElement('span');
    projectName.classList.add('project-name');
    projectName.textContent = project.title;

    const projectMenuBtn = document.createElement('button');
    projectMenuBtn.classList.add('project-menu-btn');
    projectMenuBtn.setAttribute('aria-label', 'Project options');

    projectItem.appendChild(projectName);
    projectItem.appendChild(projectMenuBtn);
    projectList.appendChild(projectItem);
  })
}

export function renderAllTasks() {
  hideAddTodoBtn();

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

export function renderNext7DaysTasks() {
  hideAddTodoBtn();

  clearContent();
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

export function renderTodayTasks() {
  hideAddTodoBtn();

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

export function renderProjectList() {
  const projectList = document.querySelector('#nav-projects ul');
  projectList.innerHTML = "";

  const projects = getAllProjects();

  createProjectList(projects);
}


export function renderActiveProject() {
  showAddTodoBtn();

  const activeProject = getActiveProject();
  clearContent();
  updateSectionTitle(`'${activeProject.title}'`);

  const todos = activeProject.getTodos();
  if (todos.length !== 0) {
    sortTodosByPriority(todos);
    todos.forEach(todo => createTaskCard(todo));
  } else {
    noTaskOutput();
  }
}

function hideAddTodoBtn() {
  document.querySelector('#add-todo-btn').classList.add('hidden');
}

function showAddTodoBtn() {
  document.querySelector('#add-todo-btn').classList.remove('hidden');
}