const mysql = require('mysql')
const pool = require('../mysql/connection')
const { handleSQLError } = require('../mysql/error')

const getAllUsers = (req,res) => {
  pool.query("SELECT * FROM Users ORDER BY id", (err, rows) => {
    if (err) {
      console.log({ 'message': 'Error occurred: ' + err });
      return handleSQLError(res, err);
    }
    return res.send(rows);
  })
}

const getUserById = (req,res) => {
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  const replacements = ['Users', 'id', (req.params.id)];
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, rows) => {
    if (err) {
      console.log({ 'message': 'Error occurred: ' + err });
      return handleSQLError(res, err);
    }
    return res.send(rows);
  })
}

const createUser = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let sql = "INSERT INTO Users (name , email , password ) VALUES (? , ? , ? )";
  const replacements = [name , email, password];
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser
}