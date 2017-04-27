"use strict"
const express = require('express')
const datasource = require('../util/datasource')
const memberDao = require('../dao/member-dao')
const managerDao = require('../dao/manager-dao')
const managerService = require('../service/manager-service')

const connection = datasource.getConnection()
memberDao.setConnection(connection)
managerDao.setConnection(connection)
managerService.setMemberDao(memberDao)
managerService.setManagerDao(managerDao)

const router = express.Router()

router.get('/list.do', (request, response) => {
  var pageNo = 1,
      pageSize = 3;
  if (request.query.pageNo) {
    pageNo = parseInt(request.query.pageNo)
  }
  if (request.query.pageSize) {
    pageSize = parseInt(request.query.pageSize)
  }
  managerService.list(pageNo, pageSize, function(results, totalCount) {
    var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)

    response.render('manager/index', {
      'data': results,
      'pageNo': pageNo,
      'nextPageNo': pageNo + 1,
      'prevPageNo': pageNo - 1,
      'disabledPrevBtn': (pageNo == 1) ? 'disabled' : '',
      'disabledNextBtn': (pageNo == lastPageNo ? 'disabled' : '')
    })
  }, function(error) {
    response.render('error', {
      'message': '매니저 목록 데이터를 가져오는 중 오류가 발생했습니다.'})
    console.log(error)
  })
})

router.get('/detail.do', function(request, response) {
  var no = parseInt(request.query.no)
  managerService.detail(no, function(result) {
    response.render('manager/view', {
      'detail': true,
      'data': result
    })
  }, function(error) {
    response.render('error', {
      'message': '매니저 데이터를 가져오는 중 오류가 발생했습니다.'})
    console.log(error)
  })
})

router.post('/update.do', function(request, response) {
  managerService.update({
    no: request.body.no,
    email: request.body.email,
    name: request.body.name,
    tel: request.body.tel,
    password: request.body.password,
    position: request.body.position,
    fax: request.body.fax,
    imgFilePath: request.body.imgFilePath
  }, function(result) {
    response.redirect('list.do')
  }, function(error) {
    response.render('error', {
      'message': '매니저 데이터를 변경하는 중 오류가 발생했습니다.'})
    console.log(error)
  })
})

router.get('/delete.do', function(request, response) {
  var no = parseInt(request.query.no)
  managerService.delete(no, function(result) {
    response.redirect('list.do')
  }, function(error) {
    response.render('error', {
      'message': '매니저 데이터를 삭제하는 중 오류가 발생했습니다.'})
    console.log(error)
  })
})

router.get('/form.do', function(request, response) {
  response.render('manager/view')
})

router.post('/add.do', function(request, response) {
  managerService.insert({
    no: request.body.no,
    email: request.body.email,
    name: request.body.name,
    tel: request.body.tel,
    password: request.body.password,
    position: request.body.position,
    fax: request.body.fax,
    imgFilePath: request.body.imgFilePath
  }, function(result) {
    response.redirect('list.do')

  }, function(error) {
    response.render('error', {
      'message': '매니저 데이터를 등록하는 중 오류가 발생했습니다.'})
    console.log(error)
  })
})





module.exports = router
