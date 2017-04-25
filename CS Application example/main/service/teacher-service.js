"use strict"

module.exports = {
  setTeacherDao(dao) {
    this.teacherDao = dao
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
    this.teacherDao.selectList(pageNo, function(teachers) { //TypeError: Cannot read property 'teacherDao' of undefined
      obj.teacherDao.countAll(function(result) {
        success(teachers, result[0].cnt)
      }, error)//teacherDao.countAll()
    }, error)//teacherDao.selectList()
  },//list()

  detail(no, success, error) {
    this.teacherDao.selectOne(no, success, error)
  },//detail()

  insert(teacher, success, error) {
    var obj = this
    this.memberDao.insert(teacher, function(result) {
      teacher.no = result.insertId
      obj.teacherDao.insert(teacher, success, error)
    }, error)//memberDao.insert()
  },//insert()

  update(teacher, success, error) {
    var obj = this
    this.memberDao.update(teacher, function(result) {
      obj.teacherDao.update(teacher, success, error)
    }, error)//memberDao.update()
  },//update()

  delete(no, success, error) {
    var obj = this
    this.teacherDao.delete(no, function(result) {
      obj.memberDao.delete(no, success, error)
    }, error)//memberDao.delete()
  }//delete()
}//module.exports
