"use strict"
const express = require('express')
const datasource = require('../util/datasource')
const classroomDao = require('../dao/classroom-dao')
const lectureDao = require('../dao/lecture-dao')
const managerDao = require('../dao/manager-dao')
const lectureService = require('../service/lecture-service')

const connection = datasource.getConnection()
classroomDao.setConnection(connection)
lectureDao.setConnection(connection)
managerDao.setConnection(connection)
lectureService.setClassroomDao(classroomDao)
lectureService.setLectureDao(lectureDao)
lectureService.setManagerDao(managerDao)

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
  lectureService.list(pageNo, pageSize, function(results, totalCount) {
    response.json({'list': results, 'totalCount': totalCount})
    }, function(error) {
    response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })
})

router.get('/detail.json', function(request, response) {
  lectureService.listSelectBox(function(classroomList, managerList) {
    var no = parseInt(request.query.no)
    lectureService.detail(no, function(lecture) {
      console.log("강의정보:", lecture)
      response.json({'list': lecture,
                     'classroomList': classroomList,
                     'managerList': managerList})
    }, function(error) {
      response.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end('error')
      console.log(error)
    })//lectureService.detail()
  },//listSelectBox success function
  function(error) {
    response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })//lectureService.listSelectBox()

})//router.get('/detail.do')

router.post('/update.json', function(request, response) {
  //console.log(request.body)
  lectureService.update({
    no: request.body.no,
    title: request.body.title,
    description: request.body.description,
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    quantity: request.body.quantity,
    price: request.body.price,
    totalTime: request.body.totalTime,
    classroomNo: (request.body.classroomNo == 0 ? null : request.body.classroomNo),
    managerNo: (request.body.managerNo == 0 ? null : request.body.managerNo)
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
  lectureService.delete(no, function(result) {
    response.json({'result': 'yes'})
  }, function(error) {
    response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })
})


router.post('/add.json', function(request, response) {
  lectureService.insert({
    no: request.body.no,
    title: request.body.title,
    description: request.body.description,
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    quantity: request.body.quantity,
    price: request.body.price,
    totalTime: request.body.totalTime,
    classroomNo: (request.body.classroomNo == 0 ? null : request.body.classroomNo),
    managerNo: (request.body.managerNo == 0 ? null : request.body.managerNo)
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
