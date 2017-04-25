"use strict"
window.$ = window.jQuery = require('jquery')
/*
var electron = require('electron')
var remote = electron.remote
var teacherService = remote.getGlobal('teacherService')
*/
var teacherService = require('electron').remote.getGlobal('teacherService')
var tbody = $('#teacher-tbl > tbody')


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
  teacherService.list(
    pageNo,
    function(results, totalCount) {
      console.log(results)
      console.log(totalCount)

      tbody.html('')
      for (var i = 0; i < 3; i++) {
        if(i < results.length) {
          let t = results[i]
          $("<tr>").html("<td>" + t.mno +
          "</td><td><a href='#' data-no='" + t.mno + "' class='view-link'>" + t.name +
          "</a></td><td>" + t.tel +
          "</td><td>" + t.email +
          "</td><td>" + (t.hmpg == null ? '' : t.hmpg)).appendTo(tbody) //있으면 화면에 만들어
        } else {
          $("<tr><td colspan='5'>&nbsp;</td>").appendTo(tbody) //없으면 빈행 만들어
        }
      }
      $('table .view-link').click(onClickViewLink)
      preparePagingBar(pageNo, totalCount)
  }, function(error) {
    alert('데이터 조회 중 오류 발생!')
    throw error
  })//dao.selectListteacher()
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
