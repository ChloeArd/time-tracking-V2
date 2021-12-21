// @ts-ignore
import {Project} from "./ts/Project.ts";

const project: Project = new Project();

if (document.getElementById("projectsHome") as HTMLDivElement) {
    project.project();
}

if (document.getElementById("addProject") as HTMLInputElement) {
    project.add();
}
