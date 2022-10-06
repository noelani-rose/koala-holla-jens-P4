const { Router } = require('express');
const express = require('express');
const { Pool } = require('pg');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT

 Router.put('/:id', (req, res)=>{
    const readyForTransfer = req.body.transfer;

    let sqlText = `UPDATE "koalla"
                    SET "transfer" = TRUE
                    WHERE "id" = 1;`;

        Pool.query(sqlText, [$1])

        .then((response)=>{
            res.sendStatus(200);
        })
        .catch((error)=>{
            console.log('Error, change to transfer failed', error);
        });



 })










// DELETE

module.exports = koalaRouter;