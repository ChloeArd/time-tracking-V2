// @ts-ignore
import {ButtonList, createElementA} from "./ButtonList.ts";

export class List {

    constructor(public parent : HTMLElement, public id : string, public timeProject: string, public timeTodo: string) {}

    public view(name: string, id: string) {
        let container = document.createElement("div") as HTMLDivElement;
        container.className = "width_100 flexRow list";
        this.parent.append(container);

        let listName = document.createElement("p") as HTMLParagraphElement;
        listName.className = "width_90";
        listName.innerHTML = name;
        container.append(listName);

        const buttonList: ButtonList = new ButtonList(container, "");
        buttonList.chrono("chrono" + this.id, container, "time" + id, this.timeProject, this.timeTodo, id, this.id);

        let line = document.createElement("div") as HTMLDivElement;
        line.className = "lineHorizontal";
        this.parent.append(line);
    }

    public viewListProjectId(name: string, id: string, date: string, time: string, idProject: string) {
        let container = document.createElement("div") as HTMLDivElement;
        container.className = "width_100 flexRow list";
        this.parent.append(container);

        let listName = document.createElement("p") as HTMLParagraphElement;
        listName.className = "width_90";
        listName.innerHTML = name;
        container.append(listName);

        let div = document.createElement("div") as HTMLDivElement;
        div.className = "width_10 center";
        div.innerHTML = "<i class='far fa-calendar-alt'> " + date;
        container.append(div);

        let div2 = document.createElement("div") as HTMLDivElement;
        div2.className = "width_10 center";
        div2.innerHTML = "<i class='fas fa-stopwatch'> " + time;
        container.append(div2);

        const buttonList: ButtonList = new ButtonList(container, id, idProject);
        buttonList.edit();
        buttonList.delete();

        let line = document.createElement("div") as HTMLDivElement;
        line.className = "lineHorizontal";
        this.parent.append(line);
    }
}