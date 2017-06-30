const users = require('./users.json');

module.exports = {
    getUsers: (req, res) => {
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
},
getUsersByVehicleYear: (req, res) => {
    var usersArr = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].year > req.query.year) {
            usersArr.push(users[i]);
        }
    }
    res.send(usersArr);
},
updateUserByLastName: (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (users[i].last_name === req.query.lastName) {
            users[i].email = null;
            res.send(users[i]);
        } 
    }
},
updateCar: (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (i - req.query.userId === -1) {
            users[i].make = req.query.make;
            res.send(users[i]);
        }
    }
},
removeUser: (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (users[i].model === req.query.model) {
            users.splice(i, 1);
        }
    }
    res.send(`Users with ${req.query.model} model cars have been removed`);
},
getUserById: (req, res) => {
    res.send(users[req.params.id - 1]);
 },
getUserByModel: (req, res) => {
     var usersArr = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].model === req.params.model) {
            usersArr.push(users[i]);
        }
    } 
    res.send(usersArr);
 },
 getUserByLetter: (req, res) => {

    var usersArr = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].first_name.charAt(0) === req.params.letter) {
            usersArr.push(users[i]);
        }
    }
    res.send(usersArr);
},
updateNedById: (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === req.params.id) {
            users[i].first_name = 'Ned';
            res.send(users[i]);
        }
    }
},
deleteUserById: (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (req.params.id == users[i].id) {
            users.splice(i, 1);
            break;
        }
    }
    res.status(200).send(users);
},
deleteUserByEmail: (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (req.params.email == users[i].email) {
            users.splice(i, 1);
            break;
        }
    }
    res.status(200).send(users);
},
updateUserByBody: (req, res) => {
    for (var i = 0; i < users.length; i++) {
        if (req.body.id == users[i].id) {
            users[i] = Object.assign({}, {
                id: req.body.id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                make: req.body.make,
                model: req.body.model,
                year: req.body.year
            });
            res.status(200).send(users[i]);
        }
        
    }
    
}
}