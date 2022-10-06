const express = require('express');
const router = require('../modules/pool');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION



// GET
koalaRouter.get('/', (req, res) =>{
    //console.log('in koala router GET koalas');
    pool.query(`SELECT * FROM "koalla";`)

        .then((dbRes) =>{
           // console.log('getting koalas result', dbRes.rows);
            res.send(dbRes.rows);
        })
        .catch((err) =>{
            console.log('getting koalas failed...', err); 
            res.sendStatus(500);
        }); 
});

// POST
koalaRouter.post('/', (req, res) => {
    console.log('req.body', req.body);

    const sqlText = `
    INSERT INTO "koalla" ("name", "age", "gender", "notes", "transfer")       -- these are placeholders for sqlParams
    VALUES
        ($1, $2, $3, $4, $5);
    `;
    const sqlParams = [
        req.body.name,        // $1  
        req.body.age,         // $2
        req.body.gender,     // $3
        req.body.notes,       // $4
        req.body.transfer       // $5
    ];
    console.log('sqlText', sqlText, req.body.transfer);

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