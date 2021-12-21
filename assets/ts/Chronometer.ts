import {Timer} from "easytimer.js";

export class Chronometer {

    public timer :Timer = new Timer();

    public start() {
        this.timer.start();
        this.timer.addEventListener("secondsUpdated", function (e) {
        });
    }

    public stop() {
        let time = document.getElementById("time1") as HTMLParagraphElement;
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
        this.timer.stop();
    }
}

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