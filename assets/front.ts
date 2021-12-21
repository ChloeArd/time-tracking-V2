// @ts-ignore
import {Project} from "./ts/Project.ts";

const projects: Project = new Project();

if (document.getElementById("projectsHome") as HTMLDivElement) {
    projects.view();
}

if (document.getElementById("addProject") as HTMLInputElement) {
    projects.add();
}

let xhr = new XMLHttpRequest();
xhr.onload = function () {
    let response = xhr.responseText;
    console.log(response);
    let json = JSON.parse(response);
    console.log(json);
    console.log(json.project.title);
    console.log(response);
}

xhr.open('GET', './data/project.json');
xhr.send();
