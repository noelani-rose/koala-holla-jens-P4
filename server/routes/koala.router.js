const { Router } = require('express');
const express = require('express');
const { Pool } = require('pg');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT

 Router.put('/:id', (req, res)=>{
   

    let sqlText = `UPDATE "koalla"
                    SET "transfer" = TRUE
                    WHERE "id" = $1;`;



        Pool.query(sqlText, [req.params.id])

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