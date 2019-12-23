const mysql = require('mysql')
const pool = require('../mysql/connection')
const { handleSQLError } = require('../mysql/error')

const getVotesByOptionsId = (req,res) => {
  let sql = "SELECT option_id , COUNT(*) AS no_of_votes FROM ?? WHERE ?? = ? GROUP BY ??";
  const replacements = ['Votes', 'option_id', (req.params.id) , 'option_id'];
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, rows) => {
    if (err) {
      console.log({ 'message': 'Error occurred: ' + err });
      return handleSQLError(res, err);
    }
    return res.send(rows);
  })
}

const getVotesByUserId = (req,res) => {
  let sql = "SELECT user_id , COUNT(*) AS total_votes FROM ?? WHERE ?? = ? GROUP BY ??";
  const replacements = ['Votes', 'user_id', (req.params.id) , 'user_id'];
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, rows) => {
    if (err) {
      console.log({ 'message': 'Error occurred: ' + err });
      return handleSQLError(res, err);
    }
    return res.send(rows);
  })
}

const createVote = (req, res) => {
  let poll_id = req.body.poll_id;
  let option_id = req.body.option_id;
  let user_id = req.body.user_id;
  let sql = "INSERT INTO Votes (poll_id , option_id , user_id ) VALUES (? , ? , ? )";
  const replacements = [poll_id , option_id , user_id];
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateVoteById = (req, res) => {
  let id = req.params.id;
  let poll_id = req.body.poll_id;
  let option_id = req.body.option_id;
  let user_id = req.body.user_id;
  let sql = "UPDATE Votes SET poll_id = ? , option_id = ? , user_id = ? WHERE id = ?";
  const replacements = [poll_id , option_id , user_id , id];
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.status(204).json();
  })
}

module.exports = {
  getVotesByOptionsId,
  getVotesByUserId,
  createVote,
  updateVoteById
}