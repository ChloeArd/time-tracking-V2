// @ts-ignore
import {ButtonProject} from "./ButtonProject.ts";
// @ts-ignore
import {TimeProject} from "./TimeProject.ts";
// @ts-ignore
import {ButtonList} from "./ButtonList.ts";
// @ts-ignore
import {List} from "./List.ts";

export class Project {

    public view() {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onload = function () {
            let response: string = xhr.responseText;
            let json: any = JSON.parse(response);
            console.log(json);

            for (let i = 0; i < json.length; i++) {

                let projects = document.getElementById("projectsHome") as HTMLDivElement;
                let divContainer: HTMLDivElement = document.createElement("div");
                divContainer.className = "project flexColumn";
                divContainer.id = "project" + json[i].id;
                projects.append(divContainer);

                let title: HTMLHeadingElement = document.createElement("h2");
                title.className = "center";
                title.innerHTML = json[i].name;
                divContainer.append(title);

                let div2: HTMLDivElement = document.createElement("div");
                div2.className = "flexRow width_100 pad15";
                divContainer.append(div2);

                let div4: HTMLDivElement = document.createElement("div");
                div4.className = "flexColumn width_20 flexCenter";
                div2.append(div4);

                let div3: HTMLDivElement = document.createElement("div");
                div3.className = "flexRow align pad15";
                divContainer.append(div3);

                let div5: HTMLDivElement = document.createElement("div");
                div5.className = "flexColumn width_80 containerList scroller";
                div2.append(div5);

                let xhr2: XMLHttpRequest = new XMLHttpRequest();
                xhr2.onload = function () {
                    let response: string = xhr2.responseText;
                    let json2: any = JSON.parse(response);

                    // dsiplay a list of a project
                    for (let x = 0; x < json2.length; x++) {
                        if (json2[x].project_fk == json[i].id) {
                            const list: List = new List(div5, x);
                            list.view(json2[x].name, json[i].id);
                        }
                        else {
                        }
                    }
                }

                xhr2.open('GET', './../api/todo');
                xhr2.send();

                const timeProject: TimeProject = new TimeProject(div4, json[i].id);
                timeProject.time(json[i].time);
                timeProject.date(json[i].date);

                const button: ButtonProject = new ButtonProject(div3, json[i].id);
                button.delete();
                button.view();

                const buttonList: ButtonList = new ButtonList(div3, json[i].id);
                buttonList.add();
            }
        }

        xhr.open('GET', './../api/project');
        xhr.send();
    }

    public add() {
        const send = document.getElementById("addProject") as HTMLInputElement;
        send.addEventListener("click", function () {
            let name = document.getElementById("name") as HTMLInputElement;
            let nameValue: string = name.value;
            let date = new Date();

            /*let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                let response = xhr.responseText;
                let json = JSON.parse(response);
                let item = {
                    title: nameValue,
                    time: "00:00:00",
                    date: date.toLocaleDateString()
                }
                JSON.stringify(json.push(item));
            }

            xhr.open('POST', './../data/project.json');
            xhr.send();*/
        });
    }

    public delete() {

    }
}