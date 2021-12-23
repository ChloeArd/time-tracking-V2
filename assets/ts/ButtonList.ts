// @ts-ignore
import {Chronometer} from "./Chronometer.ts";

export class ButtonList {

    constructor(public parent : HTMLElement, public id : string, public idProject: string) {}

    public add(){
        createElementA("edit", "<i class=\"fas fa-plus-square\"></i>", "View/addToDo.php?id=" + this.id, this.parent);
    }

    public edit() {
        createElementA("marg10", "<i class=\"fas fa-edit\"></i>", "./editToDo.php?id=" + this.id + "&id2=" + this.idProject, this.parent);
    }

    public delete() {
        createElementA("marg10", "<i class=\"fas fa-trash-alt\"></i>", "./deleteToDo.php?id=" + this.id + "&id2=" + this.idProject, this.parent);
    }

    public date() {

    }

    public time() {

    }

    public chrono(idList: string, parent: HTMLElement, idProject: string) {
        let element = document.createElement("i") as HTMLIFrameElement;
        element.id = idList;
        element.className = "fas fa-stopwatch width_10 center chrono";
        parent.append(element);

        const chronometer: Chronometer = new Chronometer();
        const chronoClick = document.getElementById(element.id) as HTMLIFrameElement;

        let click: number = 0;
        if (chronoClick) {
            chronoClick.addEventListener("click", function (e) {
                if (click === 0) {
                    chronometer.start();
                    this.classList.add("red");

                    click ++;
                }
                else {
                    chronometer.stop(idProject)
                    this.classList.remove("red");
                    click = 0;
                }
            });
        }
    }
}

export function createElementA (classN: string, icon : string, link: string, parent: HTMLElement) {
    let element =  document.createElement("a") as HTMLAnchorElement;
    element.className = classN;
    element.innerHTML = icon;
    element.href = link;
    parent.append(element);
}