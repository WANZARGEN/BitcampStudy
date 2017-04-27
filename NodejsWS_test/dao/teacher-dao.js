"use strict"

module.exports = {
  setConnection(con) {
    this.connection = con
  },//setDatasource()
/*
select m.mno, m.name, m.tel, m.email, t.hmpg, t.fcbk, t.twit
from tcher t inner join memb m on t.tno=m.mno
order by m.mno desc
limit ?, ?
*/
  selectList(pageNo, pageSize, successFn, errorFn) {
    this.connection.query(
      'select m.mno, m.name, m.tel, m.email, t.hmpg, t.fcbk, t.twit \
      from tcher t inner join memb m on t.tno=m.mno \
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
      'select count(*) cnt from tcher',
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
    }) //connection.query()
  },//function countAll() {}

/*
select m.email, m.name, m.tel, t.hmpg, t.fcbk, t.twit
from tcher t inner join memb m on t.tno=m.mno
where t.tno=63
*/
  selectOne(no, successFn, errorFn) {
    console.log(no)
    this.connection.query(
      'select m.mno, t.tno, m.email, m.name, m.tel, t.hmpg, t.fcbk, t.twit \
      from tcher t inner join memb m on t.tno=m.mno \
      where t.tno=?',
      [no],
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results[0])
        }
    })//connection.query()
  },//function selectOne() {}

/*
update tcher set hmpg=mysql_real_escape_string('http://www.ggg.com') where tno=63;
update tcher set hmpg='http://www.ggg.com' where tno=63;
*/
  update(teacher, successFn, errorFn) {
    this.connection.query(
      "update tcher set hmpg=?, fcbk=?, twit=? \
      where tno=?",
      [teacher.homepage, teacher.facebook, teacher.twitter, teacher.no],
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
      "delete from tcher where tno=?",
      [no],
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }//else
    })//connection.query()
  },//function delete() {}

  /*
  insert into tchr (tno, hmpg, fcbk, twit) values (?, ?, ?, ?)
  */
  insert(teacher, successFn, errorFn) {
    this.connection.query(
      "insert into tcher (tno, hmpg, fcbk, twit) values (?, ?, ?, ?)",
      [teacher.no, teacher.homepage, teacher.facebook, teacher.twitter],
      function(error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
    })//connection.query()
  }//function insert() {}
}
