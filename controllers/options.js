const mysql = require("mysql")
const pool = require('../mysql/connection')
const { handleSQLError } = require('../mysql/error')
 
const getAllOptions = (req,res) => {
  pool.query("SELECT pol.name as poll, opt.name as options FROM Polls pol JOIN Options opt ON opt.poll_id = pol.id", (err, rows) => {
    if (err) {
      console.log({ 'message': 'Error occurred: ' + err });
      return handleSQLError(res, err);
    }
    return res.send(rows);
  })
}

const createOption = (req, res) => {
  let poll_id = req.params.poll_id;
  let name = req.body.name;
  let sql = "INSERT INTO Options (poll_id , name) VALUES (? , ?)";
  const replacements = [poll_id , name];
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ newId: results.insertId });
  })
}

const updateOptionById = (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let sql = "UPDATE Options SET name = ? WHERE id = ?";
  const replacements = [name , id];
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteOptionsById = (req, res) => {
  let id = req.params.id;
  let sql = "DELETE FROM Options WHERE id = ?";
  const replacements = [id];
  sql = mysql.format(sql,replacements)
  pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllOptions,
  createOption,
  updateOptionById,
  deleteOptionsById
}