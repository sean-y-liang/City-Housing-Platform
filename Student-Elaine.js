// assume ID is the ID of user. student or owner.
const express= require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./HousingPDB.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to HousingPDB database.');
});

db.all('SELECT name FROM sqlite_master WHERE type="table" AND name NOT LIKE "sqlite_%"', [], (err, tables) => {
    if (err) {
        return console.error(err.message);
    }

    table.forEach(table => {
        const dropStatement = 'DROP TABLE IF EXISTS ${table.name}';
        db.run(dropStatement, [], (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Dropped table ${table.name}`);
        });
    });
});

db.run('CREATE TABLE IF NOT EXISTS students (' +
    'uid TEXT UNIQUE NOT NULL PRIMARY KEY, ' +
    'fName TEXT NOT NULL, ' +
    'lName TEXT NOT NULL, ' +
    'phone TEXT NOT NULL, ' +
    'password TEXT NOT NULL, ' +
    'address TEXT, ' +
    'studentID INTEGER, ' +
    'gradYear INTEGER, ' +
    'program TEST)');


function generateRandomUID() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 2; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

function generateUniqueUID(existingIDs) {
    let uniqueUID = generateRandomUID();
    while (existingID.indcludes(uniqueUID)) {
        uniqueUID = generateRandomUID();
    }
    return uniqueUID;
}

app.post('/Login-Student', () => {
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    fetch('/Login-Student', {
        method: 'POST', bodyheaders: {
            'content-Type': 'application/json',
        },
        body: JSON. stringify({
            phone: phone,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Successfully log in.');
        } else{
            alert('Fail to log in' + data.message);
        }
    })
    .catch((error) => {
        console.error('Login request fail:', error);
    })
    .then(response => {
        if(response.ok) {
            window.location.href = '/Student-Elaine.html';
            let UID = db.query('SELECT uid FROM students where students.phone=phone and students.password=password')
        }
    });
})


app.post('/Signup-Student', (req, res) => {
    let existingUID = [];
    db.each('SELECT uid FROM students', [], (err, row) => {
        if (err){
            console.error(err.message);
            return;
        }
        existingUID.push(row.uid);
    }, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
    })
    let uid = generateUniqueUID(existingUID)
    const { fName, lName, phone, password } = req.body;
    const stmt = db.prepare("INSERT INTO students (UID, fName, lName, phone, password)")
    stmt.run(uid, fName, lName, phone, password, function(err) {
        if (err) {
            res.json({ message: "Error in student registration." });
        } else {
            res.json({ message: "Student registered successfully." })
        }
    });
    stmt.finalize()
    .then(response => {
        if(response.ok) {
            window.location.href = '/Student-Elaine.html';
        }
    });
});

app.get('/Student-Elaine.html', (req, res) => {
    student = students.filter_by(uid=UID)
});

