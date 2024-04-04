var mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const { window } = dom;
global.window = window;
global.document = window.document;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views'));
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "499HousingP"
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

global.window = {
    location: {
        href: '/',
    },
};

app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });

app.get('/dashboard.html', function (req, res, next) {
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err){
        UID = "aa000";
    }
    let student = null;
    let members = null;
    let sql = "SELECT `students`.uid AS uid_, `grouping`.gid AS gid_, `students`.*, `grouping`.*, `groups`.*, `grouping`.gid FROM `students` LEFT JOIN `grouping` ON `students`.uid=`grouping`.uid LEFT JOIN `groups` ON `groups`.gid=`grouping`.gid WHERE `students`.uid='" + UID + "' LIMIT 1";
    con.query(sql, function (err, results) {
        if (err) console.log(err);
        student = results[0];
        try {
            if (undefined !== student.gid) {
                sql = "SELECT `students`.uid AS uid_, grouping.gid AS gid_, students.*, grouping.*, groups.* FROM students JOIN grouping ON grouping.uid=students.uid JOIN groups ON grouping.gid=groups.gid WHERE groups.gid='" + student.gid + "' AND NOT students.`uid`='" + UID + "';";
                con.query(sql, function (err, results) {
                    if (err) throw err;
                    members = results;
                    res.render('dashboard.ejs', {student: student, members: members});
                });
            }
        }
        catch (err) {
            res.render('dashboard.ejs', {student: student, members: members});
        }
    });
    // });
});

app.post('/new-group', function (req, res) {
    let UID;
    try {
        UID = req.session.uid;
    } catch (err) {
        UID = "aa000";
    }
    let student = null;
    let members = null;
    let sql = "SELECT `students`.uid AS uid_, `grouping`.gid AS gid_, `students`.*, `grouping`.*, `groups`.*, `grouping`.gid FROM `students` LEFT JOIN `grouping` ON `students`.uid=`grouping`.uid LEFT JOIN `groups` ON `groups`.gid=`grouping`.gid WHERE `students`.uid='" + UID + "' LIMIT 1";
    con.query(sql, function (err, results) {
        if (err) console.log(err);
        student = results[0];
        try {
            if (undefined !== student.gid) {
                sql = "SELECT `students`.uid AS uid_, grouping.gid AS gid_, students.*, grouping.*, groups.* FROM students JOIN grouping ON grouping.uid=students.uid JOIN groups ON grouping.gid=groups.gid WHERE groups.gid='" + student.gid + "' AND NOT students.`uid`='" + UID + "';";
                con.query(sql, function (err, results) {
                    if (err) throw err;
                    members = results;
                    let sql = "SELECT * FROM grouping WHERE uid='" + UID + "'";
                    con.query(sql, function (err, results) {
                        if (err) throw err;
                        if (results.length !== 0) {
                            res.redirect('/dashboard.html/?message=duplicate');
                        }
                    })
                    sql = "SELECT gid FROM `groups`";
                    con.query(sql, function (err, results) {
                        if (err) throw err;
                        let existingGIDs = results.map(result => result.gid);
                        let GID = generateUniqueGID(existingGIDs);
                        sql = "INSERT INTO `groups` (gid) VALUES ('" + GID + "')";
                        con.query(sql, (err) => {
                            if (err) throw err;
                            sql = "INSERT INTO `grouping` (gid, uid) VALUES ('" + GID + "', '" + UID + "')";
                            con.query(sql, function (err) {
                                if (err) throw err;
                                res.redirect('/dashboard.html/?message=created');
                            })
                        });
                    })
                });
            }
        }
        catch (err) {
            res.redirect('/dashboard.html/?message-nocreated');
        }
    })
})

app.post('/leave-group', function (req, res) {
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err) {
        UID = "aa000";
    }
    let sql = "SELECT * FROM students LEFT JOIN grouping ON students.uid = `grouping`.uid WHERE students.uid='" + UID + "';";
    let temp = [];
    con.query(sql, function(err, result) {
        if (err) throw err;
        const GID = result[0].gid;
        sql = "DELETE FROM grouping WHERE grouping.uid='" + UID + "';";
        con.query(sql, function (err) {
            if (err) throw err;
            sql = "SELECT * FROM grouping WHERE gid='" + GID + "';";
            con.query(sql, function(err, results) {
                if (results.length === 0) {
                    sql = "DELETE FROM groups WHERE groups.gid='" + GID + "';";
                    con.query(sql, function(err) {
                        if (err) throw err;
                        temp.push(GID);
                    })
                }
            })

        })
        let message;
        if (temp !== []) {
            message = "left";
        } else {
            message = "noleft";
        }
        return res.redirect(`/dashboard.html/?message=${message}`);
    })
})

