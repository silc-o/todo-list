import Project from "./Project";
import Todo from "./Todo";
import { saveProjects } from "./StorageManager";

let projects = [];
let activeProject = null;

export function getActiveProject() {
  return activeProject;
}

export function setActiveProject(projectId) {
  activeProject = getProjectById(projectId);
  saveProjects(projects);
}

export function getAllProjects() {
  return projects;
}

export function getProjectById(projectId) {
  return projects.find(project => project.id === projectId);
}

export function addProject(name) {
  const newProject = new Project(name);
  projects.push(newProject);
  
  saveProjects(projects);
}

export function deleteProject(projectId) {
  projects = projects.filter(project => project.id !== projectId);
  saveProjects(projects)
}

export function addTodo(todoData) {
  const project = getActiveProject();
  const todo = new Todo(todoData);
  project.addTodo(todo);
  saveProjects(projects);
}

export function deleteTodo(todoId) {
  const project = getActiveProject();

  if (!project) return;

  project.todos = project.todos.filter(todo => todo.id !== todoId);
  saveProjects(projects);
}

export function toggleTodo(projectId, todoId) {
  const project = getProjectById(projectId);
  const todo = project.getTodoById(todoId);
  todo.toggleComplete();
  saveProjects(projects);
}

export function getAllTodos() {
  return projects.flatMap(project => project.getTodos());
}




