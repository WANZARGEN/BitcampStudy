"use strict"
window.$ = window.jQuery = require('jquery')
var board = $('#puzzle-board')
var shuffleBtn = $('#shuffle-btn')
var body = $('body')
var testBtn = $('#test-btn')

var blankPiece
var leftPiece
var rightPiece
var upperPiece
var lowerPiece
var values//array
var blankId

shuffle()

shuffleBtn.click(function() {
  shuffle()
})

function shuffle() {
  values = []
  var randomNo
  var checkArr
  var randomIndex = 0
  while(randomIndex <= 15) {
    randomNo = parseInt(Math.random() *  150 / 9)
    checkArr = true
    for (var i = 0; i < values.length; i++) {
      if(values[i] == randomNo) {
        i = values.length
        checkArr = false
      }
    }
    if(checkArr && randomNo != 16) {
      values[i] = randomNo
      randomIndex++
    }
  }//while. set 0 ~ 15 in array
  setBoard()
  setMovingPieces()
  checkSolvability()
}//shuffle()

function setBoard() {
  board.html('')
  for (var i = 0; i < values.length; i++) {
    if(values[i] != 0) {
      $('<button type="button">').text(values[i])
                                 .attr('id', 'piece-' + i)
                                 .attr('class', 'hvr-buzz-out')
                                 .appendTo(board)
    } else {
      blankPiece = $('<button type="button">').attr('id', 'piece-' + i)
                                              .attr('style', 'background-color: Aquamarine;')
                                              .attr('class', 'hvr-buzz-out')
                                              .appendTo(board)
      blankId = i
    }
  }
  console.log(board.children())
  console.log(blankPiece, blankId)
}//setBoard()


function checkSolvability() {
  var inversions = 0
  for(var i = 0; i < values.length; i++) {
    for(var j = i + 1; j < values.length; j++) {
      if(values[i] != 0 || values[j] != 0) {
        if(values[i] > values[j])
        inversions++
      }
    }
  }
  console.log("Total inversions: ", inversions)
  if(inversions % 2 != 0) {
    setTimeout(function(){
      swal({
        title: "It's not solvable!",
        text: "요건 풀 수 없는 퍼즐이에요ㅠㅠ \n 다시 섞어주세요!",
        type: "warning",
        confirmButtonColor: "#2AA",
        confirmButtonText: "SHUFFLE AGAIN!",
      },
      function(isConfirm) {
        if(isConfirm) {
          swal.close();
          shuffle()
        }
      }
    )//swal()
  }, 100)//setTimeout()
}//if(inversions $ 2 != 0)
}//checkSolvability()

function setMovingPieces() {
  if(lowerPiece)
    lowerPiece.unbind('click')
              .attr('class', 'hvr-buzz-out')
  if(upperPiece)
    upperPiece.unbind('click')
              .attr('class', 'hvr-buzz-out')
  if(leftPiece)
    leftPiece.unbind('click')
              .attr('class', 'hvr-buzz-out')
  if(rightPiece)
    rightPiece.unbind('click')
              .attr('class', 'hvr-buzz-out')

  blankPiece.attr('class', '')

  lowerPiece = undefined
  upperPiece = undefined
  leftPiece = undefined
  rightPiece = undefined
  if(blankId < 12) {
    lowerPiece = $('#piece-' + (blankId + 4))
    lowerPiece.click(moveUp)
              .attr('class', 'hvr-float')
  }
  if(blankId > 3) {
    upperPiece = $('#piece-' + (blankId - 4))
    upperPiece.click(moveDown)
              .attr('class', 'hvr-sink')
  }
  if(blankId != 0 && blankId != 4 && blankId != 8 && blankId != 12) {
    leftPiece = $('#piece-' + (blankId - 1))
    leftPiece.click(moveRight)
             .attr('class', 'hvr-forward')
  }
  if(blankId != 3 && blankId != 7 && blankId != 11 && blankId != 15) {
    rightPiece = $('#piece-' + (blankId + 1))
    rightPiece.click(moveLeft)
              .attr('class', 'hvr-backward')
  }
}//setMovingPieces()

function moveUp() {
  console.log('move up!')
  blankId = parseInt(lowerPiece.attr('id').substring(6))
  var temp = parseInt(lowerPiece.text())

  blankPiece = lowerPiece
  blankPiece.text('')
            .attr('style', 'background-color: Aquamarine;')

  setMovingPieces()
  upperPiece.text(temp)
            .attr('style', 'background-color: white;')

  values[blankId] = 0
  if(upperPiece)
    values[blankId - 4] = temp

  checkArrangement()
}//moveUp()

function moveDown() {
  console.log('move down!')
  blankId = parseInt(upperPiece.attr('id').substring(6))
  var temp = parseInt(upperPiece.text())

  blankPiece = upperPiece
  blankPiece.text('')
            .attr('style', 'background-color: Aquamarine;')

  setMovingPieces()
  lowerPiece.text(temp)
            .attr('style', 'background-color: white;')

  values[blankId] = 0
  if(lowerPiece)
    values[blankId + 4] = temp

  checkArrangement()
}//moveDown()

