const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const {getToken} = require('./utils/token');

const test = require(path.join(__dirname, 'router', 'test'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/test',test);

// 批量导入router
const routers = fs.readdirSync(path.join(__dirname, 'router'));
routers.forEach(router => {
    const routerModule = require(path.join(__dirname, 'router', router));
    app.use('/api', (req, res, next) => {
      console.log(22222);
      if (req.url.includes("login")) {
        // 登录接口不需要验证 token，直接进入下一个中间件
        next();
      } else {
        // 验证 token
        const token = req.headers.authorization;
        if (token) {
          const tokenData = getToken();
          let {token_create_time,token_value}= tokenData;
          if(token_value!== token){
            // token 错误，返回错误响应
            return res.status(401).json({ error: 'token error' });
          }
          if(Date.now() - token_create_time > 1000 * 60 * 60 * 24 * 7){
            // token 过期，返回错误响应
            return res.status(401).json({ error: 'token expired' });
          }
          // token 有效，进入下一个中间件
          next();
        } else {
          // token 无效，返回错误响应
          res.status(401).json({ error: 'Invalid token' });
        }
      }
    });
  
    // 使用对应的路由模块
    app.use('/api', routerModule);
    // app.use('/api', (req,res,next)=>{
    //   console.log(req.url);
    //   if(req.url.includes("login")){
    //     next()
    //   }else{

    //   }
    // });
});


app.listen(3000, () => {
   console.log('Server is running on port 3000');
}); 