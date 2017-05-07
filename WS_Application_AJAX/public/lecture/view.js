var viewTags = $('.bit-view'),
    newTags = $('.bit-new'),
    fiNo = $('#fi-no'),
    fiTitle = $('#fi-title'),
    fiContent = $('#fi-content'),
    fiStartDate = $('#fi-start-date'),
    fiEndDate = $('#fi-end-date'),
    fiQuantity = $('#fi-quantity'),
    fiHours = $('#fi-hours'),
    fiPrice = $('#fi-price'),
    fiClassroom = $('#fi-classroom'),
    fiManager = $('#fi-manager')

var no = 0
try {
  no = location.href.split('?')[1].split('=')[1]
} catch (err) {}

if (no == 0) { // 새 학생 등록
  viewTags.css('display', 'none')

  $('#add-btn').click(function() {
    $.post('add.json', {
      'title': fiTitle.val(),
      'description': fiContent.val(),
      'startDate': fiStartDate.val(),
      'endDate': fiEndDate.val(),
      'quantity': fiQuantity.val(),
      'totalTime': fiHours.val(),
      'price': fiPrice.val(),
      'classroomNo': fiClassroom.val() == 0 ? null : fiClassroom.val(),
      'managerNo': fiManager.val() == 0 ? null : fiManager.val()
    }, function(result) {
      location.href = 'index.html'
    }, 'json')
  })
} else { // 학생 정보 조회
  newTags.css('display', 'none')

  $.getJSON('detail.json', {'no': no}, function(result) {
    console.log(result)
    var lecture = result.list
    fiNo.text(lecture.lno)
    fiTitle.val(lecture.titl)
    fiContent.val(lecture.dscp)
    fiStartDate.val(lecture.sdt)
    fiEndDate.val(lecture.edt)
    fiQuantity.val(lecture.qty)
    fiHours.val(lecture.thrs)
    fiPrice.val(lecture.pric)

    var classroomTemplate = Handlebars.compile($('#classroom-template').text())
    var managerTemplate = Handlebars.compile($('#manager-template').text())
    fiClassroom.html(classroomTemplate(result))
    fiManager.html(managerTemplate(result))

    $('#fi-classroom option[value=' + lecture.crmno + ']').prop('selected', true)
    $('#fi-manager option[value='+ lecture.mrno + ']').prop('selected', true)

  })

  $('#upd-btn').click(function() {
    $.post('update.json', {
      'no': fiNo.text(),
      'title': fiTitle.val(),
      'description': fiContent.val(),
      'startDate': fiStartDate.val(),
      'endDate': fiEndDate.val(),
      'quantity': fiQuantity.val(),
      'totalTime': fiHours.val(),
      'price': fiPrice.val(),
      'classroomNo': fiClassroom.val() == 0 ? null : fiClassroom.val(),
      'managerNo': fiManager.val() == 0 ? null : fiManager.val()
    }, function(result) {
      location.href = 'index.html'
    }, 'json')
  })

  $('#del-btn').click(function() {
    $.getJSON('delete.json', {'no': no}, function(result) {
      location.href = 'index.html'
    })
  })
}

//



//
