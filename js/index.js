const remote = require("electron").remote;

function init() {
    var options = {
        useEasing: true,
        easingFn: (t, b, c, d) => {
            var ts = (t /= d) * t;
            var tc = ts * t;
            return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
        },
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: '',
        formattingFn: nstr => {
            return ("00" + nstr % 1000).slice(-3);
        }
    };

    var currentTarget = 0;

    var counter = new CountUp("nummer", 0, 999, 0, 10, options);

    var nextLuckyNumber = () => {
        // hack om er voor te zorgen dat de teller altijd minimaal 400 nummers voorbij
        // schuift. minimaal 400 / max 1399 om geen getallen over te slaan
        // alle getallen zijn dus WEL mogelijk!
        currentTarget = currentTarget + (Math.floor(Math.random() * 1399) + 400);
        counter.update(currentTarget);
    };

    document.addEventListener("click", event => {
        nextLuckyNumber();
    })

    document.addEventListener("keyup", event => {
        if (event.keyCode == 32) {
            nextLuckyNumber();
        };
    })
    document.addEventListener("keydown", event => {
        switch (event.key) {
            case "Escape":
                if (remote.getCurrentWindow().isKiosk()) {
                    remote.getCurrentWindow().setKiosk(false);
                }
                break;
        }
    });
}

