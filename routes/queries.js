/**
 * Database connection 
 */
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: '127.0.0.1',
  database: 'circle_test',
  password: '',
  port: 5432,
})

/**
 * Database queries
 */

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
    response.end() 
    // console.log (results.row)
  }

  const getExpense = (request, response) => {
    pool.query('SELECT * FROM expense ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
    response.end()
  }

  /**
   * TODO: How to get the id from the query that was just executed
   */

  const createExpense = (request, response) => {
    const { username, type, cost, created_at } = request.body
    //$(date) = new Date();

    pool.query('INSERT INTO expense (username, type, cost, created_at) VALUES ($1, $2, $3, $4) RETURNING id', [username, type, cost, created_at], (error, results) => {
      if (error) {
        throw error
      }
      console.log (results.rows);
      const id = results.rows;
      response.status(201).send(id)
    })
    response.end
  }

  module.exports = {
    getUsers,
    getExpense,
    createExpense
  }