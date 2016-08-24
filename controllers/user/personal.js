// 模型
var User = require('../../models/user.js');

module.exports = {
    // 个人信息
    personal: function* () {
        try {
            var id = this.session.user._id;

            // 查询符合条件的第一条用户记录
            var result = yield User.findOne({'_id': id});

            // 密码解密
            // yield result.password = ;

            yield this.render('user/personal', {
                'title': '个人信息',
                'personal': result
            });
        } catch(e) {
            this.body = "个人信息页面加载失败";
            console.log(e);
        }
    }
};