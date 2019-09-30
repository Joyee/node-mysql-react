<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [node + MySQL + React 构建一个简单的用户管理系统](#node--mysql--react-%E6%9E%84%E5%BB%BA%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# node + MySQL + React 构建一个简单的用户管理系统

1. 安装Mysql, Navicat Premium
2. 配置，连接数据库
3. 写接口
4. 前端界面

### 技术栈

### 前端
> * react
> * react-dom
> * Ant Design(基于React UI组件库)

### 后台
> * MySQL
> * Node.js
> * koa, koa-cors, koa-router, koa-body
> * axios
> * sequelize

### 安装
```
npm install
```

### 启动方式

> * 前端
```
npm start
```

> * 服务端
```
node server/app.js
```

### 目录结构


├── README.md
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── scripts
├── server
│   ├── app.js
│   ├── config.js
│   ├── model
│   └── routers
├── src
│   ├── App.css
│   ├── App.js
│   ├── config.js
│   ├── index.css
│   ├── index.js
│   └── registerServiceWorker.js
└── yarn.lock

### 下载并且安装 Mysql
在[mysql](http://www.mysql.com)官网 进入 download (https://dev.mysql.com/downloads/mysql/)
mac选择: macOS 10.14 (x86, 64-bit), DMG Archive

安装成功后，开启mysql. (系统偏好设置-> 底部 MySQL)

在终端输入
```
PATH="$PATH":/usr/local/mysql/bin
```

#### 常用命令
```
登录mysql

mysql -u root -p

显示端口号
show global variables like 'port'
```
### 下载 安装 navicat(找破解版的)
新建连接 -> 自己定义一个 连接名，输入密码，可以修改用户名(我这里使用默认的)
