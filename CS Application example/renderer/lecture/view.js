"use strict"
window.$ = window.jQuery = require('jquery')
var lectureService = require('electron').remote.getGlobal('lectureService')

var fiNo = $('#fi-no'),
    fiTitl = $('#fi-titl'),
    fiDscp = $('#fi-dscp'),
    fiSdt = $('#fi-sdt'),
    fiEdt = $('#fi-edt'),
    fiQty = $('#fi-qty'),
    fiPric = $('#fi-pric'),
    fiThrs = $('#fi-thrs'),
    fiCrm = $('#fi-crm'),
    fiMgr = $('#fi-mgr')
    //fiCrmSelected = $('#fi-crm-selected'),
    //fiMgrSelected = $('#fi-mgr-selected')

/*여기부터 실행*/
lectureService.listSelectBox(function(cnames, mnames) {
  for (var c of cnames) {
    $("<option>").text(c.name).appendTo(fiCrm).val(c.crmno)
  }

  for (var m of mnames) {
    $("<option>").text(m.name).appendTo(fiMgr).val(m.mrno)
  }

}, function(error) {
  alert('정보를 불러오는데 실패했습니다.')
  throw error
})//lectureService.listSelectBox()

if(location.search == '') {
  $('.bit-view').css('display', 'none')
  $('.bit-new').css('display', '')

  $('#add-btn').click(function() {
    if(!validateForm()){
      alert('필수 항목의 값이 없습니다.')
      return
    }
    lectureService.insert({
      titl: fiTitl.val(),
      dscp: fiDscp.val(),
      sdt: fiSdt.val(),
      edt: fiEdt.val(),
      qty: fiQty.val(),
      pric: fiPric.val(),
      thrs: fiThrs.val(),
      crmno: fiCrm.val() == 0 ? null : fiCrm.val(),
      mrno: fiMgr.val() == 0 ? null : fiMgr.val()
    },
    function() {
      alert('추가완료~')
      location.href = 'index.html'
    },
    function(error) {
      alert('강의정보를 추가하는데 실패했습니다.')
      throw error
    })//lectureService.insert()
  })//add-btn click()

} else {
  $('.bit-new').css('display', 'none')
  var no = location.search.substring(1).split('=')[1]

  lectureService.detail(
    no,
    function(lecture) {
     console.log(lecture.sdt)
     fiNo.text(no)
     fiTitl.val(lecture.titl)
     fiDscp.val(lecture.dscp)
     fiSdt.val(lecture.sdt)
     fiEdt.val(lecture.edt)
     fiQty.val(lecture.qty)
     fiPric.val(lecture.pric)
     fiThrs.val(lecture.thrs)
     fiCrm.val(lecture.crmno ? lecture.crmno : '0')
     fiMgr.val(lecture.mrno ? lecture.mrno : '0')
    },
   function(error) {
    alert('강의정보 조회 중 오류 발생!')
    throw error
  })//lectureService.detail()

  $('#upd-btn').click(function() {
    if(!validateForm()){
      alert('필수 항목의 값이 없습니다.')
      return
    }
    lectureService.update({
      no: no,
      titl: fiTitl.val(),
      dscp: fiDscp.val(),
      sdt: fiSdt.val(),
      edt: fiEdt.val(),
      qty: fiQty.val(),
      pric: fiPric.val(),
      thrs: fiThrs.val(),
      crmno: fiCrm.val() == 0 ? null : fiCrm.val(),
      mrno: fiMgr.val() == 0 ? null : fiMgr.val()
    },
    function(results) {
      alert('수정 완료!')
      location.href = 'view.html?no=' + no
    },
    function(error) {
      alert('강의정보 변경에 실패했습니다!')
      throw error
    })//lectureService.update()
  })//upd-btn.click()

  $('#del-btn').click(function() {
    lectureService.delete(
      no,
      function(results) {
        alert('삭제했습니다.')
        location.href = 'index.html'
      },
      function(error) {
        alert('강의정보 삭제에 실패했습니다!')
        throw error
    })//lectureService.delete()
  })//del-btn.click()

}//if(location.search == '') else


$('#lst-btn').click(function() {
  location.href = 'index.html'
})

function validateForm() {
  if(fiTitl.val() == '' ||
     fiDscp.val() == '' ||
     fiSdt.val() == '' ||
     fiEdt.val() == '' ||
     fiQty.val() == '' ||
     fiThrs.val() == '') {
       return false
  } else {
    return true
  }
}
