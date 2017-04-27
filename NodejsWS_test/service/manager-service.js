"use strict"

module.exports = {
  setManagerDao(dao) {
    this.managerDao = dao
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
  list(pageNo, pageSize, success, error) {
    var obj = this //클로저 복제
    this.managerDao.selectList(pageNo, pageSize, function(managers) { //TypeError: Cannot read property 'managerDao' of undefined
      obj.managerDao.countAll(function(result) {
        success(managers, result[0].cnt)
      }, error)//managerDao.countAll()
    }, error)//managerDao.selectList()
  },//list()

  detail(no, success, error) {
    this.managerDao.selectOne(no, success, error)
  },//detail()

  insert(manager, success, error) {
    var obj = this
    this.memberDao.insert(manager, function(result) {
      manager.no = result.insertId
      console.log('여기까진 OK')
      obj.managerDao.insert(manager, success, error)
    }, error)//memberDao.insert()
  },//insert()

  update(manager, success, error) {
    var obj = this
    this.memberDao.update(manager, function(result) {
      obj.managerDao.update(manager, success, error)
    }, error)//memberDao.update()
  },//update()

  delete(no, success, error) {
    var obj = this
    this.managerDao.delete(no, function(result) {
      obj.memberDao.delete(no, success, error)
    }, error)//memberDao.delete()
  }//delete()
}//module.exports