app.get('/modify-group.html', function (req, res) {
    let UID;
    try {
        UID = req.session.uid;
    } catch (err) {
        UID = "aa000";
    }
    let student = null;
    let members = null;
    con.query("SELECT * FROM `students`", function (err) {
        if (err) console.log(err);
    });
    let sql = "SELECT `students`.uid AS uid_, `grouping`.gid AS gid_, `students`.*, `grouping`.*, `groups`.*, `grouping`.gid FROM `students` LEFT JOIN `grouping` ON `students`.uid=`grouping`.uid LEFT JOIN `groups` ON `groups`.gid=`grouping`.gid WHERE `students`.uid='" + UID + "' LIMIT 1";
    con.query(sql, function (err, results) {
        if (err) console.log(err);
        student = results[0];
        try {
            if (undefined !== student.gid) {
                sql = "SELECT `students`.uid AS uid_, grouping.gid AS gid_, students.*, grouping.*, groups.* FROM students JOIN grouping ON grouping.uid=students.uid JOIN groups ON grouping.gid=groups.gid WHERE groups.gid='" + student.gid + "' AND NOT students.`uid`='" + UID + "';";
                con.query(sql, function (err, results) {
                    if (err) throw err;
                    members = results;
                    res.render('modify-group.ejs', {student: student, members: members});
                });
            }
        } catch (e) {
            res.render('dashboard.ejs', {student: student, members: members});
        }
    })
});

app.post('/modify-group', function (req, res) {
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err){
        UID = "aa000";
    }
    let sql = "SELECT * FROM `grouping` JOIN `groups` ON `grouping`.gid = `groups`.gid JOIN `students` ON `grouping`.uid = students.uid WHERE grouping.uid='" + UID + "' LIMIT 1"
    con.query(sql, function (err, results) {
        if (err) throw err;
        const item = results[0];
        const dict = {
            "homeType": req.body.homeType,
            "bedroom": req.body.bedroom,
            "bathroom": req.body.bathroom,
            "parking": req.body.parking,
            "kitchen": req.body.kitchen,
            "laundry": req.body.laundry,
            "minRent": req.body.minRent,
            "maxRent": req.body.maxRent,
            "accessibility": req.body.accessibility,
            "yard": req.body.yard,
            "houseType": req.body.houseType,
            "floor": req.body.floor,
            "elevator": req.body.elevator,
            "countPeople": req.body.countPeople
        };
        let message = "";
        for (const [key, value] of Object.entries(dict)) {
            if (value !== "") {
                if (message !== "") {
                    message += ", ";
                }
                message += `${key}='${value}'`;
            }
        }
        if (message !== '') {
            sql = "UPDATE `groups` SET " + message + "WHERE gid='" + item.gid + "'";
            con.query(sql, (err) => {
                if (err) throw err;
            })
            res.redirect('/dashboard.html/?message=changed');
        } else {
            res.redirect('/dashboard.html/?message=canceled');
        }
    });
})

app.get('/member.html', function (req, res) {
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err){
        UID = "aa000";
    }
    let student = null;
    let members = null;
    con.query("SELECT * FROM `students`", function (err) {
        if (err) console.log(err);
    });
    let sql = "SELECT `students`.uid AS uid_, `grouping`.gid AS gid_, `students`.*, `grouping`.*, `groups`.*, `grouping`.gid FROM `students` LEFT JOIN `grouping` ON `students`.uid=`grouping`.uid LEFT JOIN `groups` ON `groups`.gid=`grouping`.gid WHERE `students`.uid='" + UID + "' LIMIT 1";
    con.query(sql, function (err, results) {
        if (err) console.log(err);
        student = results[0];
        try {
            if (undefined !== student.gid) {
                sql = "SELECT `students`.uid AS uid_, grouping.gid AS gid_, students.*, grouping.*, groups.* FROM students JOIN grouping ON grouping.uid=students.uid JOIN groups ON grouping.gid=groups.gid WHERE groups.gid='" + student.gid + "' AND NOT students.`uid`='" + UID + "';";
                con.query(sql, function (err, results) {
                    if (err) throw err;
                    members = results;
                    res.render('member.ejs', {student: student, members: members});
                });
            }
        } catch (e) {
            res.render('member.ejs', {student: student, members: members});
        }
    });
})

