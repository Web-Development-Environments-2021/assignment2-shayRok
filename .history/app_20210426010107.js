var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var listOfUsers = [['k','k']];
var leftArrow = 37;
var rightArrow = 39;
var upArrow = 38;
var downArrow = 40;
var pinki = new Object();
var bluei = new Object();
var yellowi = new Object();
var redi = new Object();
// var ghosts = [pinki, bluei, redi, yellowi];
// var pic_pinki = new Image();
// pic_pinki.src('Image/pink.png');
// var pic_redi = new Image();
// pic_redi.src('Image/redi.png');
// var pic_bluei = new Image();
// pic_bluei.src('Image/Bluei.png');
// var pic_yellowi = Image();
// pic_yellowi.src('Image/yellowi.png');

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
	//number of balls value slider
	var slider = document.getElementById("balls");
	var output = document.getElementById("numberballs");
	output.innerHTML = slider.value;
	//number of monsters value slider
	var slider2 = document.getElementById("monsters");
	var output2 = document.getElementById("numbermonsters");
	output2.innerHTML = slider2.value;

	// open and close modal
	//get modal
	var modal = document.getElementById("about");
	//get openModal from menu
	var btn = document.getElementById("openModal");
	//get close buttom X
	var span = document.getElementsByClassName("close")[0];
	// When the user clicks the openModal-> open the modal 
	btn.onclick = function() {
	modal.style.display = "block";
	}
	// When the user clicks on <span> (x)-> close the modal
	span.onclick = function() {
	modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal-> close the modal
	window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
	}
	// When the user clicks on Esc key-> close the modal
	var modal = document.querySelector('.modal')
	window.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
		modal.style.display = 'none'
	}
	})
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = document.getElementById("balls").value;
	var food_5_points_remain = Math.floor(food_remain * 0.6);//5 in board
	var food_15_points_remain = Math.floor(food_remain * 0.3);//15 in board
	var food_25_points_remain = food_remain - food_5_points_remain - food_15_points_remain;//25 in board
	var food_remain_list = {"food_5_points_remain": food_5_points_remain, "food_15_points_remain": food_15_points_remain, "food_25_points_remain": food_25_points_remain};
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					if("food_5_points_remain" in food_remain_list && food_remain_list["food_5_points_remain"] == 0){
						delete food_remain_list["food_5_points_remain"];
						// food_5_points_remain--;
						// board[i][j] = 5;
						// food_remain--;
					}
					if("food_15_points_remain" in food_remain_list && food_remain_list["food_15_points_remain"] == 0){
						delete food_remain_list["food_15_points_remain"];
						// food_15_points_remain--;
						// board[i][j] = 15;
						// food_remain--;
					}
					if("food_25_points_remain" in food_remain_list && food_remain_list["food_25_points_remain"] == 0){
						delete food_remain_list["food_25_points_remain"];
						// food_25_points_remain--;
						// board[i][j] = 25;
						// food_remain--;
					}
					
					var index = Math.floor(Math.random() * Object.keys(food_remain_list).length);
					var keyString = Object.keys(food_remain_list)[index];// the key
					if(keyString == food_5_points_remain){
						board[i][j] = 5;
					}
					else if(keyString == food_15_points_remain){
						board[i][j] = 15;
					}
					else{
						board[i][j] = 25;
					}
					food_remain--;
					food_remain_list[keyString] = food_remain_list[keyString] - 1;
					
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while ("food_5_points_remain" in food_remain_list && food_remain_list["food_5_points_remain"] > 0){
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = 5;
			food_remain_list["food_5_points_remain"]--;
			food_remain--;
		}
	while ("food_15_points_remain" in food_remain_list && food_remain_list["food_15_points_remain"] > 0){
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = 15;
			food_remain_list["food_15_points_remain"]--;
			food_remain--;
		}
	while("food_25_points_remain" in food_remain_list && food_remain_list["food_25_points_remain"] > 0){
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = 25;
			food_remain_list["food_25_points_remain"]--;
			food_remain--;
		}

	// for (var x = 0; x < ghosts_amount; x++) {
		// 		if(x==0){
		// 			pinki.i = 1;
		// 			pinki.j = 1;
		// 			board[1][1] = 6;
		// 		}
		// 		if(x==1){
		// 			redi.i = 1;
		// 			redi.j = 10;
		// 			board[1][10] = 7;
		// 		}
		// 		if(x==3){
		// 			bluei.i = 10;
		// 			bluei.j = 1;
		// 			board[10][1] = 8;
		// 		}
		// 		if(x==4){
		// 			yellowi.i = 10;
		// 			yellowi.j = 10;
		// 			board[10][10] = 9;
		// 		}
			
		// }


	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upArrow]) {
		return 1;
	}
	if (keysDown[downArrow]) {
		return 2;
	}
	if (keysDown[leftArrow]) {
		return 3;
	}
	if (keysDown[rightArrow]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 5) {
				//color5
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementById("color5").value; //color
				context.fill();
				
			} else if (board[i][j] == 15) {
				//color15
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementById("color15").value; //color
				context.fill();
			} else if (board[i][j] == 25) {
				//color25
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementById("color25").value; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}// } else if (board[i][j] == 6) {
			// 	context.drawImage(pic_pinki, center.x-30, center.y-30 ,60,60);
			// } else if (board[i][j] == 7) {
			// 	context.drawImage(pic_redi, center.x-30, center.y-30 ,60,60);
			// } else if (board[i][j] == 8) {
			// 	context.drawImage(pic_bluei, center.x-30, center.y-30 ,60,60);
			// } else if (board[i][j] == 9) {
			// 	context.drawImage(pic_yellowi, center.x-30, center.y-30 ,60,60);
			// }
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5 || board[shape.i][shape.j] == 15 || board[shape.i][shape.j] == 25) {
		score = score + board[shape.i][shape.j];
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if(time_elapsed == parseFloat(document.getElementById("timer").value)){
		if(score < 100){
			window.alert("You are better then "+score+" points!");
		}
		else{
			window.alert("Winner!!!");
		}
	}
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

//validation with jquery
$(document).ready(function() {
	// register
	$("#register_form").validate({
	rules: {
		username : {
		required: true,
		checkFreeName: true
		},

		password: {
		required: true,
		minlength: 6,
		ContainsAtLeastOneDigitLetter: true
		},

		firstname : {
		required: true,
		lettersonly: true
		},
		lastname : {
		required: true,
		lettersonly: true
		},
	
		email: {
		required: true,
		email: true
		},
		birthdate: {
		required: true
		}
	},
	messages : {
		username:{
		checkFreeName: "User name is not available"

		},
		password: {
			ContainsAtLeastOneDigitLetter: "Password must contain letters and digits",
			minlength: "Password should be at least 6 characters"
			},

		firstname: {
		lettersonly: "First Name should be letters only"
		},
		lastname: {
		lettersonly: "Last Name should be letters only"
		},
	
		email: {
		email: "The email should be in the format: abc@domain.tld"
		}
	}, 
	submitHandler: function() {
		submit();
		show('welcome');
		let form = $("#register_form");
		form[0].reset();
		}
	});
//login
	$("#login_form").validate({
		rules: {
			username_login : {
			required: true,
			},
	
			password_login: {
			required: true,
			passwordValid: true
			},
		},
		messages : {
			username_login:{
			},
			password_login: {
			passwordValid: "Invalid password for this user"

			},
		}, 
		submitHandler: function() {
			alert('hello');
			backToConfig();
			let form = $("#login_form");
			form[0].reset();
			}
		});
	});

$(function() {

		$.validator.addMethod("passwordValid", function() {
			var username = document.getElementById("username_login").value;
			var password = document.getElementById("password_login").value;
			var storagePass = "";
			for (var i = 0; i < listOfUsers.length; i++) {
				if (listOfUsers[i][0] == username) {
					if (listOfUsers[i][1] == password) {
						storagePass = listOfUsers[i][1];
						break;
					}
				}
			}
			if (storagePass=="") {
				return false;
			}
				return true;
			
		});
		

	$.validator.addMethod("lettersonly", function(value, element)
	{
	if(this.optional(element) || /^[a-z ]+$/i.test(value)){
		return true;
	}
	return false;
	});

	$.validator.addMethod("checkFreeName", function(value){
		for (var i = 0; i < listOfUsers.length; i++) {
			if (listOfUsers[i][0] == value) {
				return false;
			}
			}
	
		return true;
	

	});

	$.validator.addMethod("ContainsAtLeastOneDigitLetter", function(value) 
	{ 
	if(/[a-z].[0-9]|[0-9].[a-z]/i.test(value)){
		return true;
	} 
	return false;
	});
});

// page switch
function show(target){
    hideAllPages();//hide all pages
    document.getElementById(target).style.display = 'block';//show selected page
    return false;//cancel page navigation
}

function hideAllPages(){
    var pages = document.getElementsByClassName("pages");
    for(var i = 0; i < pages.length; i++){
        pages[i].style.display = 'none';
    }
}


function submit(){
	var usernameInput = document.getElementById("username").value;
	var passwordInput = document.getElementById("password").value;
	listOfUsers.push([usernameInput, passwordInput]);
	alert('Succesfully registered');
}

function cancleReg(){
	show('welcome');
			let form = $("#login_form");
			form[0].reset();
}



// register form- show password
function showPassword() {
	var x = document.getElementById("password");
	if (x.type === "password") {
	  x.type = "text";
	} else {
	  x.type = "password";
	}
}

function chosenNumberBalls(val) {
	document.getElementById("numberballs").innerHTML = val;  
	document.getElementById("numberballs").display("block");
}

function chosenNumberMonsters(val) {
	document.getElementById("numbermonsters").innerHTML = val;
	document.getElementById("numbermonsters").display("block");
}

function random(){
	document.getElementById('right').value = "ArrowRight"; 
	document.getElementById('left').value = "ArrowLeft";
	document.getElementById('up').value = "ArrowUp";
	document.getElementById('down').value = "ArrowDown";
	document.getElementById('color5').value = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
	document.getElementById('color15').value = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
	document.getElementById('color25').value = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
	document.getElementById('timer').value = Math.floor(Math.random() * (1000 - 60 + 1) ) + 60;
	document.getElementById('balls').value = Math.floor(Math.random() * (90 - 50 + 1) ) + 50;
	document.getElementById('numberballs').innerHTML = document.getElementById('balls').value; 
	document.getElementById('monsters').value = Math.floor(Math.random() * (4 - 1 + 1) ) + 1;
	document.getElementById('numbermonsters').innerHTML = document.getElementById('monsters').value; 
}

// set keyboard User
function setFitKey(direction, event){
	if (direction == 'left') {
		leftArrow = event.keyCode;
		document.getElementById('left').value = event.key;
	}
	if (direction == 'right') {
		rightArrow = event.keyCode;
		document.getElementById('right').value = event.key;
	}
	if (direction == 'up') {
		upArrow = event.keyCode;
		document.getElementById('up').value = event.key;
	}
	if (direction == 'down') {
		downArrow = event.keyCode;
		document.getElementById('down').value = event.key;
	}
}


function updateAttributes(target){
	document.getElementById(target).style.display = 'block';//show selected page
	const inputs = document.querySelectorAll('input.configBtn');
	inputs.forEach(input => input.disabled = true);
	Start();
}

function backToConfig(){
	const inputs = document.querySelectorAll('input.configBtn');
	inputs.forEach(input => input.disabled = false);
	show('configuration');
}

	
