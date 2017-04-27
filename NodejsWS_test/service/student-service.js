"use strict"

module.exports = {
  setStudentDao(dao) {
    this.studentDao = dao
  },

  setMemberDao(dao) {
    this.memberDao = dao
  },

  list(pageNo, pageSize, success, error) {
    var obj = this //클로저 복제
    this.studentDao.selectList(pageNo, pageSize, function(students) { //TypeError: Cannot read property 'studentDao' of undefined
      obj.studentDao.countAll(function(result) {
        success(students, result[0].cnt)
      }, error)//studentDao.countAll()
    }, error)//studentDao.selectList()
  },//list()

  detail(no, success, error) {
    this.studentDao.selectOne(no, success, error)
  },//detail()

  insert(student, success, error) {
    var obj = this
    this.memberDao.insert(student, function(result) {
      student.no = result.insertId
      obj.studentDao.insert(student, success, error)
    }, error)//memberDao.insert()
  },//insert()

  update(student, success, error) {
    var obj = this
    this.memberDao.update(student, function(result) {
      obj.studentDao.update(student, success, error)
    }, error)//memberDao.update()
  },//update()

  delete(no, success, error) {
    var obj = this
    this.studentDao.delete(no, function(result) {
      obj.memberDao.delete(no, success, error)
    }, error)//memberDao.delete()
  }//delete()
}//module.exports
