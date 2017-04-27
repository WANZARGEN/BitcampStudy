"use strict"
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var cons = require('consolidate');

var app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))


app.engine('hbs', cons.handlebars)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use('/student', require('./control/student-control'))
app.use('/manager', require('./control/manager-control'))
app.use('/teacher', require('./control/teacher-control'))
app.use('/lecture', require('./control/lecture-control'))

app.get('/', function(request, response) {
  response.render('index')
})

app.listen(8888, function() {
  console.log('서버가 시작되었습니다.')
})
