// @ts-ignore
import {ButtonList} from "./ButtonList.ts";

export class List {

    constructor(public parent : HTMLElement, public id : string) {}

    public view(name: string, id: string) {
        let container = document.createElement("div") as HTMLDivElement;
        container.className = "width_100 flexRow list";
        this.parent.append(container);

        let listName = document.createElement("p") as HTMLParagraphElement;
        listName.className = "width_90";
        listName.innerHTML = name;
        container.append(listName);

        const buttonList: ButtonList = new ButtonList(container, "");
        buttonList.chrono("chrono" + this.id, container, "time" + id);

        let line = document.createElement("div") as HTMLDivElement;
        line.className = "lineHorizontal";
        this.parent.append(line);
    }

    public add() {

    }

    public update() {

    }

    public delete() {

    }
}