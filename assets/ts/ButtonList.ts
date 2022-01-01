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

    public chrono(idList: string, parent: HTMLElement, idProject: string, valueTimeProject: string, valueTimeTodo: string, idProject2: string, idList2: string) {
        let element = document.createElement("i") as HTMLIFrameElement;
        element.id = idList;
        element.className = "fas fa-stopwatch width_10 center chrono";
        parent.append(element);

        let form = document.createElement("form") as HTMLFormElement;
        form.method = "POST";
        form.action = "";
        form.id = "formChrono";
        parent.append(form);

        createInput(form, valueTimeProject, "timeProject", "hidden", "inputTimeProject" + idList2);
        createInput(form, valueTimeTodo, "timeTodo", "hidden", "inputTimeTodo" + idList2);
        createInput(form, idProject2, "idProject", "hidden", "inputIdProject" + idList2);
        createInput(form, idList2, "idTodo", "hidden", "inputIdTodo" + idList2);

        let button = document.createElement("button") as HTMLButtonElement;
        button.type = "submit";
        button.name = "send";
        button.innerHTML = "Ok";
        button.id = "submit" + idList2;
        form.append(button);

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
                    chronometer.stop(idProject, idList2)
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

export function createInput (parent: HTMLFormElement, value: string, name: string, type: string, id: string) {
    let input1 = document.createElement("input") as HTMLInputElement;
    input1.type = type;
    input1.value = value
    input1.name = name;
    input1.id = id;
    parent.append(input1);
}