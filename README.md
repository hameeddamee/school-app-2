# 校园app
> webpack+react全家桶+ant-design+express+mongodb+socket.io 校园app

# 技术栈
- **React16**
- **redux** 管理状态
- **react-redux**
- **react-thunk** 处理异步
- **react-router4** 路由
- **ant-design** 蚂蚁金服UI组件库
- **express**构建服务
- **mongodb** 存储数据
- **scss** 预编译器
- **styled-component** 让样式也能变成组件
- **socket.io**  通信
- **socket.io-client**  socket.io的客户端
- **Ant Motion** 快速在 React 框架中使用动画

# 启动项目
```
# 下载前端依赖
npm install 
# 下载node 依赖
cd server && npm install 
# 连接mongodb (下载好mongodb,配好环境变量)
# 启动react
npm start 
# 启动node服务
npm run server
```
## 如何链接mongodb？
- 默认你已经安装好mongodb,配好mongodb的环境变量，不配也没关系，多打几个路径而已
- 在某一盘符下新建一个boss-mongodb(名字随意)，里面新建data,etc,logs三个文件夹
- data是存放数据的，etc是配置文件，logs是日志
- 在etc下新建mongo.conf
```
# 内容范例
#数据库路径 
dbpath=/home/shoukailiang/Desktop/boss-mongodb/data
# 日志输出文件路径 
logpath=/home/shoukailiang/Desktop/boss-mongodb/logs/mongodb.log
# 错误日志采用追加模式，配置这个选项后mongodb的日志文件会追加到现有的日志文件，而不是重新创建一个文件 
logappend=true

# 过滤一些无用的日志 
quiet=false

# 启动日志文件，默认启动 
journal=true

# 端口号，默认是27017 
port=27018
```
- 需要注意的是：linux和window的文件分隔符是不一样的，pwd打一下就知道了
- 在etc文件里面运行 mongod --config mongo.conf （指定配置文件）
# 目前已经完成的功能

## 正在做的
- 完善页面的美观程度

## 打包
```
# 编译打包后，生成build目录
npm run build
# express中间件，拦截路由，手动渲染index.html
# build设置为静态资源
```

### 打包后怎么启动
- 会发现直接打开index.html是不行的，需要用后端渲染前端html,没有3000这个端口了
- 在更目录下npm run server 
- 打开 localhost:后端端口号/login

## 注意
- 若前端页面npm start报错，下一个redux的chrome插件就好了 `Redux DevTools`
- 若还是报错，全局装一个`nodemon` 

## 未实现的
- 服务端渲染

