const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
var mysql = require('mysql');
var bodyParser = require('body-parser')

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const PORT = process.env.PORT || 5000
// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())       // to support JSON-encoded bodies
  .use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }))
  .use(express.json())      // to support JSON-encoded bodies
  .use(express.urlencoded()) // to support URL-encoded bodies
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/times', (req, res) => {
    let result = ''
    const times = process.env.TIMES || 5
    for (i = 0; i < times; i++) {
      result += i + ' '
    }
    res.send(result)
  })
  .get('/db', async (req, res) => {
    pool.getConnection(function(err, conn) {
      if (err) throw err; // not connected!
      var sql = "SELECT * FROM IEEE_Club_Members";
      // Use the connection
      conn.query(sql, function (error, results, fields) {
        console.log(results);
        // When done with the connection, release it.
        conn.release();

      // Handle error after the release.
      if (error) throw error;
        console.log(results);
        res.send(results)
        // Don't use the connection here, it has been returned to the pool.
      });
    });
  })
  .post('/new_subscriber', async (req, res) => {
      var netid = "'"+req.body.netid+"'";
      var fname = "'"+req.body.fname+"'";
      var lname = "'"+req.body.lname+"'";
      var email = "'"+req.body.email+"'";
      var year = "'"+req.body.year+"'";
      var timestamp = new Date().getTime();
      console.log(netid)
      pool.getConnection(function(err, conn) {
        if (err) throw err; // not connected!
        var sql = "INSERT INTO IEEE_Club_Members values ("+netid+","+fname+","+lname+","+email+","+year+","+timestamp+")";
        sql+= " ON DUPLICATE KEY UPDATE Email="+email;
        // Use the connection
        conn.query(sql, function (error, results, fields) {
          // When done with the connection, release it.
          conn.release();

        // Handle error after the release.
        if (error) throw error;
        console.log('1 record inserted');
          // Don't use the connection here, it has been returned to the pool.
        });
      });

  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