app.post('/member.html', function (req, res) {
    const dict = {
        fName: req.body.fName,
        lName: req.body.lName,
        phone: req.body.phone
    }
    let statement = "";
    for (const [key, value] of Object.entries(dict)) {
        if (value.length !== 0) {
            if (statement.length !== 0) {
                statement += "&";
            }
            statement += `${key} LIKE '${value}'`;
        }
    }
    if (statement.length === 0){
        res.redirect('/member.html/?message=null');
    }
    else {
        res.redirect(`/member-search.html/?data=${encodeURIComponent(statement)}`);
    }

})

app.get('/member-search.html', function(req, res) {
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err){
        UID = "aa000";
    }
    const rawData = req.query.data;
    const statement = rawData.replace(/&/g, " AND ");
    let sql = "SELECT students.uid AS uid_, students.*, grouping.* FROM students LEFT JOIN `grouping` ON students.uid = `grouping`.uid WHERE " + statement + " AND grouping.gid IS NULL";
    con.query(sql, function (err, results) {
        if (err) console.log(err);
        let student = null;
        let members = null;
        let students = results;
        let sql = "SELECT `students`.uid AS uid_, `grouping`.gid AS gid_, `students`.*, `grouping`.*, `groups`.*, `grouping`.gid FROM `students` LEFT JOIN `grouping` ON `students`.uid=`grouping`.uid LEFT JOIN `groups` ON `groups`.gid=`grouping`.gid WHERE `students`.uid='" + UID + "' LIMIT 1";
        con.query(sql, function (err, results) {
            if (err) console.log(err);
            student = results[0];
            try {
                if (undefined !== student.gid) {
                    sql = "SELECT `students`.uid AS uid_, grouping.gid AS gid_, students.*, grouping.*, groups.* FROM students JOIN grouping ON grouping.uid=students.uid JOIN groups ON grouping.gid=groups.gid WHERE groups.gid='" + student.gid + "' AND NOT students.`uid`='" + UID + "';";
                    con.query(sql, function (err, results) {
                        if (err) throw err;
                        members = results;
                        res.render('member-search.ejs', {student: student, students: students, members: members });
                    });
                }
            }
            catch (e) {
                res.redirect('/dashboard.html');
            }
        });
    });
});

app.post('/member-search', function (req, res) {
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err){
        UID = "aa000";
    }
    let checkboxes;
    if (typeof req.body.member === 'string') {
        checkboxes = [req.body.member];
    } else if (Array.isArray(req.body.member)) {
        checkboxes = req.body.member;
    } else {
        return res.redirect('/dashboard.html/?message=noadded');
    }
    const checkedValues = [];
    checkboxes.forEach(function (checkbox) {
        checkedValues.push(checkbox);
    })
    if (checkedValues.length !== 0) {
        let temp = [];
        let sql = "SELECT `students`.uid AS uid_, `groups`.gid AS gid_, `students`.*, `grouping`.*, `groups`.*, `grouping`.gid FROM `students` LEFT JOIN `grouping` ON `students`.uid=`grouping`.uid LEFT JOIN `groups` ON `groups`.gid=`grouping`.gid WHERE `students`.uid='" + UID + "' LIMIT 1";
        con.query(sql, function (err, results) {
            if (err) console.log(err);
            const GID = results[0].gid_;
            checkedValues.forEach(function (MUID) {
                sql = "INSERT INTO `grouping` (uid, gid) VALUES ('" + MUID + "', '" + GID + "')";
                con.query(sql, (err) => {
                    if (err) throw err;
                    temp.push(MUID);
                })
            })
        });

        let message;
        if (temp !== []) {
            message = "added";
        } else {
            message = "noadded";
        }
        return res.redirect(`/dashboard.html/?message=${message}`);
    }
})

