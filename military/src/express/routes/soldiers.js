const express = require('express');
let Soldier = require('../model/soldier.model');
const router = express.Router();

//get all userss
router.route('/:page').get((req, res) => {
  Soldier.find().populate('parentId', 'name')/*.skip(req.params.page * 3).limit(3)*/
    .then(soldiers => res.json(soldiers))
    .catch(err => res.status(400).json('Error: ' + err));
});

//backend search
router.route('/search/:search').get((req, res) => {
  Soldier.find({ $text: { $search: `${req.params.search}` } }).populate('parentId', 'name')
    .then(soldiers => res.json(soldiers))
    .catch(err => res.status(400).json('Error: ' + err));
});

//backend sort 
router.route('/sort/:sort').get((req, res) => {
  let sort = {};
  if (req.params.sort === 'nameasc') {
    sort = { name: 1 };
  } else if (req.params.sort === 'namedesc') {
    sort = { name: -1 };
  } else if (req.params.sort === 'sexasc') {
    sort = { sex: 1 };
  } else if (req.params.sort === 'sexdesc') {
    sort = { sex: -1 };
  } else if (req.params.sort === 'emailasc') {
    sort = { email: 1 };
  } else if (req.params.sort === 'emaildesc') {
    sort = { email: -1 };
  }
  Soldier.find().populate('parentId', 'name').sort(sort)
    .then(soldiers => res.json(soldiers))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get one user by id
router.route('/:id').get((req, res) => {
  Soldier.findById(req.params.id).populate('parendId', 'name')
    .then(soldiers => res.json(soldiers))
    .catch(err => res.status(400).json('Error: ' + err));
});


//get possible parent of one soldier
router.route('/:id/availableParent').get((req, res) => {
  Soldier.find({ "path": { "$not": { "$all": [req.params.id] } } })
    .then(soldiers => res.json(soldiers))
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
  const { avatar, name, sex, parentId, rank, email } = req.body;
  const numOfChildren = 0;
  const newSoldier = new Soldier({
    avatar,
    name,
    sex,
    rank,
    email,
    numOfChildren
  });
  //newSoldier.parent = Soldier.findById(parent);
  if (!parentId)
    newSoldier.save()
      .then(() => res.json('Soldier has been created.'))
      .catch(err => res.status(400).json('Error: ' + err));

  if (parentId) {
    Soldier.findById(parentId)
      .then(soldier => {
        soldier.appendChild(newSoldier);
        soldier.numOfChildren++;
        soldier.save();
      })
      .then(() => res.json('Soldier has been created.'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

//edit one user by id
router.route('/edit/:id').post((req, res) => {
  Soldier.findById(req.params.id).populate('parentId', '_id')
    .then(newSoldier => {
      console.log(newSoldier);
      if (newSoldier.parentId && parentId._id !== req.body.parentId._id) {
        console.log(parentId._id);
        Soldier.findById(parentId._id)
          .then(
            parent => {
              parent.numOfChildren--;
              parent.save();
            }
          )
      }
      //newSoldier.parentId = req.body.parent;
      //soldier.startDate = req.body.startDate;
      //soldier.phone = req.body.phone;
      newSoldier.name = req.body.name;
      newSoldier.sex = req.body.sex;
      newSoldier.rank = req.body.rank;
      newSoldier.email = req.body.email;
      if (req.body.parentId && req.body.parnetId._id !== parentId._id) {
        Soldier.findById(req.body.parentId._id)
          .then(soldier => {
            soldier.appendChild(newSoldier);
            soldier.numOfChildren++;
            soldier.save();
          })
      }
      console.log(newSoldier);
      newSoldier.save()
        .then(() => res.json('Soldier updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete one user by id
router.route('/delete/:id').delete((req, res) => {
  Soldier.findById(req.params.id)
    .then(soldier => {
      if (soldier.parentId) {
        Soldier.findById(soldier.parentId._id)
          .then(parent => {
            parent.numOfChildren--;
            parent.save();
          })
      }
      if (soldier.numOfChildren > 0) {
        if (soldier.numOfChildren = 1) {
          Soldier.find({ parentId: req.params.id })
            .then(child => {
              child.parentId = null;
              children.path = null;
              child.save();
            })
        } else if (soldier.numOfChildren > 1) {
          Soldier.find({ parentId: req.params.id })
            .then(children => {
              for (child of children) {
                child.parentId = null;
                children.path = null;
                child.save();
              }
            })
        }
      }
    })
    .then(
      Soldier.findByIdAndDelete(req.params.id)
        .then(() => res.json('Soldier has been deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
    )
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;