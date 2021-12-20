const Chronometer = require("express-chrono").Chronometer;

let chrono = new Chronometer({ format: "ms", suffix: true });

chrono.start();

setTimeout(() => {
    chrono.stop();

    console.log(chrono); // 100ms
}, 100);