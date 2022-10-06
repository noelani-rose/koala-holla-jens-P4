const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) =>{
    console.log('in koala router GET koalas');
    pool.query(`SELECT * FROM "koalla";`)

        .then((dbRes) =>{
            res.send(dbRes.rows);
        })
        .catch((err) =>{
            console.log('getting koalas failed...', err); 
            res.sendStatus(500);
        }); 
});

// POST


// PUT


// DELETE

module.exports = koalaRouter;