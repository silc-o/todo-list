import Project from "./Project";

let projects = [];
let activeProject = null;

export function getActiveProject() {
  return activeProject;
}

export function setActiveProject(projectId) {
  const index = projects.findIndex(project => project.id === projectId);
  activeProject = projects[index];
}

export function getProjects() {
  return projects;
}

export function addProject(name) {
  const newProject = new Project(name);
  projects.push(newProject);
  
  if (!activeProject) {
    activeProject = newProject;
  }

  return newProject;
}

export function deleteProject(projectId) {
  projects = projects.filter(project => project.id !== projectId);
  
  if (activeProject && activeProject.id === projectId) {
    activeProject = projects[0] || null;
  }
}

export function addTodoToActiveProject(todo) {
  if (activeProject) {
    activeProject.addTodo(todo);
  }
}

export function deleteTodofromActiveProject(todoId) {
  if (activeProject) {
    activeProject.removeTodo(todoId);
  }
}




