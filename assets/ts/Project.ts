// @ts-ignore
import {ButtonProject} from "./ButtonProject.ts";
// @ts-ignore
import {TimeProject} from "./TimeProject.ts";
// @ts-ignore
import {ButtonList} from "./ButtonList.ts";
// @ts-ignore
import {List} from "./List.ts";

export class Project {

    // View all projects
    public view() {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onload = function () {
            let response: string = xhr.responseText;
            let json: any = JSON.parse(response);

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
                            const list: List = new List(div5, json2[x].id, json[i].time, json2[x].time);
                            list.view(json2[x].name, json[i].id);
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

    // View one project
    public viewOnly()  {
        let url: string = document.location.search;

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onload = function () {
            let response: string = xhr.responseText;
            console.log(response);
            let json: any = JSON.parse(response);
            console.log(json);
            console.log(json.ownProduct[0].id);
            for (let i = 0; i < json.ownProduct.length; i++) {
                let projects = document.getElementById("projectOnly") as HTMLDivElement;
                let divContainer: HTMLDivElement = document.createElement("div");
                divContainer.className = "project flexColumn width_90";
                divContainer.id = "project" + json.ownProduct[i].id;
                projects.append(divContainer);

                let title: HTMLHeadingElement = document.createElement("h2");
                title.className = "center";
                title.innerHTML = json.ownProduct[i].name;
                divContainer.append(title);

                let div2: HTMLDivElement = document.createElement("div");
                div2.className = "flexRow width_100 pad15";
                divContainer.append(div2);

                let div5: HTMLDivElement = document.createElement("div");
                div5.className = "flexColumn width_100 containerList scroller height_600";
                div2.append(div5);


                let xhr2: XMLHttpRequest = new XMLHttpRequest();
                xhr2.onload = function () {
                    let response: string = xhr2.responseText;
                    let json2: any = JSON.parse(response);

                    // dsiplay a list of a project
                    for (let x = 0; x < json2.length; x++) {
                        if (json2[x].project_fk == json.ownProduct[i].id) {
                            const list: List = new List(div5, x);
                            list.viewListProjectId(json2[x].name, json2[x].id, json2[x].date, json2[x].time, json.ownProduct[i].id);

                        }
                    }
                }

                xhr2.open('GET', './../api/todo');
                xhr2.send();

                let div3: HTMLDivElement = document.createElement("div");
                div3.className = "flexRow align pad15";
                divContainer.append(div3);

                let div4 = document.createElement("div") as HTMLDivElement;
                div4.className = "width_50";
                div4.innerHTML = "<i class='far fa-clock'></i> Total heures passées : ";
                div3.append(div4);

                let span = document.createElement("span") as HTMLSpanElement;
                span.id = "timeProject" + json.ownProduct[i].id;
                span.innerHTML = json.ownProduct[i].time;
                div4.append(span);

                const buttonList: ButtonList = new ButtonList(div3, json.ownProduct[i].id);
                buttonList.add2();
            }

        }
        xhr.open('GET', './../api/project' + url);
        xhr.send();
    }

    public add() {
        let addProject = document.getElementById("addProject") as HTMLInputElement;

        addProject.addEventListener("click", function () {
            let name = document.getElementById('name') as HTMLInputElement;

            let xhr: XMLHttpRequest = new XMLHttpRequest();

            let data = {
                'name': name.value,
                'date': new Date().toLocaleDateString(),
                'time': "00:00:00",
            }

            xhr.open('POST', './../api/project', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        });
    }

    // When the timer ends I change the date and time of the project that of the task
    public edit (idProject : string, time : string, id: string, timeTodo: string) {
        console.log(id);
        let submitClick = document.getElementById("submit" + id) as HTMLInputElement;
        submitClick?.addEventListener("click", function () {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let idP = idProject.replace("time", "");

            let data = {
                'id': idP,
                'date': new Date().toLocaleDateString(),
                'time': time,
                'idTodo': id,
                'dateTodo': new Date().toLocaleDateString(),
                'timeTodo': timeTodo
            }

            xhr.open('PUT', './../api/project');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        });
    }

    public delete() {
        let deleteProject = document.getElementById("deleteProject") as HTMLInputElement;

        deleteProject.addEventListener("click", function () {
            let id = document.getElementById('id') as HTMLInputElement;

            let xhr: XMLHttpRequest = new XMLHttpRequest();

            let data = {
                'id': id.value,
            }

            xhr.open('DELETE', './../api/project');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        });
    }
}