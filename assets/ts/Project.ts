// @ts-ignore
import {ButtonProject} from "./ButtonProject.ts";
// @ts-ignore
import {TimeProject} from "./TimeProject.ts";
// @ts-ignore
import {ButtonList} from "./ButtonList.ts";
// @ts-ignore
import {List} from "./List.ts";

export class Project {

    public project() {
        let projects = document.getElementById("projectsHome") as HTMLDivElement;

        let divContainer: HTMLDivElement = document.createElement("div");
        divContainer.className = "project flexColumn";
        divContainer.id = "?";
        projects.append(divContainer);

        let title: HTMLHeadingElement = document.createElement("h2");
        title.className = "center";
        title.innerHTML = "title";
        divContainer.append(title);

        let div2: HTMLDivElement = document.createElement("div");
        div2.className = "flexRow width_100 pad15";
        divContainer.append(div2);

        let div4: HTMLDivElement = document.createElement("div");
        div4.className = "flexColumn width_20 flexCenter";
        div2.append(div4);

        const timeProject: TimeProject = new TimeProject(div4, divContainer.id);
        timeProject.time();
        timeProject.date();

        let div3: HTMLDivElement = document.createElement("div");
        div3.className = "flexRow align pad15";
        divContainer.append(div3);

        let div5: HTMLDivElement = document.createElement("div");
        div5.className = "flexColumn width_80 containerList scroller";
        div2.append(div5);

        const button: ButtonProject = new ButtonProject(div3, divContainer.id);
        button.delete();
        button.view();

        const buttonList: ButtonList = new ButtonList(div3, divContainer.id);
        buttonList.add();

        const list: List = new List(div5, "?");
        list.view();
    }

    public add() {
        const send = document.getElementById("addProject") as HTMLInputElement;
        send.addEventListener("click", function () {
            let nameValue = document.getElementById("name") as HTMLInputElement;
            let date = new Date();

            let jsonObj: (string|number)[] = [];
            for (let i = 0; i < jsonObj.length; i++) {
                let item = {
                    id: i,
                    title: nameValue,
                    time: "00:00:00",
                    date: date.toLocaleDateString()
                }
                jsonObj.push(item);
            }
            console.log(jsonObj);

            alert(nameValue.value);

        });
    }

    public delete() {

    }
}