const express = require('express');
const server = express();
const sqlite3 = require('sqlite3').verbose();


server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
 });


server.listen(3000, () =>{ //Redovisnining musse
    console.log('Server running on http://localhost:3000.')
});

 //redovisning vehid 
server.get('/users', (req, res) => {
    const db = new sqlite3.Database('./gik339-labb2.db', (err) => {
      if (err) {
        console.error('Error connecting to the database:', err.message);
        res.status(500).send('Error connecting to the database');
        return;
      }
    });
  
    const query = 'SELECT * FROM users'; // redovisning vehid
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Database query error:', err.message);
        res.status(500).send('Error fetching users');
        return;
      }
  
      res.send(rows); //används för att skicka raderna tillbvaka till klient
    });
  
    db.close((err) => {
      if (err) {
        console.error('Error closing the database connection:', err.message);
      }
    });
  });