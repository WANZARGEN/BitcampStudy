var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var cons = require('consolidate');

var app = express()

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))


app.use('/typing', require('./control/typing-control'))


app.listen(8888, function() {
  console.log('서버가 시작되었습니다.')
})
