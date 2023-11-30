// 引入fs,path用来新增用户
const fs = require('fs');
const path = require('path');
let userData = require('../data_source/user.json');


exports.addUser = (user) => {
    return new Promise((resolve, reject) => {
        if (!user) reject({ message: "User does not exist" });
        userData.push(user);
        fs.writeFileSync(path.join(__dirname, '../data_source/user.json'), JSON.stringify(userData));
        resolve(user);
    })
}
exports.deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        if (userData.some(item => item.userId === userId)) {
            userData = userData.filter(item => item.userId !== userId);
            fs.writeFileSync(path.join(__dirname, '../data_source/user.json'), JSON.stringify(userData));
            resolve(userData);
        } else {
            reject({ message: "User does not exist" });
        }
    })
}
exports.getUser = (userId) => {
    return new Promise((resolve, reject) => {
        const user = userData.find(item => item.userId === userId)
        if (user) {
            resolve(user);
        } else {
            reject({ message: "User does not exist" });
        }
    })
}