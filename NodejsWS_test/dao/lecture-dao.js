"use strict"

module.exports = {
  setConnection(con) {
    this.connection = con
  },//setDatasource()

  selectList(pageNo, pageSize, successFn, errorFn) {
    this.connection.query(
      'select lno, titl, date_format(sdt,"%Y-%m-%d") sdt, qty, pric \
      from lect \
      order by lno desc \
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
/*  select l.titl, l.dscp, date_format(l.sdt,'%y-%m-%d') sdt, l.edt, l.qty, l.pric, l.thrs,
  c.name cname, m.name mname, l.crmno, l.mrno
  from lect l
  left join croom c on l.crmno=c.crmno
  left join mgr mr on l.mrno=mr.mrno
  left join memb m on mr.mrno=m.mno
  where lno=13
  */
  selectOne(no, successFn, errorFn) {
    console.log('ddds')
    this.connection.query(
      "select l.lno, l.titl, l.dscp, date_format(l.sdt,'%Y-%m-%d') sdt, date_format(l.edt,'%Y-%m-%d') edt, l.qty, l.pric, l.thrs, \
      c.name cname, m.name mname, l.crmno, l.mrno\
      from lect l \
      left join croom c on l.crmno=c.crmno \
      left join mgr mr on l.mrno=mr.mrno \
      left join memb m on mr.mrno=m.mno \
      where lno=?",
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
select crmno, mrno
from lect
where lno=13
*/
  update(lecture, successFn, errorFn) {
    this.connection.query(
      "update lect \
      set titl=?, dscp=?, sdt=?, edt=?, qty=?, pric=?, thrs=?, crmno=?, mrno=? \
      where lno=?",
      [lecture.title, lecture.description, lecture.startDate, lecture.endDate,
      lecture.quantity, lecture.price, lecture.totalTime, lecture.classroomNo, lecture.managerNo, lecture.no],
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
      "delete from lect where lno=?",
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
insert into lect (titl, dscp, sdt, edt, qty, pric, thrs, crmno, mrno)
values (?, ?, str_to_date(?), str_to_date(?), ?, ?, ?, ?, ?)
*/
  insert(lecture, successFn, errorFn) {
    this.connection.query(
      "insert into lect (titl, dscp, sdt, edt, qty, pric, thrs, crmno, mrno) \
      values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [lecture.title, lecture.description, lecture.startDate, lecture.endDate,
      lecture.quantity, lecture.price, lecture.totalTime, lecture.classroomNo, lecture.managerNo],
      function(error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
    })//connection.query()
  }//function insert() {}
}
