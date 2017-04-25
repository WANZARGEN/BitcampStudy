"use strict"
window.$ = window.jQuery = require('jquery')
var managerService = require('electron').remote.getGlobal('managerService')

var fiNo = $('#fi-no'),
    fiEmail = $('#fi-email'),
    fiName = $('#fi-name'),
    fiTel = $('#fi-tel'),
    fiPwd = $('#fi-pwd'),
    fiPosi = $('#fi-posi'),
    fiFax = $('#fi-fax'),
    fiPath = $('#fi-path')

/*여기부터 실행*/
if(location.search == '') {
  $('.bit-view').css('display', 'none')
  $('.bit-new').css('display', '')

  $('#add-btn').click(function() {
    managerService.insert({
      name: fiName.val(),
      tel: fiTel.val(),
      email: fiEmail.val(),
      pwd: '1111',
      posi: fiPosi.val(),
      fax: fiFax.val(),
      path: fiPath.val()
    },
    function() {
      alert('추가완료~')
      location.href = 'index.html'
    },
    function(error) {
      alert('매니저정보를 추가하는데 실패했습니다.')
      throw error
    })//managerService.insert()
  })//add-btn click()

} else {
  $('.bit-new').css('display', 'none')
  var no = location.search.substring(1).split('=')[1]

  managerService.detail(
    no,
    function(result) {
     let manager = result
     fiNo.text(no)
     fiEmail.val(manager.email)
     fiName.val(manager.name)
     fiTel.val(manager.tel)
     fiPosi.val(manager.posi)
     fiFax.val(manager.fax)
     fiPath.val(manager.path)
    },
   function(error) {
    alert('강사정보 조회 중 오류 발생!')
    throw error
  })//dao.selectOnemanager())

  $('#upd-btn').click(function() {
    managerService.update({
      no: no,
      name: fiName.val(),
      tel: fiTel.val(),
      email: fiEmail.val(),
      pwd: '1111',
      posi: fiPosi.val(),
      fax: fiFax.val(),
      path: fiPath.val()
    },
    function(results) {
      alert('수정 완료!')
      location.href = 'view.html?no=' + no
    },
    function(error) {
      alert('매니저정보 변경에 실패했습니다!')
      throw error
    })//managerService()
  })//upd-btn.click()

  $('#del-btn').click(function() {
    managerService.delete(
      no,
      function(results) {
        alert('삭제했습니다.')
        location.href = 'index.html'
      },
      function(error) {
        alert('매니저정보 삭제에 실패했습니다!')
        throw error
    })//managerService.delete()
  })//del-btn.click()
}//if(location.search == '') else


$('#lst-btn').click(function() {
  location.href = 'index.html'
})
