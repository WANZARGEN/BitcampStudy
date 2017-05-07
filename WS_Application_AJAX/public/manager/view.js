var viewTags = $('.bit-view'),
    newTags = $('.bit-new'),
    fiNo = $('#fi-no'),
    fiEmail = $('#fi-email'),
    fiName = $('#fi-name'),
    fiTel = $('#fi-tel'),
    fiPassword = $('#fi-password'),
    fiPosition = $('#fi-position'),
    fiFax = $('#fi-fax'),
    fiImgFilePath = $('#fi-img-file-path')

var no = 0
try {
  no = location.href.split('?')[1].split('=')[1]
} catch (err) {}

if (no == 0) { // 새 학생 등록
  viewTags.css('display', 'none')

  $('#add-btn').click(function() {
    $.post('add.json', {
      'email': fiEmail.val(),
      'name': fiName.val(),
      'tel': fiTel.val(),
      'password': fiPassword.val(),
      'position': fiPosition.val(),
      'fax': fiFax.val(),
      'imgFilePath': fiImgFilePath.val()
    }, function(result) {
      location.href = 'index.html'
    }, 'json')
  })
} else { // 학생 정보 조회
  newTags.css('display', 'none')

  $.getJSON('detail.json', {'no': no}, function(result) {
    console.log(result)
    fiNo.text(result.mno)
    fiEmail.val(result.email)
    fiName.val(result.name)
    fiTel.val(result.tel)
    fiPosition.val(result.posi)
    fiFax.val(result.fax)
    fiImgFilePath.val(result.path)
  })

  $('#upd-btn').click(function() {
    $.post('update.json', {
      'no': fiNo.text(),
      'email': fiEmail.val(),
      'name': fiName.val(),
      'tel': fiTel.val(),
      'position': fiPosition.val(),
      'fax': fiFax.val(),
      'imgFilePath': fiImgFilePath.val()
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
