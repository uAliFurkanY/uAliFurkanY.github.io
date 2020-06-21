let mode_a = $("a#mode")[0];
let form = $("form#config_form")[0];
let output_area = $("textarea#output")[0];
let delaysList = ["Kick: 0s, End: 5s, Error: 5m, Message: 0.5s", "Kick: 5s, End: 10s, Error: 10m, Message: 1.5s", "Kick: 10s, End: 20s, Error: 20m, Message: 2.5s", "Kick: 20s, End: 40s, Error: 40m, Message: 5s", "Kick: 5s, End: 15s, Error: 30m, Message: 2s (Recommended)"];
let delaysLabels = $("label[for='d0'],label[for='d1'],label[for='d2'],label[for='d3'],label[for='d4']").toArray();

let output_mode = "JSON";

delaysLabels.forEach(element => {
	element.textContent = delaysList[delaysLabels.findIndex(val => val === element)];
});

mode_a.onclick = e => {
	e.preventDefault();
	output_mode = output_mode === "JSON" ? "dotenv" : "JSON";
	mode_a.textContent = output_mode;
}
form.onsubmit = e => {
	e.preventDefault();
	handleConfig(new FormData(form));
}

function shellEscape(cmd) {
	return '"' + cmd.replace(/(["\s'$`\\])/g, '\\$1') + '"';
};

function handleConfig(data) {
	let output;
	let input = {
		HOST: data.get("host"),
		USERNAME: data.get("username"),
		PASSWORD: data.get("password"),
		MODE: data.get("mode"),
		OP: data.get("op"),
		DELAYS: data.get("delays"),
		REMOTE: data.get("remote") || "false",
		TCP_PORT: data.get("tcp_host"),
		TCP_HOST: data.get("tcp_port")
	};
	console.log(input);

	if (output_mode === "JSON") {
		output = JSON.stringify(input);
	} else {
		output = `CONF_HOST=${shellEscape(input.HOST)}
CONF_USERNAME=${shellEscape(input.USERNAME)}
CONF_PASSWORD=${shellEscape(input.PASSWORD)}
CONF_MODE=${shellEscape(input.MODE)}
CONF_OP=${shellEscape(input.OP)}
CONF_DELAYS=${shellEscape(input.DELAYS)}
CONF_REMOTE=${shellEscape(input.REMOTE)}
CONF_TCP_PORT=${shellEscape(input.TCP_PORT)}
CONF_TCP_HOST=${shellEscape(input.TCP_HOST)}`;
	}
	output_area.textContent = output;
}

function copy() {
	let wasSelected = isSelected(output_area);
	if (!wasSelected) {
		select();
		document.execCommand("copy");
		unSelect();
	}
	else
		document.execCommand("copy");
}

function select() {
	output_area.select();
}

function unSelect() {
	output_area.selectionStart = output_area.textContent.length;
	output_area.selectionEnd = output_area.textContent.length;
}

function isSelected(el) {
	return el.selectionEnd - el.selectionStart === el.textContent.length;
}