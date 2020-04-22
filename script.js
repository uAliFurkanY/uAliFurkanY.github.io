function set_status(query = "", status = true) {
	$(query).toggleClass("fa-times-circle", !status);
	$(query).toggleClass("fa-check-circle", status);
	$(query).toggleClass("text-danger", !status);
	$(query).toggleClass("text-success", status);
}

async function loadStatus() {
	try {
		let answer = await $.ajax("http://afy.ddns.net/status.php");
		set_status("i#server-status", true);
		if (answer.database_status === "up") {
			set_status("i#database-status", true);
			$("a#database-version").html(answer.database_version);
			$("a#database-name").html(answer.database_name);
		} else {
			set_status("i#database-status", false);
			$("a#database-version,a#database-name").toArray().forEach(element => {
				$(element).html("Database down.");
				$(element).toggleClass("text-danger", true);
			});
		}
		$("a#server-name").html(answer.server_name);
		$("a#php-version").html(answer.php_version);
	} catch (ex) {
		set_status("i#server-status", false);
		$("a#server-name,a#php-version,a#database-version,a#database-name").toArray().forEach(element => {
			$(element).html("Server down.");
			$(element).toggleClass("text-danger", true);
		});
		set_status("i#database-status", false);
	}
}

loadStatus().then(() => {
	$('div#status-div-head')[0].style.display = 'block';
});