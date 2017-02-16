var easingFn = function (t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
}

var formatNr = function (nstr) {
    return ("00" + nstr % 1000).slice(-3);
}
var options = {
    useEasing: true,
    easingFn: easingFn,
    useGrouping: true,
    separator: ',',
    decimal: '.',
    prefix: '',
    suffix: '',
    formattingFn: formatNr
};

var currentTarget = 0;



function init() {
    var demo = new CountUp("nummer", 0, 999, 0, 10, options);
    var next = function () {
        currentTarget = currentTarget + (Math.floor(Math.random() * 1399) + 400);
        demo.update(currentTarget);
    };
    //demo.start();  

    document.body.onkeyup = function (e) {
        if (e.keyCode == 32) {
            next();
        };
    }

    document.body.onclick = function () {
        next();
    }
}

const remote = require("electron").remote;

document.addEventListener("keydown", event => {

    switch (event.key) {
        case "Escape":
            if (remote.getCurrentWindow().isFullScreen()) {
                remote.getCurrentWindow().setFullScreen(false);
            }
            break;
    }
});