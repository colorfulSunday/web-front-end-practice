const http = require("http");
const querystring = require('querystring')
let fs=require("fs");

let mime={
    '.html':'text/html',
    '.js':'application/javascript',
    '.css':'text/css'
}

var server = http.createServer();
//    注册 request 请求事件
//    当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调处理函数
// request 请求事件处理函数，需要接收两个参数：
//    Request 请求对象
//        请求对象可以用来获取客户端的一些请求信息，例如请求路径
//    Response 响应对象
//        响应对象可以用来给客户端发送响应消息
server.on("request", function (request, response) {
    // http://127.0.0.1:3000/ /
    // http://127.0.0.1:3000/a /a
    // http://127.0.0.1:3000/foo/b /foo/b
    if(request.url === "/render.do"){
        let data = [];
        request.on('data', chunk => {
            data.push(querystring.parse(chunk.toString()));  // 将接收到的数据暂时保存起来
        });
        request.on('end', () => {
            response.setHeader("Content-Type","text/html");
            response.setHeader("Access-Control-Allow-Origin","*");
            //跨域允许的header类型
            response.setHeader("Access-Control-Allow-Headers","Content-type,Content-Length,Authorization,Accept,X-Requested-Width");
            //跨域允许的请求方式
            response.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

            //使用webpack 编译 传过来的vue代码
            var url = build(data[0]);

            response.write(url);
            response.end();
        });
    }else{
        if(fs.existsSync(`.${request.url}`)) {
            response.setHeader('Content-Type',mime[request.url.match(/\.\w+$/)[0]] +';charset=utf-8');
            fs.createReadStream(`.${request.url}`).pipe(response);
        }else{
            response.statusCode=404;
            response.end();
        }
    }
});

server.listen(8080, function () {
    console.log("服务器启动成功了，可以通过 http://127.0.0.1:8080/ 来进行访问");
});

function build(content){
    //1 将vue代码写入一个 .vue文件

    //2 执行webpack命令 编译.vue文件

    //3 将编译后的文件路径返回
    return "week03/index2.html";
}
