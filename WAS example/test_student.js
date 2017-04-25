"use strict"
const connection = require('./datasource.js').getConnection()

const studentDao = require('./student-dao.js')
const memberDao = require('./member-dao.js')
studentDao.setConnection(connection)
memberDao.setConnection(connection)

const studentService = require('./student-service.js')
studentService.setStudentDao(studentDao)
studentService.setMemberDao(memberDao)

const http = require('http')
const url = require('url')

const server = http.createServer(function(request, response) {
  if(request.url == '/favicon.ico') {
    response.end()
    return
  }

  var urlInfo = url.parse(request.url, true)
  console.log(request.url, urlInfo.query, urlInfo.pathname)

  if(urlInfo.pathname != '/student/list.do' &&
     urlInfo.pathname != '/student/add.do') {
     response.writeHead(404, {
       'Content-Type' : 'text/plain;charset=UTF-8'
     })
     response.write('잘못된 URL입니다.')
     response.end()
     return
   }//URL이 잘못된 경우

  response.writeHead(200, {
    'Content-Type' : 'text/html;charset=UTF-8'
  })

  if(urlInfo.pathname == '/student/list.do') {
    var pageNo = parseInt(urlInfo.query.pageNo)
    var pageSize = parseInt(urlInfo.query.pageSize)

    studentService.list(pageNo, pageSize, function(students, count) {

      console.log('성공했다.', pageNo, pageSize, students, count)
      var tbody = ''
      var startOfHtml = '<html><head><meta charset="UTF-8"> \
                        <title>gogo</title> \
                        <body> \
                        <div class="container"> \
                        <h1>학생 목록</h1> \
                        <table border="1px"> \
                        <thead> \
                          <tr> \
                            <th>번호</th> \
                            <th>이름</th> \
                            <th>전화</th> \
                            <th>이메일</th> \
                            <th>재직여부</th> \
                          </tr> \
                          </thead> \
                          <tbody>'

    for(var s of students) {
      tbody += "<tr><td>" + s.mno +
      "</td><td><a href='#' data-no='" + s.mno + "' class='view-link'>" + s.name +
      "</a></td><td>" + s.tel +
      "</td><td>" + s.email +
      "</td><td>" + (s.work == "Y" ? "재직중" : "실업") + "</td></td>"
    }

    response.write(startOfHtml + tbody + '</tbody></table></div></body></html>')
    response.end()
    },
    function(error) {
      console.log('에러났다.')
      throw error
    })//list()
  } //if (urlInfo.pathname == '/student/list.do')
  else if (urlInfo.pathname == '/student/add.do'){
    var student = {
      name : urlInfo.query.name,
      tel : urlInfo.query.tel,
      email : urlInfo.query.email,
      password : urlInfo.query.password,
      work: 'Y',
      schl_nm: '아무대학교'
    }

    studentService.insert(student,
    function(result) {
      console.log('인서트 성공', student)
      response.write('<html><head></head><body>' +
                      '이름: ' + student.name + '<br>' +
                      '전화번호: ' + student.tel + '<br>' +
                      '이메일: ' + student.email + '<br>' +
                      '재직여부: ' + student.work + '<br>' +
                      '학교: ' + student.schl_nm + '</body></html>')
      response.end()
    },
    function(error) {
      console.log('에러났다.')
      throw error
    })//insert()
  }//else if (urlInfo.pathname == '/student/add.do')
})//http.createServer()

server.listen(8889)

console.log('서버 실행 중...')
