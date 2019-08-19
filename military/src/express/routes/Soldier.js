const express = require('express');
let Soldier = require('../model/soldier.model');
const router = express.Router();

//get all users
router.route('/').get((req, res) => {
  Soldier.find()
    .then(soldiers => res.json(soldiers))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get one user by id
router.route('/:id').get((req, res) => {
  Soldier.findById(req.params.id)
    .then(soldier => res.json(soldier))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get one user's children
router.route('/:id/parent').get((req, res) => {
  Soldier.findById(req.params.id)
    .getChildren(children => res.json(children))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get one user's parent
router.route('/:id/children').get((req, res) => {
  Soldier.findById(req.params.id)
    .populate('parent')
    .then(soldier => res.json(soldier.parent))
    .catch(err => res.status(400).json('Error: ' + err));
});

//create new user
router.route('/create').post((req, res) => {
  const { img, name, sex, startDate, phone, rank, email, parent } = req.body;
  const newSoldier = new Soldier({
    img,
    name,
    sex,
    startDate,
    phone,
    rank,
    email
  });
  newSoldier.parent = Soldier.findById(parent);
  await newSoldier.save()
    .then(() => res.json('User has been created.'))
    .catch(err => res.status(400).json('Error: ' + err));


});

//edit one user by id
router.route('/edit/:id').post((req, res) => {
  Soldier.findById(req.params.id)
    .then(soldier => {
      soldier.name = req.body.name;
      soldier.sex = req.body.sex;
      soldier.startDate = req.body.startDate;
      soldier.phone = req.body.phone;
      soldier.rank = req.body.rank;
      soldier.email = req.body.email;
      soldier.parent = Soldier.findById(req.body.parent);
      await soldier.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete one user by id
router.route('/delete/:id').delete((req, res) => {
  console.log('deleting');
  const id = req.params.id;
  Soldier.findOneAndUpdate({ parent: id }, { parent: null })
    .then(() => {
      Soldier.findByIdAndDelete(req.params.id)
        .then(() => res.json('User has been deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});


module.exports = router;