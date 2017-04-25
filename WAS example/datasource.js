"use strict"

const mysql = require('mysql')

const connection = mysql.createConnection({
//  host     : 'localhost',
//  port     : 3306,
  database : 'webappdb',
  user     : 'webapp',
  password : '1111'
})

connection.connect()

module.exports = {
  getConnection() {
    return connection
  }
}
