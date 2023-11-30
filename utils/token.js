const fs = require('fs');
const path = require("path");
const jwt = require('jsonwebtoken');//生成token
const { secretKey } = require('../data_source/config.js');//秘钥
const token_data = require("../data_source/token.json");
let {token_create_time,token_update_time} = token_data;
exports.getToken = ()=>{
    const token_data = fs.readFileSync(path.join(__dirname,"../data_source/token.json")).toString();
    return JSON.parse(token_data);
}
exports.updateToken = (user)=>{
    generateToken(user);
}
exports.generateToken = (user)=>{
    const token = jwt.sign(user.userId, secretKey);
    let create_time = new Date().getTime(),update_time = new Date().getTime();
    fs.writeFileSync(path.join(__dirname,"../data_source/token.json"),JSON.stringify({
        token_value:token,
        token_create_time:create_time,
        token_update_time:update_time
    }));
    return token;
}