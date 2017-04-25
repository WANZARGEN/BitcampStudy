"use strict"
window.$ = window.jQuery = require('jquery')
var studentService = require('electron').remote.getGlobal('studentService')

var fiNo = $('#fi-no'),
    fiEmail = $('#fi-email'),
    fiName = $('#fi-name'),
    fiTel = $('#fi-tel'),
    fiSchoolName = $('#fi-school-name'),
    fiWorking = $('#fi-working')

/*여기부터 실행*/
if(location.search == '') {
  $('.bit-view').css('display', 'none')
  $('.bit-new').css('display', '')

  $('#add-btn').click(function() {
    studentService.insert({
      name: fiName.val(),
      tel: fiTel.val(),
      email: fiEmail.val(),
      work: (fiWorking.prop('checked') ? 'Y' : 'N'),
      schl_nm: fiSchoolName.val()
    },
    function() {
      alert('추가완료~')
      location.href = 'index.html'
    },
    function(error) {
      alert('회원정보를 추가하는데 실패했습니다.')
      throw error
    })//studentService.insert()
  })//add-btn click()

} else {
  $('.bit-new').css('display', 'none')
  var no = location.search.substring(1).split('=')[1]

  studentService.detail(
    no,
    function(result) {
     if(!result)
       return

     let student = result
     fiNo.text(student.no)
     fiEmail.val(student.email)
     fiName.val(student.name)
     fiTel.val(student.tel)
     fiSchoolName.val(student.schl_nm)
     fiWorking.prop('checked', student.work == 'Y' ? true : false)
    },
   function(error) {
    alert('학생정보 조회 중 오류 발생!')
    throw error
  })//dao.selectOneStudent())

  $('#upd-btn').click(function() {
    studentService.update({
      name: fiName.val(),
      email: fiEmail.val(),
      tel: fiTel.val(),
      schl_nm: fiSchoolName.val(),
      work: (fiWorking.prop('checked') ? 'Y' : 'N'),
      no: no
    },
    function(results) {
      alert('수정 완료!')
      location.href = 'view.html?no=' + no
    },
    function(error) {
      alert('학생정보 변경에 실패했습니다!')
      throw error
    })//studentService()
  })//upd-btn.click()

  $('#del-btn').click(function() {
    studentService.delete(
      no,
      function(results) {
        alert('삭제했습니다.')
        location.href = 'index.html'
      },
      function(error) {
        alert('학생정보 삭제에 실패했습니다!')
        throw error
    })//studentService.delete()
  })//del-btn.click()
}//if(location.search == '') else


$('#lst-btn').click(function() {
  location.href = 'index.html'
})
