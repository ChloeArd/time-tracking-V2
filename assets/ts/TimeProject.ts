
export class TimeProject {

    constructor(public parent : HTMLElement, public id : string) {}

    public time() {
        create("<i class=\"far fa-clock\"></i>", this.parent, "00:00:00", "3");
    }

    public date () {
        create("<i class=\"far fa-calendar-alt\"></i>", this.parent, "0000-00-00", this.id);
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