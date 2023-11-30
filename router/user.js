const express = require('express');
const router = express.Router();
const { deleteUser,getUser } = require('../utils/user.js');

// 例:/user/2
/**
 * @desc 删除用户
 * @param {string} userId 用户id
 * @return {json}
 */
router.delete("/user/:userId", (req, res) => {
    const { userId } = req.params;
    if (userId) {
        deleteUser(userId).then(result => {
            res.send({
                "code": 200,
                "success": true,
                "message": null,
                "data": null
            });
        }, err => {
            res.status(400).send({
                "code": 400,
                "success": false,
                "message": err.message,
                "data": null
            });
        })
    } else {
        res.status(500).send({error: "Invalid user id"});
    }
})
// 例:/user?userId=1
/**
 * @desc 获取用户
 * @query {string} userId 用户id
 * @return {json}
 */
router.get("/user", (req, res) => {
    const { userId } = req.query;
    if (userId) {
        getUser(userId).then(result => {
            res.send({
                "code": 200,
                "success": true,
                "message": null,
                "data": result
            });
        }, err => {
            res.status(400).json({error: err.message})
        })
    }
    else{
        res.status(500).send({error: "Invalid user id"});
    }
})

module.exports = router;