const router = require('express').Router();
const db = require('../db/db.json'); 
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    res.json(db);
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();
    db.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(db, null, 4), function (err) {
        if (err) console.log("Error writing file:", err);
        res.json(db);
    })
});

router.delete('/notes/:id', (req, res) => {
    const DBid = req.params.id;
    db.splice(DBid, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 4));
    res.json(req.body);
})

module.exports = router;