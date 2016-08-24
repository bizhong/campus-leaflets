// 模型
var User = require('../../models/user.js');

module.exports = {
    // 个人信息
    personal: function* () {
        try {
            var user = this.session.user;
            var id = user._id;// ID
            var password = user.password;// 密码

            // 查询符合条件的第一条用户记录
            var result = yield User.findOne({'_id': id});

            // 密码解密
            result.password = password;

            yield this.render('user/personal', {
                'title': '个人信息',
                'personal': result
            });
        } catch(e) {
            this.body = "个人信息页面加载失败";
            console.log(e);
        }
    },
    // 修改个人信息
    modifyPersonal: function* () {
        try {
            var user = this.request.body;

            this.body = JSON.stringify(user);
        } catch(e) {
            this.body = '修改个人信息失败';
            console.log(e);
        }
    }
};