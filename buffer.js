// JS语言自身只有字符串数据类型，没有二进制数据类型，因此NodeJS提供了一个与String对等的全局构造函数Buffer来提供对二进制数据的操作。
// 除了可以读取文件得到Buffer的实例外，还能够直接构造,
const buf = Buffer.alloc(2);
const buf1 = Buffer.from(buf);
buf1[0] = 1;
console.log(buf);
console.log(buf1);