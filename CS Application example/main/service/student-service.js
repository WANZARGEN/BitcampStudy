"use strict"

module.exports = {
  setStudentDao(dao) {
    this.studentDao = dao
  },

  setMemberDao(dao) {
    this.memberDao = dao
  },
  /* list(pageNo, success, error) 스펙
     - pageNo: 가져올 페이지 번호
     - success: 데이터 가져오는데 성공했을 때 호출될 함수
        => success(학생데이터배열, 전채개수)
     - error: 데이터 가져오는데 실패했을 때 호출될 함수
        => error(오류객체)
  */
  list(pageNo, success, error) {
    var obj = this //클로저 복제
    this.studentDao.selectList(pageNo, function(students) { //TypeError: Cannot read property 'studentDao' of undefined
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
