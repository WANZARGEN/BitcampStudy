"use strict"

module.exports = {
  setConnection(con) {
    this.connection = con
  },//setDatasource()

  selectList(pageNo, pageSize, successFn, errorFn) {
    this.connection.query(
      'select m.mno, m.name, m.tel, m.email, mr.posi, mr.fax, mr.path \
      from mgr mr inner join memb m on mr.mrno=m.mno \
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
      'select count(*) cnt from mgr',
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
      'select m.mno, m.email, m.name, m.tel, mr.posi, mr.fax, mr.path \
      from mgr mr inner join memb m on mr.mrno=m.mno \
      where mr.mrno=?',
      [no],
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results[0])
        }
    })//connection.query()
  },//function selectOne() {}

  update(manager, successFn, errorFn) {
    this.connection.query(
      "update mgr set posi=?, fax=?, path=? where mrno=?",
      [manager.position, manager.fax, manager.imgFilePath, manager.no],
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
      "delete from mgr where mrno=?",
      [no],
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }//else
    })//connection.query()
  },//function delete() {}

  insert(manager, successFn, errorFn) {
    this.connection.query(
      "insert into mgr (mrno, posi, fax, path) values (?, ?, ?, ?)",
      [manager.no, manager.position, manager.fax, manager.imgFilePath],
      function(error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
    })//connection.query()
  },//function insert() {}

  selectDistinct(successFn, errorFn) {
    this.connection.query(
      'select distinct mr.mrno, m.name \
      from mgr mr left join memb m on m.mno=mr.mrno',
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
    })//connection.query()
  },//selectDistinct()
}
