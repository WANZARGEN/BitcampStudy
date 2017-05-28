"use strict"
window.$ = window.jQuery = require('jquery')
var board = $('#puzzle-board')
var shuffleBtn = $('#shuffle-btn')
var body = $('body')
var testBtn = $('#test-btn')

//-------------------------------------------
var blankPiece
var leftPiece
var rightPiece
var upperPiece
var lowerPiece
var values//array

//--------------------------------------------
var blankPosition//blank button position
var puzzles//array

var size = 4
const buttonSize = 115
const buttonMargin = 5

//shuffle()
setBoard()

shuffleBtn.click(function() {
  shuffle()
})

$(document.body).on('click', '.move', function() {
  var no = $(this).index()
  move(no)
})

function setBoard() {
  board.html('')
       .css('width', (buttonSize + buttonMargin * 2) * size + 'px')
       .css('height', (buttonSize + buttonMargin * 2) * size + 'px')
  if(!puzzles) {
    puzzles = []
    for(var i = 1; i < size ** 2; i++) {
      puzzles[i] = $('<button>').attr('id', 'piece-' + i).text(i)
      .addClass('hvr-buzz-out')
      .appendTo(board)
    }
    puzzles[0] = $('<button>').attr('id', 'piece-0').text('')
    .addClass('hvr-buzz-out')
    .attr('style', 'background-color: Aquamarine;')
    .appendTo(board)

    shuffle()
    //console.log($('div>button:nth-child(4)'));//n번째 자식노드 찾기!
  } else {
    for (var i = 0; i < puzzles.length; i++) {
      puzzles[i].appendTo(board)
                .css('left', getLeftPosition(i) + 'px')
                .css('top', getTopPosition(i) + 'px')
      if(puzzles[i].attr('id') == 'piece-0')
        blankPosition = i
    }
  }

  //console.log(puzzles[1].next())
}//setBoard()

function shuffle() {
  var nums = []
  var newPuzzles = []
  for (var i = 0; i < size ** 2; i++)
    nums.push(i)

  for (var i = 0; i < size ** 2; i++) {
    var randomNo = Math.floor(Math.random() * nums.length)// 0 ~ 15 (0 <= x < 16)
    var value = nums.splice(randomNo, 1)//똑같은 숫자가 나와도, splice를 해서 한번 쓴 값을 줄여나가면 중복되는 값이 들어가지 않음.
    newPuzzles[i] = puzzles[value]
  }
  puzzles = newPuzzles
  setBoard()
  setMovingPieces()
  // checkSolvability()
}//shuffle()

function getTopPosition(i) {
  return (parseInt((i / size)) * buttonSize + parseInt((i / size)) * buttonMargin * 2 + buttonMargin)
}

function getLeftPosition(i) {
  return ((i % size) * buttonSize + (i % size) * buttonMargin * 2 + buttonMargin)
}

function move(no) {
  console.log(no);
  puzzles[no].animate({
    'top' : getTopPosition(no) - (buttonSize + buttonMargin * 2) + "px"
  })
  puzzles[blankPosition].animate({
  'top' : getTopPosition(blankPosition) + (buttonSize + buttonMargin * 2) + "px"
}, function() {
  var temp = blankPosition
  blankPosition = no
  no = temp
  puzzles[no].stop()
  puzzles[blankPosition].removeClass('move').stop()

  
  console.log(blankPosition, no);
});
  //blankPosition = no


}



function setMovingPieces() {

  // if(blankPosition >= size)//upper
  //   puzzles[blankPosition - size].addClass('move')
  // if(blankPosition % size < (size - 1))//right
  //   puzzles[blankPosition + 1].addClass('move')
  if(blankPosition < (size ** 2 - size))//lower
    puzzles[blankPosition + size].addClass('move')
  // if(blankPosition % size > 0)//left
  //   puzzles[blankPosition - 1].addClass('move')

}//setMovingPieces()

function clearMovingPieces() {

  if(blankPosition >= size)//upper
    puzzles[blankPosition - size].removeClass('move')
  if(blankPosition % size < (size - 1))//right
    puzzles[blankPosition + 1].removeClass('move')
  if(blankPosition < (size ** 2 - size))//lower
    puzzles[blankPosition + size].removeClass('move')
  if(blankPosition % size > 0)//left
    puzzles[blankPosition - 1].removeClass('move')

}



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
        allowOutsideClick: false
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

