"use strict"

module.exports = {
  setLectureDao(dao) {
    this.lectureDao = dao
  },

  setClassroomDao(dao) {
    this.classroomDao = dao
  },

  setManagerDao(dao) {
    this.managerDao = dao
  },

  list(pageNo, pageSize, success, error) {
    var obj = this //클로저 복제
    this.lectureDao.selectList(pageNo, pageSize, function(lectures) { //TypeError: Cannot read property 'lectureDao' of undefined
      obj.lectureDao.countAll(function(result) {
        success(lectures, result[0].cnt)
      }, error)//lectureDao.countAll()
    }, error)//lectureDao.selectList()
  },//list()

  detail(no, success, error) {
    this.lectureDao.selectOne(no, function(lecture) {
      success(lecture)
    }, error)//lectureDao.selectOne()
  },//detail()

  listSelectBox(success, error) {
    var obj = this
    this.classroomDao.selectDistinct(function(results) {
      obj.managerDao.selectDistinct(function(results2) {
        success(results, results2)
      }, error)//managerDao.selectDistinct()
    }, error)//classroomDao.selectDistinct
  },

  insert(lecture, success, error) {
    this.lectureDao.insert(lecture, success, error)
  },//insert()

  update(lecture, success, error) {
    this.lectureDao.update(lecture, success, error)//lectureDao.update()
  },//update()

  delete(no, success, error) {
    var obj = this
    this.lectureDao.delete(no, success, error)
  }//delete()
}//module.exports
