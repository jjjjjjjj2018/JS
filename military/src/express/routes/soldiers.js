const express = require('express');
let Soldier = require('../model/soldier.model');
const router = express.Router();

//get all userss
router.route('/').get((req, res) => {
  Soldier.find().populate('parentId', 'name')
    .then(soldiers => res.json(soldiers))
    .catch(err => res.status(400).json('Error: ' + err));
});

//backend search
router.route('/search/:search').get((req, res) => {
  Soldier.find()
    .then(soldiers => {
      
        const results = soldiers.filter((value) => {
          return value.name.includes(req.params.search) ||
            value.sex.includes(req.params.search) || value.rank.includes(req.params.search) ||
            value.email.includes(req.params.search);
        });
      res.json(results);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//backend sort 
router.route('/sort/:sort/page/:page').get((req, res) => {
  let sort = {};
  if (req.params.sort === '_iddesc') {
    sort = { _id: 1 }
  } else if (req.params.sort === '_idasc') {
    sort = { _id: -1 };
  } else if (req.params.sort === 'nameasc') {
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
  } else if (req.params.sort === 'rankasc') {
    sort = { rank: 1 };
  } else if (req.params.sort === 'rankdesc') {
    sort = { rank: -1 };
  }
  console.log(req.params.page)
  Soldier.find().populate('parentId', 'name').sort(sort).skip(req.params.page * 5).limit(100)
    .then(soldiers => res.json(soldiers))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get one user by id
router.route('/one/:id').get((req, res) => {
  Soldier.findById(req.params.id).populate('parendId', 'name')
    .then(soldiers => res.json(soldiers))
    .catch(err => res.status(400).json('Error: ' + err));
});


//get possible parent of one soldier
router.route('/:id/availableParent').get((req, res) => {
  Soldier.find({ _id: { $ne: req.params.id } }).populate('parentId', 'name')
    .then(soldiers => {
      const parents = soldiers.filter((value) => {
        return !value.path.includes(req.params.id);
      });

      res.json(parents);
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
  const { avatar, name, sex, parentId, rank, email } = req.body;

  const newSoldier = new Soldier({
    avatar,
    name,
    sex,
    rank,
    email,
    numOfChildren: 0
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
  Soldier.findById(req.params.id)
    .then(newSoldier => {
      if (newSoldier.parentId)
        Soldier.findById(newSoldier.parentId.toString())
          .then(oldParent => {
            oldParent.numOfChildren--;
            oldParent.save();
          });

      newSoldier.name = req.body.name;
      newSoldier.sex = req.body.sex;
      newSoldier.rank = req.body.rank;
      newSoldier.email = req.body.email;
      if (req.body.parentId) {
        console.log(req.body.parentId);
        Soldier.findById(req.body.parentId)
          .then(parent => {
            parent.appendChild(newSoldier);
            parent.numOfChildren++;
            parent.save();
          });
        newSoldier.parentId = req.body.parentId;
      }
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
      if (soldier.parentId !== null) {
        Soldier.findById(soldier.parentId.toString())
          .then(parent => {
            if (parent) {
              parent.numOfChildren -= 1;
              parent.save();
            }
          })
      }
      if (soldier.numOfChildren > 0) {
        Soldier.updateMany({ parentId: req.params.id }, { parentId: null })
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