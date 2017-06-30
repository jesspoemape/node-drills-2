const express = require('express')
    , bodyParser = require('body-parser')
    , users = require('./users.json');

const app = express();
app.use(bodyParser.json());

const mc = require('./mainControl.js');


// === ENDPOINTS =========================

app.get('/api/users', mc.getUsers);
app.get('/api/users/vehicleYear', mc.getUsersByVehicleYear); // get all users who drive a car newer than given year
app.put('/api/user/emailUpdate', mc.updateUserByLastName); // update users email address to null with given last name
app.put('/api/user/updateVehicle', mc.updateCar); // update car make with given user id and car make 
app.delete('/api/removeUser', mc.removeUser);
app.get('/api/user/:id', mc.getUserById); // Get user by id. The user id should be sent in the request url as a param
app.get('/api/vehicles/:model', mc.getUserByModel);
app.get('/api/userByName/:letter', mc.getUserByLetter); // Get users whose first name starts with the given letter
app.put('/api/updateName/:id', mc.updateNedById); // Update users name to 'Ned' by given id
app.delete('/api/user/:id', mc.deleteUserById); // Delete user by id
app.delete('/api/removeByEmail/:email', mc.deleteUserByEmail); // Delete user by email address
app.put('/api/user', mc.updateUserByBody);
app.post('/api/users', mc.addNewUser); 
app.put('/api/user/updateName/:id', mc.updateUserById);



// =======================================
const port = 3000;
app.listen(port, () => console.log('Listening on port: ', port));
