
const fs = require('fs');//导入fs模块
const rs = fs.createReadStream("../book/15576.txt");//创建读取流
const ws = fs.createWriteStream("./write.txt");//创建写入流
// 监听data事件
// rs.pause();//暂停读取流
let index = 1;
rs.on('data',(chunk)=>{
    index++;
    // let data = chunk.toString();//将Buffer转换为字符串
    // if(!ws.write(chunk))return rs.pause();//如果写入流没有写满，则暂停读取流
    rs.pause();
    // ws.write(chunk)
    ws.write(chunk,()=>{
        rs.resume();
    });
})
// 监听end事件,事件将在流中再没有数据可供消费时触发。只有在数据被完全消费后 才会触发
rs.on('end',(arg)=>{
    ws.end("\nGoodbye")
});
// 当可写流的缓冲区已经排空，可以继续写入数据时触发。
ws.on('drain', function () {
    // rs.resume();//重新开始读取流
});
// rs.resume();//重新开始读取流