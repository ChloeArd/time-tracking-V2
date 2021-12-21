
export class ButtonProject {

    constructor(public parent : HTMLElement, public id : string) {}

    public view(){
        createElementA("<i class=\"far fa-eye\"></i>", "View/viewProject.php?id=" + "this.id", this.parent)
    }

    public delete() {
        createElementA("<i class=\"far fa-trash-alt\"></i>", "View/deleteProject.php?id=" + this.id, this.parent)
    }
}

function createElementA (icon : string, link: string, parent: HTMLElement) {
    let element =  document.createElement("a") as HTMLAnchorElement;
    element.className = "edit";
    element.innerHTML = icon;
    element.href = link;
    parent.append(element);
}