// function setMovingPieces() {
//   if(lowerPiece)
//     lowerPiece.unbind('click')
//               .attr('class', 'hvr-buzz-out')
//   if(upperPiece)
//     upperPiece.unbind('click')
//               .attr('class', 'hvr-buzz-out')
//   if(leftPiece)
//     leftPiece.unbind('click')
//               .attr('class', 'hvr-buzz-out')
//   if(rightPiece)
//     rightPiece.unbind('click')
//               .attr('class', 'hvr-buzz-out')
//
//   blankPiece.attr('class', '')
//
//   lowerPiece = undefined
//   upperPiece = undefined
//   leftPiece = undefined
//   rightPiece = undefined
//   if(blankPosition < (size ** 2 - size)) {
//     lowerPiece = $('#piece-' + (blankPosition + size))
//     lowerPiece.click(moveUp)
//               .attr('class', 'hvr-float')
//   }
//   if(blankPosition > (size - 1)) {
//     upperPiece = $('#piece-' + (blankPosition - size))
//     upperPiece.click(moveDown)
//               .attr('class', 'hvr-sink')
//   }
//   if(blankPosition % size != 0) {
//     leftPiece = $('#piece-' + (blankPosition - 1))
//     leftPiece.click(moveRight)
//              .attr('class', 'hvr-forward')
//   }
//   if(blankPosition % size != (size - 1)) {
//     rightPiece = $('#piece-' + (blankPosition + 1))
//     rightPiece.click(moveLeft)
//               .attr('class', 'hvr-backward')
//   }
// }//setMovingPieces()

function moveUp() {
  console.log('move up!')
  blankPosition = parseInt(lowerPiece.attr('id').substring(6))
  var temp = parseInt(lowerPiece.text())

  blankPiece = lowerPiece
  blankPiece.text('')
            .attr('style', 'background-color: Aquamarine;')

  setMovingPieces()
  upperPiece.text(temp)
            .attr('style', 'background-color: white;')

  values[blankPosition] = 0
  if(upperPiece)
    values[blankPosition - size] = temp

  checkArrangement()
}//moveUp()

function moveDown() {
  console.log('move down!')
  blankPosition = parseInt(upperPiece.attr('id').substring(6))
  var temp = parseInt(upperPiece.text())

  blankPiece = upperPiece
  blankPiece.text('')
            .attr('style', 'background-color: Aquamarine;')

  setMovingPieces()
  lowerPiece.text(temp)
            .attr('style', 'background-color: white;')

  values[blankPosition] = 0
  if(lowerPiece)
    values[blankPosition + size] = temp

  checkArrangement()
}//moveDown()

function moveLeft() {
  console.log('move left!')
  blankPosition = parseInt(rightPiece.attr('id').substring(6))
  var temp = parseInt(rightPiece.text())

  blankPiece = rightPiece
  blankPiece.text('')
            .attr('style', 'background-color: Aquamarine;')

  setMovingPieces()
  leftPiece.text(temp)
            .attr('style', 'background-color: white;')

  values[blankPosition] = 0
  if(leftPiece)
    values[blankPosition - 1] = temp

  checkArrangement()
}//moveLeft()

function moveRight() {
  console.log('move right!')
  blankPosition = parseInt(leftPiece.attr('id').substring(6))
  var temp = parseInt(leftPiece.text())

  blankPiece = leftPiece
  blankPiece.text('')
            .attr('style', 'background-color: Aquamarine;')

  setMovingPieces()
  rightPiece.text(temp)
            .attr('style', 'background-color: white;')

  values[blankPosition] = 0
  if(rightPiece)
    values[blankPosition + 1] = temp

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
    swal({
    title: "성공!",
    text: "짝짝짝~ 님 킹왕짱 >_< b",
    imageUrl: "../node_modules/sweetalert/example/images/thumbs-up.jpg",
    confirmButtonColor: "#2AA",
    confirmButtonText: "또할래요",
    allowOutsideClick: false
  },
  function(isConfirm) {
    if(isConfirm) {
      swal.close();
      location.href = 'index.html'
    }
  })
    body.append($('<h1>').html())

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
