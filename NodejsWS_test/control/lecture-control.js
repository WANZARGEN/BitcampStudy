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

router.get('/list.do', (request, response) => {
  var pageNo = 1,
      pageSize = 3;
  if (request.query.pageNo) {
    pageNo = parseInt(request.query.pageNo)
  }
  if (request.query.pageSize) {
    pageSize = parseInt(request.query.pageSize)
  }
  lectureService.list(pageNo, pageSize, function(results, totalCount) {
    var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)

    response.render('lecture/index', {
      'data': results,
      'pageNo': pageNo,
      'nextPageNo': pageNo + 1,
      'prevPageNo': pageNo - 1,
      'disabledPrevBtn': (pageNo == 1) ? 'disabled' : '',
      'disabledNextBtn': (pageNo == lastPageNo ? 'disabled' : '')
    })
  }, function(error) {
    response.render('error', {
      'message': '강의 목록 데이터를 가져오는 중 오류가 발생했습니다.'})
    console.log(error)
  })
})

router.get('/detail.do', function(request, response) {
  lectureService.listSelectBox(function(classroomList, managerList) {
    var no = parseInt(request.query.no)
    lectureService.detail(no, function(lecture) {
      console.log("강의정보:", lecture)
      for(var c of classroomList) {
        if(c.crmno == lecture.crmno) {
          c.selectedClassroom = 'selected'
        } else {
          c.selectedClassroom = ""
        }
      }
      for(var mr of managerList) {
        if(mr.mrno == lecture.mrno) {
          mr.selectedManager = 'selected'
        } else {
          mr.selectedManager = ""
        }
      }
      console.log(classroomList, managerList)
      response.render('lecture/view', {
        'detail': true,
        'data': lecture,
        classroomList: classroomList,
        managerList: managerList,
        selectedClassroomDefault:(lecture.crmno ? '' : 'selected'),
        selectedManagerDefault: (lecture.mrno ? '' : 'selected')
      })
      console.log(lecture.crmno ? '' : 'selected')
    }, function(error) {
      response.render('error', {
        'message': '강의 데이터를 가져오는 중 오류가 발생했습니다.'})//response.render(error)
    })//lectureService.detail()
  },//listSelectBox success function
  function(error) {
    response.render('error', {
      'message': '강의실, 매니저 데이터를 가져오는 중 오류가 발생했습니다.'})//response.render(error)
  })//lectureService.listSelectBox()

})//router.get('/detail.do')

router.post('/update.do', function(request, response) {
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
    response.redirect('list.do')
  }, function(error) {
    response.render('error', {
      'message': '강의 데이터를 변경하는 중 오류가 발생했습니다.'})
    console.log(error)
  })
})

router.get('/delete.do', function(request, response) {
  var no = parseInt(request.query.no)
  lectureService.delete(no, function(result) {
    response.redirect('list.do')
  }, function(error) {
    response.render('error', {
      'message': '강의 데이터를 삭제하는 중 오류가 발생했습니다.'})
    console.log(error)
  })
})

router.get('/form.do', function(request, response) {
  lectureService.listSelectBox(function(classroomList, managerList) {
    response.render('lecture/view' , {
      classroomList: classroomList,
      managerList: managerList
    })
  },
  function(error) {
    response.render('error', {
      'message': '강의실, 매니저 데이터를 가져오는 중 오류가 발생했습니다.'}
    )//response.render(error)
  })//lectureService.listSelectBox()
})

router.post('/add.do', function(request, response) {
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
    response.redirect('list.do')

  }, function(error) {
    response.render('error', {
      'message': '매니저 데이터를 등록하는 중 오류가 발생했습니다.'})
    console.log(error)
  })
})





module.exports = router
