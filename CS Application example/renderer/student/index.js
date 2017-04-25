"use strict"
window.$ = window.jQuery = require('jquery')
/*
var electron = require('electron')
var remote = electron.remote
var studentService = remote.getGlobal('studentService')
*/
var studentService = require('electron').remote.getGlobal('studentService')
var tbody = $('#student-tbl > tbody')


/*여기부터 이벤트 정의*/
$('#add-btn').click(function() { location.href = 'view.html' })

$('#prev-btn').click(function() {
  var currPageNo = parseInt($('#page-no').text())
  displayList(currPageNo - 1)
})

$('#next-btn').click(function() {
  var currPageNo = parseInt($('#page-no').text())
  displayList(currPageNo + 1)
})


/*여기부터 실행*/
displayList(1)


/*여기부터 함수 정의*/
function displayList(pageNo) {
  studentService.list(
    pageNo,
    function(results, totalCount) {
      console.log(results)
      console.log(totalCount)

      tbody.html('')
      for (var i = 0; i < 3; i++) {
        if(i < results.length) {
          let s = results[i]
          $("<tr>").html("<td>" + s.mno +
          "</td><td><a href='#' data-no='" + s.mno + "' class='view-link'>" + s.name +
          "</a></td><td>" + s.tel +
          "</td><td>" + s.email +
          "</td><td>" + (s.work == "Y" ? "재직중" : "실업") + "</td>").appendTo(tbody) //있으면 화면에 만들어
        } else {
          $("<tr><td colspan='5'>&nbsp;</td>").appendTo(tbody) //없으면 빈행 만들어
        }
      }
      $('table .view-link').click(onClickViewLink)
      preparePagingBar(pageNo, totalCount)
  }, function(error) {
    alert('데이터 조회 중 오류 발생!')
    throw error
  })//dao.selectListStudent()
}//displayList()


function preparePagingBar(pageNo, totalCount) {
  $('#page-no').text(pageNo)

  if(pageNo == 1) {
    $('#prev-btn').attr('disabled', true)
  } else {
    $('#prev-btn').attr('disabled', false)

    var totalPage = parseInt(totalCount / 3) + (totalCount % 3 == 0 ? 0 : 1);//우리가 가질 수 있는 페이지 수
    if(pageNo  == totalPage) {
      $('#next-btn').attr('disabled', true)
    } else {
      $('#next-btn').attr('disabled', false)
    }
  }
}//preparePagingBar()

function onClickViewLink() {
  console.log(location)
  location.href = 'view.html?no=' + $(this).attr('data-no')
}

$('#home-btn').click(function() {
  location.href = '../index.html'
})
