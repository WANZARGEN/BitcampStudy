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

var size = 4

shuffle()

shuffleBtn.click(function() {
  shuffle()
})

function shuffle() {
  values = []
  var randomNo
  var checkArr
  var randomIndex = 0
  while(randomIndex <= (size ** 2 - 1)) {
    randomNo = Math.floor(Math.random() * (size ** 2))
    checkArr = true
    for (var i = 0; i < values.length; i++) {
      if(values[i] == randomNo) {
        i = values.length
        checkArr = false
      }
    }
    if(checkArr && randomNo != (size ** 2)) {
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
  if(blankId < (size ** 2 - size)) {
    lowerPiece = $('#piece-' + (blankId + size))
    lowerPiece.click(moveUp)
              .attr('class', 'hvr-float')
  }
  if(blankId > (size - 1)) {
    upperPiece = $('#piece-' + (blankId - size))
    upperPiece.click(moveDown)
              .attr('class', 'hvr-sink')
  }
  if(blankId % size != 0) {
    leftPiece = $('#piece-' + (blankId - 1))
    leftPiece.click(moveRight)
             .attr('class', 'hvr-forward')
  }
  if(blankId % size != (size - 1)) {
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
    values[blankId - size] = temp

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
    values[blankId + size] = temp

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
