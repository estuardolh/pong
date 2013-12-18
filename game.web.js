var pad1, pad2, ball;
var player1_score = 0, player2_score = 0;
var paused = true;

var WIDTH = 120;
var counter_blink = 11;

var level_text = "Level 1";
var level = 1;
var level_elapsed = 0;

load();

document.onkeydown = key_down

var KEY_UP = 38, KEY_DOWN = 40;
var KEY_W = 87, KEY_S = 83;
var KEY_ENTER = 13;

function key_down(key){
	key = key || window.event;
	
	var friction_y = 0.9, vy = 100;
	
	pad1.fy = friction_y;
	pad2.fy = friction_y;
	
	if ( key.keyCode == KEY_W ){
		pad1.vy = - vy;
	}else if( key.keyCode == KEY_S ){
		pad1.vy = vy;
	}
	
	if( key.keyCode == KEY_UP ){
		pad2.vy = - vy;
	}else if( key.keyCode == KEY_DOWN ){
		pad2.vy = vy;
	}
	
	if( key.keyCode == KEY_ENTER ){
		paused = !paused;
	}
}

function load(){
	ascwar.setNeutral("-");
	ascwar.clearScreen();
	
	// left
	pad1 = new Square(4, 1);
	pad1.setSize(2, 12);
	pad1.draw();
	
	// right
	pad2 = new Square(114, 1);
	pad2.setSize(2, 12);
	pad2.draw();
	
	// ball
	ball = new Circle(parseInt(WIDTH/2), 10);
	ball.setRadius(3);
	ball.draw();
	ball.vx = 60; 
	ball.vy = 40;
}

function new_ball(right){	
	if( right == true ){
		ball.vx = Math.abs(ball.vx);
	}else if( right == false ){
		ball.vx = -Math.abs(ball.vx);
	}
}

ascwar.update = function(dt){
	if( paused == false){
		// keep inside the ball
		var ball_y = ball.y + ball.radius;
		var ball_x = ball.x + ball.radius;
		
		var dy = 5;
		
		if( ball_y > 0 && ball_y > 24 + ball.radius
			|| ball_y < dy ){
			ball.vy = -1 * ball.vy;
		}
		if( ball_x > 0 && ball_x > 118 + ball.radius
			|| ball.x < 0 + ball.radius ){
			ball.vx  = -1 * ball.vx;
		}
		
		// detect ball collide
		if( ball.x - ball.radius <= pad1.x ){
			if( ball.y > pad1.y && ball.y < pad1.y + pad1.height ){
				ball.vx = -1 * ball.vx;
				
				console.log("nice player 1");
			}else{
				new_ball(true);
				player2_score ++;
			}
		}
		
		if( ball.x >= pad2.x ){
			if( ball.y > pad2.y && ball.y < pad2.y + pad2.height ){
				ball.vx = -1 * ball.vx;
				
				console.log("nice player 2");
			}else{
				new_ball(false);
				player1_score ++;
			}
		}
		
		// display level
		level_elapsed += 0.2;
		if( level_elapsed > 100 ){
			level ++;
			ball.vy = ball.vy * 1.2;
			ball.vx = ball.vx * 1.2;
			
			level_elapsed = 0;
			level_text = "";
		}
		if ( level_elapsed < 20 ){
			level_text = "Level "+ level;
		}
		
		pad1.update();
		pad2.update();
		ball.update();
	}
}

ascwar.draw = function(dt){
	ascwar.clearScreen();
	
	pad1.draw();
	pad2.draw();
	ball.draw();
	
	ascwar.text(26, 1, " Player 1: " + player1_score + " ", "#");
	ascwar.text(74, 1, " Player 2: " + player2_score + " ", "#");
	
	ascwar.text(56, 1, level_text, "#");
	
	var starts = 10;
	var ends = 80;
	
	if (paused == true){
		if( counter_blink > starts && counter_blink < ends ){
			var x = 48;
			ascwar.text(x, 8, "     Press Enter to      ", "#");
			ascwar.text(x, 9, "                         ", "#");
			ascwar.text(x, 10, " +--  -+-   +   +-   -+- ");
			ascwar.text(x, 11, " |     |   / \\  | \\   |  ");
			ascwar.text(x, 12, " +-+   |   +-+  ++`   |  ");
			ascwar.text(x, 13, "   |   |   | |  | |   |  ");
			ascwar.text(x, 14, " --+   |   | |  | |   |  ");
		}else if(counter_blink > ends ){
			counter_blink = 0;
		}
		counter_blink++;
	}
	
}

console.log("loaded");