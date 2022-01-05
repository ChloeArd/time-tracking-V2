// @ts-ignore
import {Project} from "./ts/Project.ts";

const projects: Project = new Project();

if (document.getElementById("projectsHome") as HTMLDivElement) {
    projects.view();
}

if (document.getElementById("addProject") as HTMLInputElement) {
    projects.add();
}

if (document.getElementById("projectOnly") as HTMLDivElement) {
    projects.viewOnly();
}