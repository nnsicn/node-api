const express = require('express');
const jwt = require('jsonwebtoken');//生成token
const userData = require('../data_source/user.json');//模拟用户数据库
const { addUser } = require('../utils/user.js');
const { generateToken } = require('../utils/token.js');


const router = express.Router();
/**
 * @api {post} /login 登录
 * @apiName login
 * @apiGroup Auth
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiSuccess {Object} data 数据
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Verify that the user name and password are empty
    if (!username || !password) {
        res.status(400).json({error:"The user name or password cannot be empty"})
        return;
    }
    // if user name and password are correct
    const user = userData.find(item => item.username === username && item.password === password);
    if (user) {
        const token = generateToken(user)
        res.status(200).json({data: token})
        return;
    }
    // else return error
    res.status(404).json({error:"The user name or password is incorrect"})

});
// 注册
/**
 * @api {post} /register 注册
 * @apiName register
 * @apiGroup Auth
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiSuccess {Object} data 数据
 */
router.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({error:"The user name or password cannot be empty"})
        return;
    }
    if (userData.find(item => item.username === username)) {
        res.status(400).json({error:"The user name already exists"})
        return;
    }
    const user = {
        userId: (userData.length + 1).toString(),
        username,
        password,
        ...req.body
    }
    addUser(user).then(result => {
        res.send({data: result})
    }, err => {
        res.status(400).json({error: err.message})
    })
})
router.get("/logout", (req, res) => {
    res.send({data:null})
})

module.exports = router;