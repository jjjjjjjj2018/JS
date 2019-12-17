const express = require('express');
const router = express.Router();
let lists = {
    'mylist': [
        {
            'title': 'Futurama',
            'id': 1,
            'img': 'http://cdn1.nflximg.net/webp/7621/3787621.webp'
        },
        {
            'title': 'The Interview',
            'id': 2,
            'img': 'http://cdn1.nflximg.net/webp/1381/11971381.webp'
        },
        {
            'title': 'Gilmore Girls',
            'id': 3,
            'img': 'http://cdn1.nflximg.net/webp/7451/11317451.webp'
        }
    ],
    'recommendations': [
        {
            'title': 'Family Guy',
            'id': 4,
            'img': 'http://cdn5.nflximg.net/webp/5815/2515815.webp'
        },
        {
            'title': 'The Croods',
            'id': 5,
            'img': 'http://cdn3.nflximg.net/webp/2353/3862353.webp'
        },
        {
            'title': 'Friends',
            'id': 6,
            'img': 'http://cdn0.nflximg.net/webp/3200/9163200.webp'
        }
    ]
}



//get all list items
router.route('/').get((req, res) => {
    res.status(200).json(lists);
});

//remove from mylist to recommendations
router.route('/remove/:id').put((req, res) => {
    for (let i = 0; i < lists.mylist.length; i++) {
        if (lists.mylist[i].id === parseInt(req.params.id)) {
            lists.recommendations.push(lists.mylist[i]);
            lists.mylist.splice(i, 1);
            break;
        }
        else {
            res.status(400).json('item not found');
        }
    }
    res.status(200);
});

//add recommendations to mylist
router.route('/add/:id').put((req, res) => {
    for (let i = 0; i < lists.recommendations.length; i++) {
        if (lists.recommendations[i].id === parseInt(req.params.id)) {
            lists.mylist.push(lists.mylist[i]);
            lists.recommendations.splice(i, 1);
            break;
        }
        else {
            res.status(400).json('item not found');
        }
    }
    res.status(200);
});

module.exports = router;