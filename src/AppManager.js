import Project from "./Project";
import { saveProjects } from "./StorageManager";

let projects = [];
let activeProject = null;

export function getActiveProject() {
  return activeProject;
}

export function setActiveProject(projectId) {
  const index = getProject(projectId);
  activeProject = projects[index];
  saveProjects(projects);
}

export function getAllProjects() {
  return projects;
}

export function getProject(projectId) {
  return projects.findIndex(project => project.id === projectId);
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

export function addTodo(projectId, todoData) {
  const project = getProjectById(projectId);
  const todo = new Todo(...todoData);
  project.addTodo(todo);
  saveProjects(projects);
}

export function deleteTodo(projectId, todoId) {
  const project = getProjectById(projectId);
  project.removeTodo(todoId);
  saveProjects(projects);
}

export function toggleTodo(projectId, todoId) {
  const project = getProjectById(projectId)
  project.toggleTodo(todoId);
  saveProjects(projects);
}





