const express = require('express');
const bodyParse = require('body-parser');
const cookieParse = require('cookie-parser')
const userRoute = require('./user');
const app = express();
// work with express socket.io和express绑定在一起
const server = require('http').Server(app);
const io = require('socket.io')(server)
app.use(cookieParse());
app.use(bodyParse.json())

// 监听到连接，参数socket指的是当前这次连接的socket,请求，io是指全局的请求
// io是全局的请求，socket是当前这次连接的请求
io.on('connection', (socket) => {
  console.log('user login')
  //监听客户端的sendmsg事件，处理传递过来的参数
  socket.on('sendmsg', (data) => {
    // console.log(data)
    // 把data广播到全局
    io.emit('recvmsg', data)
  })
})

app.use('/user', userRoute)
server.listen(9999, () => {
  console.log("服务开启在9999");
})