// 학생 정보를 다루는 서비스를 정의한다.
const express = require('express')
const datasource = require('../util/datasource')
const managerDao = require('../dao/manager-dao')
const memberDao = require('../dao/member-dao')
const managerService = require('../service/manager-service')

const connection = datasource.getConnection()
managerDao.setConnection(connection)
memberDao.setConnection(connection)
managerService.setManagerDao(managerDao)
managerService.setMemberDao(memberDao)

const router = express.Router()

router.get('/list.json', (request, response) => {
  var pageNo = 1,
      pageSize = 3;
  if (request.query.pageNo) {
    pageNo = parseInt(request.query.pageNo)
  }
  if (request.query.pageSize) {
    pageSize = parseInt(request.query.pageSize)
  }
  managerService.list(pageNo, pageSize, function(results, totalCount) {
    response.json({'list': results, 'totalCount': totalCount})
  }, function(error) {
    response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })
})

router.get('/detail.json', function(request, response) {
  var no = parseInt(request.query.no)
  managerService.detail(no, function(result) {
    console.log(result)
    response.json(result)
  }, function(error) {
    response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })
})

router.post('/update.json', function(request, response) {
  managerService.update({
    no: request.body.no,
    email: request.body.email,
    name: request.body.name,
    tel: request.body.tel,
    password: '1111',
    position: request.body.position,
    fax: request.body.fax,
    imgFilePath: request.body.imgFilePath
  }, function(result) {
    response.json({'result': 'yes'})
  }, function(error) {
    response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })
})

router.get('/delete.json', function(request, response) {
  var no = parseInt(request.query.no)
  managerService.delete(no, function(result) {
    response.json({'result': 'yes'})
  }, function(error) {
    response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })
})

router.post('/add.json', function(request, response) {
  managerService.insert({
    email: request.body.email,
    name: request.body.name,
    tel: request.body.tel,
    password: request.body.password,
    position: request.body.position,
    fax: request.body.fax,
    imgFilePath: request.body.imgFilePath
  }, function(result) {
    response.json({'result': 'yes'})
  }, function(error) {
    response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })
})





module.exports = router
