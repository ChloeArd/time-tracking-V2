// @ts-ignore
import {Chronometer} from "./ts/Chronometer.ts";

const chronometer: Chronometer = new Chronometer();

const chronoClick = document.getElementById("chrono1") as HTMLIFrameElement;

let click : number = 0;
if (chronoClick) {
    chronoClick.addEventListener("click", function (e) {
        if (click === 0) {
            chronometer.start();
            this.classList.add("red");
            click ++;
        }
        else {
            chronometer.stop()
            this.classList.remove("red");
            click = 0;
        }
    });
}