function showIFrame() {
	Swal.fire({
		title: 'Donation',
		html: '<iframe src="http://uAliFurkanY.github.io/donation-button/donate.html#ewoJInJlY2VpdmVyTmFtZSI6ICJBbGkgRnVya2FuIFlJTERJWiIsCgkiZGVzY3JpcHRpb24iOiAiRmVlbCBmcmVlIHRvIGRvbmF0ZS4iLAoJIm1lYW5zIjogWwoJCXsKCQkJIm5hbWUiOiAiQml0Y29pbiIsCgkJCSJkZXNjcmlwdGlvbiI6ICIiLAoJCQkibGluayI6ICJodHRwczovL3d3dy5ibG9ja2NoYWluLmNvbS9idGMvcGF5bWVudF9yZXF1ZXN0P2FkZHJlc3M9MVFGUGtCVWlkUkd5NzVnaVVvbzVSN1htNENydG5LRTFDbiZhbW91bnQ9MC4wMDA1IiwKCQkJImFkZHJlc3MiOiAiMVFGUGtCVWlkUkd5NzVnaVVvbzVSN1htNENydG5LRTFDbiIKCQl9LAoJCXsKCQkJIm5hbWUiOiAiTkFOTyIsCgkJCSJkZXNjcmlwdGlvbiI6ICIiLAoJCQkibGluayI6ICJodHRwczovL215bmFuby5saW5rL25hbm9fMTZ6dzY3M2J6bnRycHBrcXNycHRweWl6azZpcDFhb21mY3IzOWZxYWk3cjRhMXl5M2N5ZGdmb3I2bWFpIiwKCQkJImFkZHJlc3MiOiAibmFub18xNnp3NjczYnpudHJwcGtxc3JwdHB5aXprNmlwMWFvbWZjcjM5ZnFhaTdyNGExeXkzY3lkZ2ZvcjZtYWkiCgkJfQoJXQp9" scrolling="no" style="width:450px;height:450px;border:0;padding:0;overflow:hidden;"></iframe>'
	});
}

let i = 0;
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
}, 400);