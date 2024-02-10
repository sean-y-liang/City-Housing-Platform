// assume ID is the ID of user. student or owner.

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

db.run('INSERT TO students')


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
        uniqueID = generateRandomID();
    }
    return uniqueUID;
}

app.post('/Signup', (req, res) => {
    let existingUID = [];
    db.each('SELECT uid FROM students', [], (err, row) => {
        if (err){
            console.error(err.message);
            return;
        }
        existingUID.push(row.uid);
    }, (err, numRows) => {
        if (err) {
            console.error(err.message);
            return;
        }
    })
    let UID = generateUniqueUID(existingUID)
    const { uid, fName, lName, phone, password } = req.body;
    const stmt = db.prepare("INSERT INTO students (UID, fName, lName, phone, password)")
    stmt.run(uid, fName, lName, phone, password, function(err) {
        if (err) {
            res.json({ message: "Error in student registration." });
        } else {
            res.json({ message: "Student registered successfully." })
        }
    })
})

function isFirstLetter(str) {
    return /^[a-zA-Z]/.test(str);
}

if (isFirstLetter(ID)){

}

document.getElementById('personalInfo')

document.addEventListener()