app.get('/delete-member.html', function (req, res) {
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err){
        UID = "aa000";
    }
    let student = null;
    let members = null;
    con.query("SELECT * FROM `students`", function (err, results) {
        if (err) console.log(err);
    });
    let sql = "SELECT `students`.uid AS uid_, `grouping`.gid AS gid_, `students`.*, `grouping`.*, `groups`.*, `grouping`.gid FROM `students` LEFT JOIN `grouping` ON `students`.uid=`grouping`.uid LEFT JOIN `groups` ON `groups`.gid=`grouping`.gid WHERE `students`.uid='" + UID + "' LIMIT 1";
    con.query(sql, function (err, results) {
        if (err) console.log(err);
        student = results[0];
        sql = "SELECT `students`.uid AS uid_, grouping.gid AS gid_, students.*, grouping.*, groups.* FROM students JOIN grouping ON grouping.uid=students.uid JOIN groups ON grouping.gid=groups.gid WHERE groups.gid='" + student.gid + "' AND NOT students.`uid`='" + UID + "';";
        con.query(sql, function (err, results) {
            if (err) throw err;
            members = results;
            res.render('delete-member.ejs', { student: student, members: members});
        });
    });
})

app.post('/delete-member', function (req, res) {
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err){
        UID = "aa000";
    }

    let checkboxes;
    if (typeof req.body.member === 'string') {
        checkboxes = [req.body.member];
    } else {
        checkboxes = req.body.member;
    }
    if (checkboxes === undefined) {
        return res.redirect('/dashboard.html/?message=failed');
    }
    const checkedValues = [];
    checkboxes.forEach(function (checkbox) {
        checkedValues.push(checkbox);
    })

    let GID = "";
    let sql = "SELECT `students`.uid AS uid_, `groups`.gid AS gid_, `students`.*, `grouping`.*, `groups`.*, `grouping`.gid FROM `students` LEFT JOIN `grouping` ON `students`.uid=`grouping`.uid LEFT JOIN `groups` ON `groups`.gid=`grouping`.gid WHERE `students`.uid='" + UID + "' LIMIT 1";
    con.query(sql, function (err, results) {
        if (err) console.log(err);
        GID = results[0].gid_;
        let temp = [];
        checkedValues.forEach(function (MUID) {
            sql = "DELETE FROM `grouping` WHERE uid='" + MUID + "' AND gid='" +  GID + "';";
            con.query(sql, (err) => {
                if (err) throw err;
                temp.push(MUID);
            })
        })
        let message;
        if (temp !== []) {
            message = "deleted";
        } else {
            message = "failed";
        }
        return res.redirect(`/dashboard.html/?message=${message}`);
    });
})

app.get('/rent.html', function (req, res) {
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err){
        UID = "aa000";
    }
    let student = null;
    let members = null;
    let sql = "SELECT students.uid as uid_, grouping.gid as gid_, students.*, grouping.*, groups.* FROM students left join `499housingp`.`grouping` on students.uid = grouping.uid left join `499housingp`.`groups` on groups.gid = grouping.gid WHERE students.uid='" + UID + "'";
    con.query(sql, function (err, results) {
        if (err) throw err;
        student = results[0]
        try {
            if (undefined !== student.gid) {
                sql = "SELECT `students`.uid AS uid_, grouping.gid AS gid_, students.*, grouping.*, groups.* FROM students JOIN grouping ON grouping.uid=students.uid JOIN groups ON grouping.gid=groups.gid WHERE groups.gid='" + student.gid + "' AND NOT students.`uid`='" + UID + "';";
                con.query(sql, function (err, results) {
                    if (err) throw err;
                    members = results;
                    res.render('rent.html', {student: student, members: members});
                });
            }
        }
        catch (e) {
            res.redirect('dashboard.html')
        }
    })
})

