"use strict"

var quiz = $('.quiz')
var enter = $('#enter')
var input = $('#input-area')
var quizList
var pointer
var countSuccess = 0
var countAll = 0
var time = 5
var timeTag = $('.timer')
var timer

$.getJSON('a.json', function(data) {
  quizList = data.words

start()
})

//giveWords();


function giveWords() {
  console.log(quizList)
  if(quizList.length == 0) {
    quiz.text("이열~~~~~ 당신은 진정한 키보드워리어!")
    stopTimeCount()
  }

  if(time > 0) {
    pointer = Math.floor(Math.random() * quizList.length)
    var word = quizList[pointer]
    quiz.text('"' + word + '"')
  }
}

enter.click(submit);

function submit() {
  console.log("input: %s, word: %s", input.val(), quizList[pointer])
  if(input.val() == quizList[pointer]) {
    quizList.splice(pointer, 1)
    countSuccess++
  }
  countAll++
  input.val('')
  giveWords()
}



input.keydown(function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        submit()
    }

});

function displayResult() {
  quiz.html("전체 단어 수: " + countAll + "<br>\
              성공한 단어: " + countSuccess + "<br>\
              실패한 단어: " + (countAll - countSuccess))
  input.css('display', 'none')
  enter.css('display', 'none')
  var restartBtn = $('<Button>').text('Try Again!')
                                .attr('id', 'enter')
                                .addClass('button')
                                .click(restart)
  restartBtn.appendTo($('.input'))
}

function start() {
  quiz.html("신조어 타자연습 GOGO!")
  input.css('display', 'none')
  enter.css('display', 'none')
  var restartBtn = $('<Button>').text('Try Again!')
                                .attr('id', 'enter')
                                .addClass('button')
                                .click(restart)
  restartBtn.text('START!').appendTo($('.input'))
}

function restart() {
  quiz.html('')
  $(this).css('display', 'none')
  input.css('display', '')
  enter.css('display', '')
  countAll = 0;
  countSuccess = 0;
  time = 30;
  giveWords()
  timer = setInterval(function() {
    timeTag.html((time--) + "초")
    if(time < 0) {
      stopTimeCount()
      displayResult()
    }
  }, 1000);
}

function stopTimeCount() {
  clearInterval(timer)
}
