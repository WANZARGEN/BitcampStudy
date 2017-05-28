"use strict"
window.$ = window.jQuery = require('jquery')
const net = require('net')
var host = $('#host'),
    port = $('#port'),
    messengerBox = $('#messenger-box'),
    message = $('#message'),
    user = $('#user')

var socket = new net.Socket()
//socket.setTimeout(500)

socket.on('connect', () => {
})//socket.on(connect)

var buffer = ''

socket.on('data', (data) => {
  buffer += data.toString()
  while(true) {
    var newLineIndex = buffer.indexOf('\n')
    if(newLineIndex < 0) return;

    var value = buffer.substring(0, newLineIndex)
    buffer = buffer.substring(newLineIndex + 1)
    if(value.length > 0) break;
  }
  //console.log('=>' + value)
  //var obj = JSON.parse(value)
  //console.log(obj);
  messengerBox.val(messengerBox.val() + value + "\n")

})//socket.on(data)

socket.on('close', () => {
  alert('끊었습니다.')
})//socket.on(close)

socket.on('timeout', () => {
  alert('서버가 응답하지 않습니다.')
  socket.destroy()
  socket.end()
})//socket.on(timeout)

$('#connect').click(() => {
  socket.connect(parseInt(port.val()), host.val(), () => {
    console.log('=> 서버와 연결됨');
    var obj = {
      'user' : user.val(),
      'message' : message.val()
    }
    socket.write(JSON.stringify(obj) + '\r\n')


    socket.on('error', (err) => {
      alert(err.message)
    })//soccket.on(error)
  })//socket.connect()
})//connect.click()

$('#send').click(() => {
  var obj = {
    'user' : user.val(),
    'message' : message.val()
  }
  socket.write(JSON.stringify(obj) + '\r\n')


  socket.on('error', (err) => {
    alert(err.message)
  })//soccket.on(error)
})//connect.click()
