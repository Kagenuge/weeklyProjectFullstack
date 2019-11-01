const Pool = require('pg').Pool;

const conopts = {
  user: 'postgres',
  password: 'potato',
  host: 'localhost',
  database: 'weeklyproject'
  //port: 5432
}
const pool = new Pool(conopts);

function getAll(req, callback) {
  pool.connect((err, client) => {
    client.query('SELECT * FROM topic', (error, data) => {
      if (error) {
        client.release();
        throw error;
      }
      callback(data.rows);
    });
    client.release();
  });
};

function getById(req, callback) {
  const id = parseInt(req.params.id);

  pool.connect((err, client) => {
    client.query('DELETE FROM users WHERE id = $1', [id], (error, data) => {
      if (err) {
        client.release();
        throw error;
      }
      console.log(data.rows);
      callback(data.rows);
    });
    client.release();
  });
};

function createPost(req, callback) {
  pool.query('INSERT INTO topic(title, description, timetomaster, timespent, source, startlearningdate, inprogress, completiondate) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.title, req.body.description, req.body.ttm, req.body.timeS, req.body.src, req.body.startedL, req.body.inProg, req.body.compDate], (error, results) => {
    if (error) {
      throw error
    }
    callback('User created!')
  });
};

function deletePost(req, callback) {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM topic WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    callback(`User deleted with ID: ${id}`);
  })
};

const updatePost = (request, response) => {
  const id = parseInt(request.params.id);
  const { nimi, sposti, kaupunki } = request.body;

  pool.query(
    'UPDATE users SET nimi = $1, sposti = $2, kaupunki = $3 WHERE id = $4',
    [nimi, sposti, kaupunki, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response(`User modified with ID: ${id}`)
    }
  )
};

module.exports = { getAll, getById, createPost, deletePost, updatePost };