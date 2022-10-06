const { Router } = require('express');
const express = require('express');
const { Pool } = require('pg');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) =>{
    console.log('in koala router GET koalas');
    pool.query(`SELECT * FROM "koalla";`)

        .then((dbRes) =>{
            console.log('getting koalas result', dbRes.rows);
            res.send(dbRes.rows);
        })
        .catch((err) =>{
            console.log('getting koalas failed...', err); 
            res.sendStatus(500);
        }); 
});

// POST


// PUT

 koalaRouter.put('/:id', (req, res)=>{
   

    let sqlText = `UPDATE "koalla"
                    SET "transfer" = TRUE
                    WHERE "id" = $1;`;

                    
        pool.query(sqlText, [req.params.id])

        .then((response)=>{
            res.sendStatus(200);
        })
        .catch((error)=>{
            console.log('Error, change to transfer failed', error);
            res.sendStatus(500);
        });

 });



// DELETE

module.exports = koalaRouter;