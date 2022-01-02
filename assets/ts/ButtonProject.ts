// @ts-ignore
import {createElementA} from "./ButtonList.ts";

export class ButtonProject {

    constructor(public parent : HTMLElement, public id : string) {}

    // Button to view a project
    public view(){
        createElementA("edit", "<i class=\"far fa-eye\"></i>", "View/viewProject.php?id=" + this.id, this.parent)
    }

    // Button to delete a project
    public delete() {
        createElementA("edit", "<i class=\"far fa-trash-alt\"></i>", "View/deleteProject.php?id=" + this.id, this.parent)
    }
}