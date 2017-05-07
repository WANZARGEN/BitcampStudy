var viewTags = $('.bit-view'),
    newTags = $('.bit-new'),
    fiNo = $('#fi-no'),
    fiEmail = $('#fi-email'),
    fiName = $('#fi-name'),
    fiTel = $('#fi-tel'),
    fiPassword = $('#fi-password'),
    fiHomepage = $('#fi-hmpg'),
    fiFacebook = $('#fi-fcbk'),
    fiTwitter = $('#fi-twit')

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
      'homepage': fiHomepage.val(),
      'facebook': fiFacebook.val(),
      'twitter': fiTwitter.val()
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
    fiHomepage.val(result.hmpg)
    fiFacebook.val(result.fcbk)
    fiTwitter.val(result.twit)
  })

  $('#upd-btn').click(function() {
    $.post('update.json', {
      'no': fiNo.text(),
      'email': fiEmail.val(),
      'name': fiName.val(),
      'tel': fiTel.val(),
      'password': fiPassword.val(),
      'homepage': fiHomepage.val(),
      'facebook': fiFacebook.val(),
      'twitter': fiTwitter.val()
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
