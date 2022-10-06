const express = require('express');
const router = require('../modules/pool');
const koalaRouter = express.Router();

// DB CONNECTION



// GET


// POST
koalaRouter.post('/', (req, res) => {
    console.log('req.body', req.body);

    const sqlText = `
    INSERT INTO "koalla" ("name", "age", "gender", "notes")       -- these are placeholders for sqlParams
    VALUES
        ($1, $2, $3, $4);
    `;
    const sqlParams = [
        req.body.name,        // $1  
        req.body.age,         // $2
        req.body.gender,     // $3
        req.body.notes,       // $4
    ];
    console.log('sqlText', sqlText);

    pool.query(sqlText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(201); // 👍
        })
        .catch((err) => {
            console.log('POST failed', err);
            res.sendStatus(500);
        })
});

// PUT


// DELETE

module.exports = koalaRouter;