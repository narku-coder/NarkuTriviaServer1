const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'narkuQuizUser',
    password: 'B@5k37b@11ru135',
    database: 'TVShows'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MariaDB');
});

// Endpoint to retrieve data
app.get('/2000stv', (req, res) => {
    const sql = 'SELECT * FROM 2000sTV';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint to submit data
app.post('/submit', async (req, res) => {
    const { title, network, years_aired, num_of_seasons, synopsis, vid_name } = req.body;
    const sql = 'INSERT INTO 2000sTV (title, network, years_aired, num_of_seasons, synopsis, vid_name) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, network, years_aired, num_of_seasons, synopsis, vid_name], (err, results) => {
        if (err) throw err;
        res.json({ success: true, message: 'Submission successful', data: results });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});