function moveLeft() {
  console.log('move left!')
  blankId = parseInt(rightPiece.attr('id').substring(6))
  var temp = parseInt(rightPiece.text())

  blankPiece = rightPiece
  blankPiece.text('')
            .attr('style', 'background-color: Aquamarine;')

  setMovingPieces()
  leftPiece.text(temp)
            .attr('style', 'background-color: white;')

  values[blankId] = 0
  if(leftPiece)
    values[blankId - 1] = temp

  checkArrangement()
}//moveLeft()

function moveRight() {
  console.log('move right!')
  blankId = parseInt(leftPiece.attr('id').substring(6))
  var temp = parseInt(leftPiece.text())

  blankPiece = leftPiece
  blankPiece.text('')
            .attr('style', 'background-color: Aquamarine;')

  setMovingPieces()
  rightPiece.text(temp)
            .attr('style', 'background-color: white;')

  values[blankId] = 0
  if(rightPiece)
    values[blankId + 1] = temp

  checkArrangement()
}//moveRight()

function checkArrangement() {
  for(var i = 0; i < values.length - 1; i++) {
    console.log(values[i])
    if(values[i] != (i + 1)) {
      return
    }
  }
  setTimeout(function(){
    $('<canvas id="canvas">').appendTo(body)
    .append(board)
    .append(testBtn)
    .append(shuffleBtn)

    success()
    body.append($('<h1>').html('축하합니다~ 성공했어요~</br> 님 킹왕짱 >_< b'))
        .append($('<button class="button" type="button" id="again-btn">').text('또할래!')
                                                                         .click(function() {location.href = 'index.html'}))
  }, 300)
}//checkArrangement()

testBtn.click(function() {
  values = []

  for (var i = 0; i < 14; i++) {
    values[i] = i + 1
  }
  values[14] = 0
  values[15] = 15
  setBoard()
  setMovingPieces()
  console.log(rightPiece)

})









function success() {
  $(function() {
	var canvas = $('#canvas')[0];
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	var ctx = canvas.getContext('2d');
	// init
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// objects
	var listFire = [];
	var listFirework = [];
	var fireNumber = 10;
	var center = {
		x: canvas.width / 2,
		y: canvas.height / 2
	};
	var range = 100;
	for (var i = 0; i < fireNumber; i++) {
		var fire = {
			x: Math.random() * range / 2 - range / 4 + center.x,
			y: Math.random() * range * 2 + canvas.height,
			size: Math.random() + 0.5,
			fill: '#fd1',
			vx: Math.random() - 0.5,
			vy: -(Math.random() + 4),
			ax: Math.random() * 0.02 - 0.01,
			far: Math.random() * range + (center.y - range)
		};
		fire.base = {
			x: fire.x,
			y: fire.y,
			vx: fire.vx
		};
		//
		listFire.push(fire);
	}

	function randColor() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var color = 'rgb($r, $g, $b)';
		color = color.replace('$r', r);
		color = color.replace('$g', g);
		color = color.replace('$b', b);
		return color;
	}
	(function loop() {
		requestAnimationFrame(loop);
		update();
		draw();
	})();

	function update() {
		for (var i = 0; i < listFire.length; i++) {
			var fire = listFire[i];
			//
			if (fire.y <= fire.far) {
				// case add firework
				var color = randColor();
				for (var i = 0; i < fireNumber * 5; i++) {
					var firework = {
						x: fire.x,
						y: fire.y,
						size: Math.random() + 1.5,
						fill: color,
						vx: Math.random() * 5 - 2.5,
						vy: Math.random() * -5 + 1.5,
						ay: 0.05,
						alpha: 1,
						life: Math.round(Math.random() * range / 2) + range / 2
					};
					firework.base = {
						life: firework.life,
						size: firework.size
					};
					listFirework.push(firework);
				}
				// reset
				fire.y = fire.base.y;
				fire.x = fire.base.x;
				fire.vx = fire.base.vx;
				fire.ax = Math.random() * 0.02 - 0.01;
			}
			//
			fire.x += fire.vx;
			fire.y += fire.vy;
			fire.vx += fire.ax;
		}
		for (var i = listFirework.length - 1; i >= 0; i--) {
			var firework = listFirework[i];
			if (firework) {
				firework.x += firework.vx;
				firework.y += firework.vy;
				firework.vy += firework.ay;
				firework.alpha = firework.life / firework.base.life;
				firework.size = firework.alpha * firework.base.size;
				firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
				//
				firework.life--;
				if (firework.life <= 0) {
					listFirework.splice(i, 1);
				}
			}
		}
	}

	function draw() {
		// clear
		ctx.globalCompositeOperation = 'source-over';
		ctx.globalAlpha = 0.18;
		ctx.fillStyle = '#aaa';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// re-draw
		ctx.globalCompositeOperation = 'screen';
		ctx.globalAlpha = 1;
		for (var i = 0; i < listFire.length; i++) {
			var fire = listFire[i];
			ctx.beginPath();
			ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = fire.fill;
			ctx.fill();
		}
		for (var i = 0; i < listFirework.length; i++) {
			var firework = listFirework[i];
			ctx.globalAlpha = firework.alpha;
			ctx.beginPath();
			ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = firework.fill;
			ctx.fill();
		}
	}
})
}//success()
