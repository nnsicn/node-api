const express = require('express');
const router = express.Router();

router.get("/login", (req, res) => {
        console.log("1111");
        res.status(200).send({message:"success"});
    
})

module.exports = router;