app.post('/rent', function (req, res) {
    const requirement = {
        "minRent": req.body.minRent,
        "maxRent": req.body.maxRent,
        "homeType": req.body.homeType,
        "bedroom": req.body.bedroom,
        "bathroom": req.body.bathroom,
        "parking": req.body.parking,
        "laundry": req.body.laundry,
        "yard": req.body.yard,
        "houseType": req.body.houseType,
        "floor": req.body.floor,
        "elevator": req.body.elevator,
        "countPeople": req.body.countPeople,
        "kitchen": req.body.kitchen
    }
    const mustMatch = {
        "minRent": req.body.mustMinRent,
        "maxRent": req.body.mustMaxRent,
        "homeType": req.body.mustHomeType,
        "bedroom": req.body.mustBedroom,
        "bathroom": req.body.mustBathroom,
        "parking": req.body.mustParking,
        "laundry": req.body.mustLaundry,
        "yard": req.body.mustYard,
        "houseType": req.body.mustHouseType,
        "floor": req.body.mustFloor,
        "elevator": req.body.mustElevator,
        "countPeople": req.body.mustCountPeople,
        "kitchen": req.body.mustKitchen
    }
    let exactStatement = "";
    let fuzzyStatement = "";
    for (const [key, value] of Object.entries(requirement)) {
        if (value !== "" && value !== undefined) {
            if ("yes" === mustMatch[key]) {
                if (fuzzyStatement.length !== 0) {
                    fuzzyStatement += "&";
                }
                if (key === "minRent") {
                    fuzzyStatement += `rent>${value}`;
                } else if (key === "maxRent") {
                    fuzzyStatement += `rent<${value}`;
                } else {
                    if (typeof value === "number") {
                        fuzzyStatement += `${key}=${value}`;
                    } else if (typeof value === "string") {
                        fuzzyStatement += `${key}='${value}'`;
                    }
                }
            }
            if (exactStatement.length !== 0) {
                exactStatement += "&";
            }
            if (key === "minRent") {
                exactStatement += `rent>${value}`;
            } else if (key === "maxRent") {
                exactStatement += `rent<${value}`;
            } else {
                if (typeof value === "number") {
                    exactStatement += `${key}=${value}`;
                } else if (typeof value === "string") {
                    exactStatement += `${key}='${value}'`;
                }
            }
        }
    }
    res.redirect(`/rent-search.html/?exact=${encodeURIComponent(exactStatement)}&fuzzy=${encodeURIComponent(fuzzyStatement)}`);
})

app.get('/rent-search.html', function (req, res) {
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err){
        UID = "aa000";
    }
    let student = null;
    let members = null;
    const exactSearch = req.query.exact;
    const fuzzySearch = req.query.fuzzy;
    let exactStatement = "";
    let fuzzyStatement = "";
    let sql = "";
    sql = "SELECT `students`.uid AS uid_, `grouping`.gid AS gid_, `students`.*, `grouping`.*, `groups`.*, `grouping`.gid FROM `students` LEFT JOIN `grouping` ON `students`.uid=`grouping`.uid LEFT JOIN `groups` ON `groups`.gid=`grouping`.gid WHERE `students`.uid='" + UID + "' LIMIT 1";
    con.query(sql, function (err, results) {
        if (err) console.log(err);
        student = results[0];
        try {
            if (undefined !== student.gid) {
                sql = "SELECT `students`.uid AS uid_, grouping.gid AS gid_, students.*, grouping.*, groups.* FROM students JOIN grouping ON grouping.uid=students.uid JOIN groups ON grouping.gid=groups.gid WHERE groups.gid='" + student.gid + "' AND NOT students.`uid`='" + UID + "';";
                con.query(sql, function (err, results) {
                    if (err) throw err;
                    members = results;
                    if (exactSearch.length === 0) {
                        sql = "SELECT * FROM property;";
                    } else {
                        exactStatement = exactSearch.replace(/&/g, " AND ");
                        sql = "SELECT * FROM property WHERE " + exactStatement + ";";
                    }
                    con.query(sql, function (err, results1) {
                        if (err) throw err;
                        if (fuzzySearch.length === 0) {
                            sql = "SELECT * FROM property;";
                        } else {
                            fuzzyStatement = fuzzySearch.replace(/&/g, " AND ");
                            sql = "SELECT * FROM property WHERE " + fuzzyStatement + ";";
                        }
                        con.query(sql, function (err, results2) {
                            if (err) throw err;
                            return res.render('rent-search.ejs',
                                {student: student, members: members, exact: results1, fuzzy: results2});
                        })
                    })
                });
            }
        } catch (e) {
            res.redirect('dashboard.html');
        }
    });
})

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

function generateUniqueUID(existingUIDs) {
    let uniqueUID = generateRandomUID();
    while (existingUIDs.includes(uniqueUID)) {
        uniqueUID = generateRandomUID();
    }
    return uniqueUID;
}

function generateRandomGID() {
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

function generateUniqueGID(existingGIDs){
    let uniqueGID = generateRandomGID();
    while (existingGIDs.includes(uniqueGID)) {
        uniqueGID = generateRandomGID();
    }
    return uniqueGID;
}

