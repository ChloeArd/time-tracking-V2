import {Timer} from "easytimer.js";
// @ts-ignore
import {Project} from "./Project.ts";

export class Chronometer {

    public timer :Timer = new Timer();

    // start a chrono
    public start() {
        this.timer.start();
        this.timer.addEventListener("secondsUpdated", function (e) {});
    }

    // Stop a chrono
    public stop(id: string, idTodo: string) {
        // I recover the time of the project and the time of a list so that I can then add them up
        let time = document.getElementById(id) as HTMLParagraphElement;
        let time1: string = time.innerHTML;
        let time2: string  = this.timer.getTimeValues().toString();
        let seconds: number = parseInt(time1.slice(6, 8)) + parseInt(time2.slice(6,8));
        let minutes: number = parseInt(time1.slice(3, 5)) + parseInt(time2.slice(3, 5));
        let hours: number = parseInt(time1.slice(0, 3)) + parseInt(time2.slice(0, 3));

        conditionTime(hours, minutes, seconds, time, "");

        if (seconds >= 59 ) {
            seconds = seconds - 59;
            conditionTime(hours, minutes, seconds, time, time.innerHTML = hours + ":" + minutes + 1 + ":" + seconds);
        }
        if (minutes >= 59) {
            minutes = minutes - 59;
            conditionTime(hours, minutes, seconds, time, time.innerHTML = hours + 1 + ":" + minutes + ":" + seconds);
        }

        let y = time.id.replace("time", "");

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onload = function () {
            let response: string = xhr.responseText;
            let json: any = JSON.parse(response);

            for (let i = 0; i < json.length; i++) {
                if (json[i].id == y) {
                    json[i].time += time1;
                }
            }
        }

        xhr.open('GET', './../api/project');
        xhr.send();
        this.timer.stop();

        let timeTodo = document.getElementById("inputTimeTodo" + idTodo) as HTMLInputElement;
        let timeTodo1 = timeTodo.value;
        let seconds2: number = parseInt(timeTodo1.slice(6, 8)) + parseInt(time2.slice(6,8));
        let minutes2: number = parseInt(timeTodo1.slice(3, 5)) + parseInt(time2.slice(3, 5));
        let hours2: number = parseInt(timeTodo1.slice(0, 3)) + parseInt(time2.slice(0, 3));

        conditionTime2(hours2, minutes2, seconds2, timeTodo, "");

        if (seconds2 >= 59 ) {
            seconds2 = seconds2 - 59;
            conditionTime2(hours2, minutes2, seconds2, timeTodo, hours2 + ":" + minutes2 + 1 + ":" + seconds2);
        }
        if (minutes2 >= 59) {
            minutes2 = minutes2 - 59;
            conditionTime2(hours2, minutes2, seconds2, timeTodo, hours2 + 1 + ":" + minutes2 + ":" + seconds2);
        }

        let project = new Project();
        project.edit(id, time.innerHTML, idTodo, timeTodo.value);
    }
}

// Conditions for the weather to correctly display the new weather
function conditionTime(hours: number, minutes: number, seconds: number, time: { innerHTML: string; }, content: string) {
    if (hours < 10 && minutes < 10 && seconds < 10) {
        time.innerHTML = "0" + hours + ":0" + minutes + ":0" + seconds;
    }
    else if (hours < 10 && minutes < 10) {
        time.innerHTML = "0" + hours + ":0" + minutes + ":" + seconds;
    }
    else if (hours < 10 && seconds < 10) {
        time.innerHTML = "0" + hours + ":" + minutes + ":0" + seconds;
    }
    else if (minutes < 10 && seconds < 10) {
        time.innerHTML = hours + ":0" + minutes + ":0" + seconds;
    }
    else if (hours < 10) {
        time.innerHTML = "0" + hours + ":" + minutes + ":" + seconds;
    }
    else if (minutes < 10) {
        time.innerHTML = hours + ":0" + minutes + ":" + seconds;
    }
    else if (seconds < 10) {
        time.innerHTML = hours + ":" + minutes + ":0" + seconds;
    }
    else {
        time.innerHTML = content;
    }
}

// Conditions for time to correctly display the new time in an input as a value
function conditionTime2(hours: number, minutes: number, seconds: number, time: { value: string; }, content: string) {
    if (hours < 10 && minutes < 10 && seconds < 10) {
        time.value = "0" + hours + ":0" + minutes + ":0" + seconds;
    }
    else if (hours < 10 && minutes < 10) {
        time.value = "0" + hours + ":0" + minutes + ":" + seconds;
    }
    else if (hours < 10 && seconds < 10) {
        time.value = "0" + hours + ":" + minutes + ":0" + seconds;
    }
    else if (minutes < 10 && seconds < 10) {
        time.value = hours + ":0" + minutes + ":0" + seconds;
    }
    else if (hours < 10) {
        time.value = "0" + hours + ":" + minutes + ":" + seconds;
    }
    else if (minutes < 10) {
        time.value = hours + ":0" + minutes + ":" + seconds;
    }
    else if (seconds < 10) {
        time.value = hours + ":" + minutes + ":0" + seconds;
    }
    else {
        time.value = content;
    }
}