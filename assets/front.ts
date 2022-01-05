// @ts-ignore
import {Project} from "./ts/Project.ts";
// @ts-ignore
import {List} from "./ts/List.ts";

const projects: Project = new Project();
const task: List = new List();

if (document.getElementById("projectsHome") as HTMLDivElement) {
    projects.view();
}

if (document.getElementById("addProject") as HTMLInputElement) {
    projects.add();
}

if (document.getElementById("deleteProject") as HTMLInputElement) {
    projects.delete();
}

if (document.getElementById("projectOnly") as HTMLDivElement) {
    projects.viewOnly();
}

if (document.getElementById("addTodo") as HTMLInputElement) {
    task.add();
}

if (document.getElementById("deleteTodo") as HTMLInputElement) {
    task.delete();
}

if (document.getElementById("updateTodo") as HTMLInputElement) {
    task.edit();
}