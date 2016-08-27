// 模型
var User = require('../../models/user.js');

module.exports = {
    // 退出登录
    check: function* () {
        try {
            var varname = this.query.name,// 变量名（email 或 username）
                value = this.query.value,// 电子邮件（或用户名）
                scName = varname === "email" ? '电子邮件' : '用户名';// 简体中文名

            if (varname === 'email') {// 变量名是 email
                // 查询符合电子邮件的所有用户记录
                var result = yield User.find({'email': value});
            } else {// 变量名是 username
                // 查询符合用户名的所有用户记录
                var result = yield User.find({'username': value});
            }

            if (result.length === 0) {
                this.body = scName + '可用';
            } else {
                this.body = scName + '不可用';
            }
        } catch(e) {
            this.body = "注册检查失败";
            console.log(e);
        }
    }
};