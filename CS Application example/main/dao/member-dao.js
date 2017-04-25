"use strict"

module.exports = {

  setConnection(con) {
    this.connection = con
  },
/*
insert into memb (name, tel, email, pwd) values('가가가', '1133', '가가가가', password('1111'))
*/
  insert(member, successFn, errorFn) {
    console.log('일단 멤버정도 인서트 문 호출됐다!')
    this.connection.query(
      "insert into memb (name, tel, email, pwd) values(?, ?, ?, password(?))",
      [member.name, member.tel, member.email, member.pwd],
      function(error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
      })//connection.query()
    },//function insert() {}

    update(student, successFn, errorFn) {
      this.connection.query(
        "update memb set name=?, email=?, tel=? \
        where mno=?",
        [student.name, student.email, student.tel, student.no],
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
      "delete from memb where mno=?",
      [no],
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
      })//connection.query()
    }//function delete() {}

}//module.exports
