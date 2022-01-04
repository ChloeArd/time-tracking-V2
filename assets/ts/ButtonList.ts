// @ts-ignore
import {Chronometer} from "./Chronometer.ts";

export class ButtonList {

    constructor(public parent : HTMLElement, public id : string, public idProject: string) {}

    // A link for add a todo
    public add(){
        createElementA("edit", "<i class=\"fas fa-plus-square\"></i>", "View/addToDo.php?id=" + this.id, this.parent);
    }

    // A link for add a todo
    public add2(){
        createElementA("edit", "<i class=\"fas fa-plus-square\"></i>", "addToDo.php?id=" + this.id, this.parent);
    }

    // Link for edit a todo
    public edit() {
        createElementA("marg10", "<i class=\"fas fa-edit\"></i>", "./editToDo.php?id=" + this.id + "&id2=" + this.idProject, this.parent);
    }

    // Link for delete a todo
    public delete() {
        createElementA("marg10", "<i class=\"fas fa-trash-alt\"></i>", "./deleteToDo.php?id=" + this.id + "&id2=" + this.idProject, this.parent);
    }

// Button that activates and deactivates the stopwatch
    public chrono(idList: string, parent: HTMLElement, idProject: string, valueTimeProject: string, valueTimeTodo: string, idProject2: string, idList2: string) {
        let element = document.createElement("button") as HTMLButtonElement;
        element.id = idList;
        element.className = "width_10 center chrono";
        element.innerHTML = "<i class='fas fa-stopwatch'></i>"
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
        const chronoClick = document.getElementById(element.id) as HTMLButtonElement;

        let click: number = 0;

        if (chronoClick) {
            //When I click on the stopwatch, the stopwatch turns red to say that it is activated, I block the other buttons,
            // if I click again on the stopwatch it goes back to its initial color, to add the time, you have to press ok
            chronoClick.addEventListener("click", function (e) {
                if (click === 0) {
                    chronometer.start();
                    this.innerHTML = "<i class='fas fa-stopwatch red'></i>";

                    let classChrono = document.getElementsByClassName("chrono");
                    for (let i = 0; i < classChrono.length; i++) {

                        if (classChrono[i].id !== chronoClick.id) {
                            let chronoId = document.getElementById(classChrono[i].id) as HTMLButtonElement;
                            chronoId.disabled = Boolean("true");
                        }
                    }

                    click ++;
                }
                else {
                    chronometer.stop(idProject, idList2)
                    this.innerHTML = "<i class='fas fa-stopwatch'></i>";
                    click = 0;
                }
            });
        }
    }
}

// Create a element A
export function createElementA (classN: string, icon : string, link: string, parent: HTMLElement) {
    let element =  document.createElement("a") as HTMLAnchorElement;
    element.className = classN;
    element.innerHTML = icon;
    element.href = link;
    parent.append(element);
}

// create a Input
export function createInput (parent: HTMLFormElement, value: string, name: string, type: string, id: string) {
    let input1 = document.createElement("input") as HTMLInputElement;
    input1.type = type;
    input1.value = value
    input1.name = name;
    input1.id = id;
    parent.append(input1);
}