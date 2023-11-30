const path = require('path');
const fs = require('fs');
console.log(path.normalize("/foo/bar//baz/asdf/quux/.."));
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}
travel("../demo",(pathname)=>{
    console.log(pathname);
})