# 校园传单（Campus Leaflets）

校园传单是一个使用 Node.js、MongoDB、Koa、EJS、MDL、Less、RequireJS 和 Gulp 开发的 Node 应用程序。

## 目录

- [项目介绍](#项目介绍)
- [项目技术](#项目技术)
- [项目功能](#项目功能)
- [本地演示](#本地演示)
- [版权声明](#版权声明)

## 项目介绍

校园传单是一个专门为中南民族大学在校大学生获取传单信息而开发的 Node 应用程序。校园里，随处可见社团招新传单、团队（实验室）招新传单、学校里新开的店铺传单、外面公司兼职传单以及学校各职能部门在群里发的通知。有些单位（社团、部门、团队、商店和公司）为了宣传，在放学路上发传单、拉横幅和喊口号；有些单位在学校墙角上贴传单，这给校园形象带来了很多负面的影响。为此，我就做了这个项目。

有了校园传单，在校大学生就可以通过网络快速获取大量的传单信息，单位（社团、部门、团队、商店和公司）就可以通过发布传单让更多的在校大学生知道。

校园传单，改变单位发传单的方式和在校大学生获取传单信息的方式。

## 项目技术

- 项目运行环境：Node.js

- 数据库：MongoDB

- Web 开发框架：Koa

- 模板：EJS

- 组件库：MDL（Material Design Lite，[https://getmdl.io/][1]）

- CSS 预编译语言：Less

- 模块化工具：RequireJS

- 自动化构建工具：Gulp

- 版本控制：Git、GitHub

## 项目功能

校园传单使用者包括学生、社团、部门、团队、商店、公司和管理员。按照身份，可分为单位（社团、部门、团队、商店和公司）、管理员和学生。另外还有一些学生、单位和管理员都有的功能，把它们归为“公共”。

### 公共（学生、单位和管理员）

- 首页

（未完成）

- 登录

用户点击**登录**，输入电子邮件（或用户名）和密码进行登录。若电子邮件（或用户名）和密码非空、用户在数据库用户表中存在、用户状态为“未登录”、输入电子邮件（或用户名）和密码与数据库用户表中匹配，登录成功。用户状态修改为“已登录”，用户信息存入会话，学生重定向到首页、单位重定向到我的传单（单位首页）页面、管理员重定向到审核单位（管理员首页）页面；否则，重定向到登录页面，重新登录。

用户登录成功，不能通过另一个设备再进行登录。

学生登录：

![学生登录][3]

单位登录：

![单位登录][4]

管理员登录：

![管理员登录][5]

从左到右，依次为未登录、学生登录成功、单位登录成功和管理员登录成功的导航：

![未登录和已登录导航][6]

- 个人信息（或单位信息）

用户点击**个人信息（或单位信息）**，进入个人信息页面。用户可以修改头像、性别、手机号码（或电话号码）和密码，点击**修改**，用户修改信息保存到数据库用户表中，学生重定向到首页、单位重定向到我的传单（单位首页）页面、管理员重定向到审核单位（管理员首页）页面。

（未完成）

- 退出登录

用户点击**退出登录**，即可退出当前帐号。用户状态修改为“未登录”，删除用户信息会话，重定向到首页。

![退出登录][8]

- 搜索

（未完成）

### 单位（社团、部门、团队、商店和公司）

- 单位注册（未注册单位）

单位点击**单位注册**，填写单位信息（单位名称、身份和电子邮件非空，且单位名称和电子邮件之前没被注册），点击**注册**。若点击之后页面显示“单位注册成功”，表示单位注册信息已保存到数据库单位表中，等待管理员审核，点击**首页**，跳转到首页；否则，页面显示“单位注册失败”，点击**单位注册**，再次注册。

![单位注册][10]

单位注册成功：

![单位注册成功][11]

单位注册失败：

![单位注册失败][12]

- 我的传单（已审核通过单位）

（未完成）

- 发布传单（已审核通过单位）

（未完成）

### 管理员

- 审核单位

管理员登录成功后重定向到审核单位（管理员首页）页面，管理员在“未审核单位列表”中选择单位进行审核，点击**审核**，进入审核单位详情页面，填写审核单位结果“通过”或者“不通过”，点击**提交**，返回审核单位（管理员首页）页面。若管理员审核单位结果选择“通过”，单位状态修改为“通过”，单位信息保存到数据库用户表中；否则，删除数据库单位表中的单位记录。系统给注册单位发送一封名为“校园传单单位注册审核结果”的电子邮件。

通过：

![审核单位通过][15]

![审核单位通过邮件][16]

不通过：

![审核单位不通过][17]

![审核单位不通过邮件][18]

- 用户管理

管理员点击**用户管理**，查看已注册的学生列表和已审核通过单位列表。若用户（学生、单位）违反校园传单社区规则，则删除用户信息（单位还要删除发布的所有传单）；否则，不做任何处理。

（未完成）

- 发布公告

管理员点击**发布公告**，发布一篇简短的公告，告诫所以学生要小心违反校园传单的某个单位。

（未完成）

### 学生

- 学生注册

学生点击**学生注册**，填写学生信息（电子邮件、用户名和密码非空，且用户名和电子邮件之前没被注册），点击**注册**。若点击之后页面显示“学生注册失败”，点击**学生注册**，再次注册；否则，学生注册成功，密码加密，学生注册信息保存到数据库用户表中，用户状态修改为“已登录”，用户信息存入会话，重定向到首页。

学生注册成功：

![学生注册成功][21]

学生注册失败：

![学生注册失败][22]

- 我的收藏

（未完成）

## 本地演示

在安装 `Node.js`、`MongoDB` 和 `Git` 的前提下，按照以下步骤：

- 克隆项目（Git Bash）

```git
git clone https://github.com/basfed/campus-leaflets.git
```

- 启动 MongoDB 数据库（命令提示符（CMD））

打开命令提示符（CMD）：快捷键 `Window + R`，输入 `cmd`，按 `enter`。

```cmd
// 我的 MongoDB 安装在 E 盘，请根据自己所安装的目录调整命令
e:
cd MongoDB\bin
mongod.exe --dbpath E:\MongoDB\data\db
```

- 运行 `bin` 目录下用于运行数据库服务器的可执行文件：`mongod.exe`

- 运行 `bin` 目录下用于运行与数据库服务器相连接的客户端的可执行文件：`mongo.exe`

- 安装依赖模块（Git Bash）

```git
npm install
```

- 修改配置（源代码：`config` 目录下的 `smtp.js` 文件）

```javascript
// SMTP Transport 配置
module.exports = {
    // SMTP Transport
    smtpTransport: {
        host: "smtp.qq.com", // 主机
        secure: true, // 使用 SSL
        port: 465, // SMTP 端口
        auth: {
            user: "xxxxxx@qq.com", // 填写你的 QQ 电子邮箱
            pass: "xxxxxx" // 填写你的 QQ 电子邮箱对应的密码
        }
    }
};
```

- 执行 `app.js` 脚本（Git Bash）

```git
node --harmony app
```

- 演示（浏览器：Chrome、Firefox、IE 10+ 等）

地址栏输入：`localhost:3000`

## 版权声明

校园传单（Campus Leaflets）项目归兰必钟一人所有。

  [1]: https://getmdl.io/
  [3]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/student-login.gif
  [4]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/corporation-login.gif
  [5]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/admin-login.gif
  [6]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/nav.png
  [8]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/admin-logout.gif
  [10]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/corporation-register.gif
  [11]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/corporation-register-succeed.png
  [12]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/corporation-register-failed.png
  [15]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/admin-verifycorporation-yes.gif
  [16]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/admin-verifycorporation-yes-email.png
  [17]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/admin-verifycorporation-no.gif
  [18]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/admin-verifycorporation-no-email.png
  [21]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/student-register-succeed.gif
  [22]: https://github.com/basfed/campus-leaflets/blob/master/screenshot/student-register-failed.png