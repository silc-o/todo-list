import { getAllProjects } from "./AppManager";
import { createProjectList } from "./DOMManager";

export function renderProjects() {
  const projectList = document.querySelector('#nav-projects ul');
  projectList.innerHTML = "";

  const projects = getAllProjects();

  createProjectList(projects);
}