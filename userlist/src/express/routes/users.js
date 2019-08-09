const express = require('express');
let User = require('../model/user.model');
const router = express.Router();

//get all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get one user by id
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//create new user
router.route('/create').post((req, res) => {
  const { firstName, lastName, gender, age, password } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    gender,
    age,
    password
  });
  newUser.save()
    .then(() => res.json('User has been created.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//edit one user by id
router.route('/edit/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.gender = req.body.gender;
      user.age = req.body.age;
      user.password = req.body.password;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete one user by id
router.route('/delete/:id').delete((req, res) => {
  console.log('deleting');
  User.findByIdAndDelete(req.params.id) 
    .then(() => res.json('User has been deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));

});


module.exports = router;