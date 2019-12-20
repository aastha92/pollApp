const mysql = require('mysql')
const pool = require('../mysql/connection')
const { handleSQLError } = require('../mysql/error')

const getsomething = (req,res) => {
  pool.query("SELECT * FROM User", (err, rows) => {
    if (err) {
      console.log({ 'message': 'Error occurred: ' + err });
      return handleSQLError(res, err);
    }
    return res.send(rows);
  })
}

  module.exports = {
    getsomething
}