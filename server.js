const express = require('express')
    , bodyParser = require('body-parser')
    , users = require('./users.json');

const app = express();
app.use(bodyParser.json());


// === ENDPOINTS =========================

app.get('/api/users', (req, res) => {
    var usersArr = [];

//get all users that drive an audi
    if (req.query.make) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].make === req.query.make) {
            usersArr.push(users[i]);
            }
        }
        res.send(usersArr);
    }

// get all users who's name starts with an A
    else if (req.query.letter) {
        for (var i = 0; i < users.length; i++) {
        if (users[i].first_name.charAt(0) === req.query.letter) {
            usersArr.push(users[i]);
        }
    }
    res.send(usersArr);
    } 
});




// get all users who drive a car newer than given year

app.get('/api/users/vehicleYear', (req, res) => {
    var usersArr = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].year > req.query.year) {
            usersArr.push(users[i]);
        }
    }
    res.send(usersArr);
})

// update users email address to null with given last name
app.put('/api/user/emailUpdate', (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (users[i].last_name === req.query.lastName) {
            users[i].email = null;
            res.send(users[i]);
        } 
    }
});






// =======================================

const port = 3000;
app.listen(port, () => console.log('Listening on port: ', port));
