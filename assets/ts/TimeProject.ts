
export class TimeProject {

    constructor(public parent : HTMLElement, public id : string) {}

    public time(time: string) {
        create("<i class=\"far fa-clock\"></i>", this.parent, time, "3");
    }

    public date (date: string) {
        create("<i class=\"far fa-calendar-alt\"></i>", this.parent, date, this.id);
    }

}

function create(icon: string, parent: HTMLElement, content: string, id: string) {
    let div = document.createElement("div") as HTMLDivElement;
    div.className = "time center";
    div.innerHTML = icon;
    parent.append(div);

    let element =  document.createElement("p") as HTMLParagraphElement;
    element.innerHTML = content;
    element.id = "time" + id;
    div.append(element);
}