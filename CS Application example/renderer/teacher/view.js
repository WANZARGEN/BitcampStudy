"use strict"
window.$ = window.jQuery = require('jquery')
var teacherService = require('electron').remote.getGlobal('teacherService')

var fiNo = $('#fi-no'),
    fiEmail = $('#fi-email'),
    fiName = $('#fi-name'),
    fiTel = $('#fi-tel'),
    fiPwd = $('#fi-pwd'),
    fiHmpg = $('#fi-hmpg'),
    fiFcbk = $('#fi-fcbk'),
    fiTwit = $('#fi-twit')

/*여기부터 실행*/
if(location.search == '') {
  $('.bit-view').css('display', 'none')
  $('.bit-new').css('display', '')

  $('#add-btn').click(function() {
    teacherService.insert({
      name: fiName.val(),
      tel: fiTel.val(),
      email: fiEmail.val(),
      pwd: '1111',
      hmpg: fiHmpg.val(),
      fcbk: fiFcbk.val(),
      twit: fiTwit.val()
    },
    function() {
      alert('추가완료~')
      location.href = 'index.html'
    },
    function(error) {
      alert('강사정보를 추가하는데 실패했습니다.')
      throw error
    })//teacherService.insert()
  })//add-btn click()

} else {
  $('.bit-new').css('display', 'none')
  var no = location.search.substring(1).split('=')[1]

  teacherService.detail(
    no,
    function(result) {
     let teacher = result
     fiNo.text(teacher.tno)
     fiEmail.val(teacher.email)
     fiName.val(teacher.name)
     fiTel.val(teacher.tel)
     fiHmpg.val(teacher.hmpg)
     fiFcbk.val(teacher.fcbk)
     fiTwit.val(teacher.twit)
    },
   function(error) {
    alert('강사정보 조회 중 오류 발생!')
    throw error
  })//dao.selectOneteacher())

  $('#upd-btn').click(function() {
    teacherService.update({
      no: no,
      name: fiName.val(),
      tel: fiTel.val(),
      email: fiEmail.val(),
      pwd: '1111',
      hmpg: fiHmpg.val(),
      fcbk: fiFcbk.val(),
      twit: fiTwit.val()
    },
    function(results) {
      alert('수정 완료!')
      location.href = 'view.html?no=' + no
    },
    function(error) {
      alert('강사정보 변경에 실패했습니다!')
      throw error
    })//teacherService()
  })//upd-btn.click()

  $('#del-btn').click(function() {
    teacherService.delete(
      no,
      function(results) {
        alert('삭제했습니다.')
        location.href = 'index.html'
      },
      function(error) {
        alert('강사정보 삭제에 실패했습니다!')
        throw error
    })//teacherService.delete()
  })//del-btn.click()

}//if(location.search == '') else


$('#lst-btn').click(function() {
  location.href = 'index.html'
})
