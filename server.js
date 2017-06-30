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
else {
    res.send(users)
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

// update car make with given user id and car make 
// ?userId=8&make=Ford

app.put('/api/user/updateVehicle', (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (i - req.query.userId === -1) {
            users[i].make = req.query.make;
            res.send(users[i]);
        }
    }
});

app.delete('/api/removeUser', (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (users[i].model === req.query.model) {
            users.splice(i, 1);
        }
    }
    res.send(`Users with ${req.query.model} model cars have been removed`);
});

 // Get user by id. The user id should be sent in the request url as a param
 app.get('/api/user/:id', (req, res) => {
    res.send(users[req.params.id - 1]);
 });

 app.get('/api/vehicles/:model', (req, res) => {
     var usersArr = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].model === req.params.model) {
            usersArr.push(users[i]);
        }
    } 
    res.send(usersArr);
 });

 // Get users whose first name starts with the given letter
app.get('/api/userByName/:letter', (req, res) => {

    var usersArr = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].first_name.charAt(0) === req.params.letter) {
            usersArr.push(users[i]);
        }
    }
    res.send(usersArr);
});

// Update users name to 'Ned' by given id
app.put('/api/updateName/:id', (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === req.params.id) {
            users[i].first_name = 'Ned';
            res.send(users[i]);
        }
    }
});

// Delete user by id
app.delete('/api/user/:id', (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (req.params.id == users[i].id) {
            users.splice(i, 1);
            break;
        }
    }
    res.status(200).send(users);
});

// Delete user by email address
app.delete('/api/removeByEmail/:email', (req, res) => {
        for (var i = 0; i < users.length; i++) {
        if (req.params.email == users[i].email) {
            users.splice(i, 1);
            break;
        }
    }
    res.status(200).send(users);
});




// =======================================

const port = 3000;
app.listen(port, () => console.log('Listening on port: ', port));
