"use strict"

module.exports = {
  setConnection(con) {
    this.connection = con
  },//setDatasource()
  /*select m.mno, m.name, m.tel, m.email, s.work
  from stud s inner join memb m on s.sno=m.mno
  order by m.mno desc
  limit 2, 4*/
  selectList(pageNo, pageSize, successFn, errorFn) {
    this.connection.query(
      'select m.mno, m.name, m.tel, m.email, s.work \
      from stud s inner join memb m on s.sno=m.mno \
      order by m.mno desc \
      limit ?, ?',
      [(pageNo - 1) * pageSize, pageSize],
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
    })//connection.query()
  },//function selectList() {}

  countAll(successFn, errorFn) {
    this.connection.query(
      'select count(*) cnt from stud',
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
    }) //connection.query()
  },//function countAll() {}

  selectOne(no, successFn, errorFn) {
    this.connection.query(
      'select m.email, m.name, m.tel, s.schl_nm, s.work \
      from stud s inner join memb m on s.sno=m.mno \
      where s.sno=?',
      [no],
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results[0])
        }
    })//connection.query()
  },//function selectOne() {}

  update(student, successFn, errorFn) {
    this.connection.query(
      "update stud set schl_nm=?, work=? where sno=?",
      [student.schl_nm, student.work, student.no],
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
    })//connection.query()
  },//function update() {}

  delete(no, successFn, errorFn) {
    this.connection.query(
      "delete from stud where sno=?",
      [no],
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }//else
    })//connection.query()
  },//function delete() {}

  insert(student, successFn, errorFn) {
    this.connection.query(
      "insert into stud (sno, work, schl_nm) values (?, ?, ?)",
      [student.no, student.work, student.schl_nm],
      function(error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
    })//connection.query()
  }//function insert() {}
}
