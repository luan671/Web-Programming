
var start = new Date();
var end;
var elapsed_ms = end - start;
var seconds; 

var moves = 0;

var ids = [
"one",      "two",      "three",   "four",
"five",     "six",      "seven",   "eight",
"nine",     "ten",      "eleven",  "twelve",
"thirteen", "fourteen", "fifteen", ""
];

var shuffled = ids.slice();

var ids_numeric = {
	"one":1,       "two":2,       "three":3,    "four":4,
	"five":5,      "six":6,       "seven":7,    "eight":8,
	"nine":9,      "ten":10,      "eleven":11,  "twelve":12,
	"thirteen":13, "fourteen":14, "fifteen":15, "sixteen":16
};

var selected_background;

var movement = [
    [0, 1, 1, 0], 
    [0, 1, 1, 1], 
    [0, 1, 1, 1], 
    [0, 0, 1, 1], 
    [1, 1, 1, 0], 
    [1, 1, 1, 1], 
    [1, 1, 1, 1], 
    [1, 0, 1, 1], 
    [1, 1, 1, 0], 
    [1, 1, 1, 1], 
    [1, 1, 1, 1], 
    [1, 0, 1, 1], 
    [1, 1, 0, 0], 
    [1, 1, 0, 1], 
    [1, 1, 0, 1], 
    [1, 0, 0, 1] 
    ];

var background = ["super-mario", "pikachu", "goku", "totoro"];

 function initializeGame() {
 	var background_id = Math.floor((Math.random() * 4));
 	selected_background = background[background_id];

    document.getElementById(background[background_id]).selected = true;

    for (var i = 0; i < ids.length - 1; i++) {
    	document.getElementById(ids[i]).className = "tile " + background[background_id];
    }
    document.getElementById("player").autoplay;
}
function cheatBoard(){
shuffled = ids.slice();
displayBoard();
}

 function changeBackground() {
 	var class_name = document.getElementById("characters").value;

 	if (background.indexOf(class_name) < 0) {
 		return;
 	}

 	selected_background = class_name;

 	document.getElementById("main").innerHTML = "";

 	for (var i = 0; i < ids.length; i++) {
 		if (ids[i] == "") {
 			document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
 		} else {
 			var id_name = ids[i];
 			document.getElementById("main").innerHTML += '<div id="' + ids[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
 		}
 	}
 }

 function shuffleBoard() {
    shuffled = ids.slice(); 
    var sixteen = 15;

    for (var i = 0; i < 1000; i++) {

    	var movement_id = Math.floor((Math.random() * 4));

    	while(movement[sixteen][movement_id] != 1) {
    		movement_id = Math.floor((Math.random() * 4));
    	}

        var move_to;

        switch(movement_id) {
        	case 0:
        	move_to = sixteen - 4;
        	break;
                case 1:
                move_to = sixteen + 1;
                break;
                case 2:
                move_to = sixteen + 4;
                break;
                case 3:
                move_to = sixteen - 1;
                break;
            }

        var temp = shuffled[sixteen];
        shuffled[sixteen] = shuffled[move_to];
        shuffled[move_to] = temp;

        sixteen = move_to;
    }

    displayBoard();

}

 function displayBoard() {
 	document.getElementById("main").innerHTML = "";

 	for (var i = 0; i < shuffled.length; i++) {
 		if (shuffled[i] == "") {
 			document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
 		} else {
 			var id_name = shuffled[i];
 			document.getElementById("main").innerHTML += '<div id="' + shuffled[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
 		}
 	}



 	var movablepiece_id;

 	if (movement[shuffled.indexOf("")][0] == 1) {
 		movablepiece_id = shuffled.indexOf("") - 4;
 		document.getElementById(shuffled[movablepiece_id]).className += " movablepiece";
 		document.getElementById(shuffled[movablepiece_id]).setAttribute("onclick", "swapPieces(" + movablepiece_id + ", " + shuffled.indexOf("") + ")");
 	}

 	if (movement[shuffled.indexOf("")][1] == 1) {
 		movablepiece_id = shuffled.indexOf("") + 1;
 		document.getElementById(shuffled[movablepiece_id]).className += " movablepiece";
 		document.getElementById(shuffled[movablepiece_id]).setAttribute("onclick", "swapPieces(" + movablepiece_id + ", " + shuffled.indexOf("") + ")");
 	}

 	if (movement[shuffled.indexOf("")][2] == 1) {
 		movablepiece_id = shuffled.indexOf("") + 4;
 		document.getElementById(shuffled[movablepiece_id]).className += " movablepiece";
 		document.getElementById(shuffled[movablepiece_id]).setAttribute("onclick", "swapPieces(" + movablepiece_id + ", " + shuffled.indexOf("") + ")");
 	}

 	if (movement[shuffled.indexOf("")][3] == 1) {
 		movablepiece_id = shuffled.indexOf("") -1;
 		document.getElementById(shuffled[movablepiece_id]).className += " movablepiece";
 		document.getElementById(shuffled[movablepiece_id]).setAttribute("onclick", "swapPieces(" + movablepiece_id + ", " + shuffled.indexOf("") + ")");
 	}
    end        = new Date();
    elapsed_ms = end - start;
    seconds    = Math.round(elapsed_ms / 1000);
    document.getElementById("outputTime").innerHTML="Total time (in seconds): "+seconds;
    document.getElementById("outputMove").innerHTML="Total moves: "+moves;



}

 function swapPieces(movablepiece_id, empty_id) {
 	animateMovement(movablepiece_id, empty_id);

 	setTimeout(function() {
 		var temp = shuffled[empty_id];
 		shuffled[empty_id] = shuffled[movablepiece_id];
 		shuffled[movablepiece_id] = temp;

 		moves++;

 		displayBoard();
 		checkIfWon();
 	}, 600);
 }

 function animateMovement(movablepiece_id, empty_id) {
 	if (movablepiece_id - 4 == empty_id) {
 		console.log(shuffled[movablepiece_id]);
 		document.getElementById(shuffled[movablepiece_id]).className += " animate-up";
 	} else if (movablepiece_id + 1 == empty_id) {
 		document.getElementById(shuffled[movablepiece_id]).className += " animate-right";
 	} else if (movablepiece_id + 4 == empty_id) {
 		document.getElementById(shuffled[movablepiece_id]).className += " animate-down";
 	} else if (movablepiece_id - 1 == empty_id) {
 		document.getElementById(shuffled[movablepiece_id]).className += " animate-left";
 	}
 }

 function checkIfWon() {
    if (ids.toString() == shuffled.toString()) { 
    	var end        = new Date();
    	var elapsed_ms = end - start;
		var seconds    = Math.round(elapsed_ms / 1000);
		var back = document.createElement("button");
		back.innerHTML = "GO BACK";
		back.setAttribute('onClick', "location.reload()");

    	var html = "";
    	html += "<img src='win.gif' alt='You win' />";
    	html += "<p>Total time (in seconds): " + seconds + "</p>";
		html += "<p>Total moves : " + moves + "</p>";

		document.getElementById("win").innerHTML = html;
		document.body.appendChild(back);
    }
}
