const express = require('express');
let Soldier = require('../model/soldier.model');
const router = express.Router();

//get all userss
router.route('/').get((req, res) => {
  Soldier.find().populate('parentId', 'name')
    .then(soldiers => res.json(soldiers))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:sort').get((req, res) => {
  let sort = {};
  if (req.params.sort === 'nameasc') {
    sort = { name: 1 };
  } else if (req.params.sort === 'namedesc') {
    sort = { name: -1 };
  } else if (req.params.sort === 'sexasc') {
    sort = { sex: 1 };
  } else if (req.params.sort === 'sexdesc') {
    sort = { sex: -1 };
  } else if (req.params.sort === 'parentasc') {
    sort = { parentId: 1 };
  } else if (req.params.sort === 'parentdesc') {
    sort = { parentId: -1 };
  }

  Soldier.find().sort(sort)
    .then(soldiers => res.json(soldiers))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get one user by id
router.route('/:id').get((req, res) => {
  Soldier.findById(req.params.id)
    .then(soldier => res.json(soldier))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get all children of one user
router.route('/:id/children').get((req, res) => {
  Soldier.findById(req.params.id)
    .then(soldier => {
      soldier.getChildren()
        .then(children => res.json(children))
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//get direct children of one user
router.route('/:id/dirchildren').get((req, res) => {
  Soldier.find({ parentId: req.params.id })
    .then(soldiers => { res.json(soldiers) })
    .catch(err => res.status(400).json('Error: ' + err));
});

//create new user
router.route('/create').post((req, res) => {
  const { /*img,*/ name, sex, parent/*, startDate, phone, rank, email*/ } = req.body;
  const newSoldier = new Soldier({
    // img,
    name,
    sex,
    /*startDate,
    phone,
    rank,
    email*/
  });
  //newSoldier.parent = Soldier.findById(parent);
  if (!parent)
    newSoldier.save()
      .then(() => res.json('Soldier has been created.'))
      .catch(err => res.status(400).json('Error: ' + err));

  if (parent) {
    Soldier.findById(parent)
      .then(soldier => {
        soldier.appendChild(newSoldier);
      })
      .then(() => res.json('Soldier has been created.'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

//edit one user by id
router.route('/edit/:id').post((req, res) => {
  Soldier.findById(req.params.id)
    .then(soldier => {
      soldier.name = req.body.name;
      soldier.sex = req.body.sex;
      soldier.parentId = req.body.parent;
      /*soldier.startDate = req.body.startDate;
      soldier.phone = req.body.phone;
      soldier.rank = req.body.rank;
      soldier.email = req.body.email;
      soldier.parent = Soldier.findById(req.body.parent);*/
      soldier.save()
        .then(() => res.json('Soldier updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete one user by id
router.route('/delete/:id').delete((req, res) => {
  console.log('deleting');
  Soldier.Remove({ _id: req.params.id })
    .then(() => res.json('Soldier has been deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;