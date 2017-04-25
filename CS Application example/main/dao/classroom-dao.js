"use strict"

module.exports = {
  setConnection(con) {
    this.connection = con
  },//setDatasource()

  selectDistinct(successFn, errorFn) {
    this.connection.query(
      'select distinct crmno, name \
      from croom',
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results)
        }
    })//connection.query()
  }//selectDistinct()
}
