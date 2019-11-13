let vars = {
	link1: "http://uAliFurkanY.github.io/",
	link2: "http://github.com/uAliFurkanY/uAliFurkanY.github.io/",
	link3: "http://ebtc.ml",
	link4: "http://github.com/uAliFurkanY/urlshortener/",
	link5: "http://colorbrightness.ml/",
	link6: "http://github.com/uAliFurkanY/colorbrightness/",
	link7: "http://uAliFurkanY.github.io/donation-button/",
	link8: "http://github.com/uAliFurkanY/uAliFurkanY.github.io/tree/master/donation-button/",
	link9: "http://alifurkany.ml/"
};

let fill_vars = new fillVars(vars);
fill_vars.fill();

let i = 1;
setInterval(function () {
	switch (i % 9) {
		case 1:
			document.title = " Welcome!";
			break;
		case 2:
			document.title = "! Welcome";
			break;
		case 3:
			document.title = "e! Welcom";
			break;
		case 4:
			document.title = "me! Welco";
			break;
		case 5:
			document.title = "ome! Welc";
			break;
		case 6:
			document.title = "come! Wel";
			break;
		case 7:
			document.title = "lcome! Wel";
			break;
		case 8:
			document.title = "elcome! W";
			break;
		case 0:
			document.title = " Welcome!";
			break;
	}
	i++;
}, 200);