import Todo from "./Todo";
import Project from "./Project";

const TODO_PROJECTS_KEY = 'todo_app_projects';

export function saveProjects(projects) {
  try {
    const jsonString = JSON.stringify(projects);
    localStorage.setItem(TODO_PROJECTS_KEY, jsonString)
  } catch (error) {
    console.error('Failed to save to localStorage', error);
  }
}

export function loadProjects() {
  try {
    const jsonString = localStorage.getItem(TODO_PROJECTS_KEY);
    
    if (jsonString === null) return [];
    
    const data = JSON.parse(jsonString);
    
  return data.map(obj => {
      const todos = obj.todos.map(todoObj => new Todo(todoObj)); // just pass the whole object
      return new Project(obj.name, todos, obj.id); // also preserve project id
    });
    
  } catch (error) {
    console.error('Failed to load from localStorage', error);
    return [];
  }
}
