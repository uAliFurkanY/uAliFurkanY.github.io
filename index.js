let title = document.title;
let i = 1;

setInterval(function(){
// "Welcome! " -> 9
	switch(i%9)
	{
		case 1:
			title = " Welcome!";
			break;
		case 2:
			title = "! Welcome";
			break;
		case 3:
			title = "e! Welcom";
			break;
		case 4:
			title = "me! Welco";
			break;
		case 5:
			title = "ome! Welc";
			break;
		case 6:
			title = "come! Wel";
			break;
		case 7:
			title = "lcome! Wel";
			break;
		case 8:
			title = "elcome! W";
			break;
		case 0:
			title = " Welcome!";
			break;
	}
	i++;
}