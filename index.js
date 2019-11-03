let i = 1;

setInterval(function(){
// "Welcome! " -> 9
	switch(i%9)
	{
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
}, 500);