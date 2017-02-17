const easingFn = function (t, b, c, d) {
	var ts = (t /= d) * t;
	var tc = ts * t;
	return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
}

const formatNr = function (nstr) {
	return ("00" + nstr % 1000).slice(-3);
}
const options = {
	useEasing: true,
	easingFn: easingFn,
	useGrouping: true,
	separator: ',',
	decimal: '.',
	prefix: '',
	suffix: '',
	formattingFn: formatNr
};

const Config = require('electron-config');
const rxFetch = require('rxjs-fetch');
const Rx = require('rxjs/Rx');

const config = new Config();

var currentTarget = 0;
var started = false;
var winImage;

function init() {
	var demo = new CountUp("nummer", 0, 999, 0, 10, options);

	var winner;
	var colors = [
		"#f88a00",
		"#fff"
	];

	demo.callback = function () {
		console.log("WINNER! endval: " + demo.endVal + " currentTarget: " + currentTarget);
		document.getElementById("bg").style["visibility"] = "visible";
		var i = 0;
		winner = Rx.Observable.timer(0, 200)
			.subscribe(() => {
				document.getElementById("nummer").style["color"] = colors[(++i) % 2];
			})
	}

	var next = function () {
		resetWinner();
		currentTarget = currentTarget + (Math.floor(Math.random() * 1399) + 400);
		demo.update(currentTarget);

		loadNextWinnerImage();
	};

	var resetWinner = function () {
		if (winner) {
			winner.unsubscribe();
		}
		document.getElementById("bg").style["visibility"] = "hidden";
		document.getElementById("nummer").style["color"] = "";
	}

	var winnerTags = ["win", "happy"]
	var sub;
	var loadNextWinnerImage = function () {
		if (sub) {
			sub.unsubscribe();
		}
		var tag = winnerTags[Math.floor((Math.random() * winnerTags.length))]
		console.log("tag=" + tag);
		sub = rxFetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + tag + '&fmt=json')
			.json()
			.subscribe(res => {
				var url = res.data.image_url;
				document.getElementById('winner').src = url;
			});
	}
	loadNextWinnerImage();

	//demo.start();

	document.body.onkeyup = function (e) {
		if (e.keyCode == 32) {
			next();
		};
		if (e.keyCode == 13) {
			resetWinner();
		}
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
