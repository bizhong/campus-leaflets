// 模型
var User = require('../../models/user.js');

module.exports = {
    // 退出登录
    logout: function* () {
        try {
            var id = this.state.user._id;// this.session.user._id
            
            // 设置用户状态为“未登录”
            yield User.setUserState(id, '未登录');

            // 删除用户信息会话
            this.session.user = null;

            // 重定向到首页
            this.redirect('/');
        } catch(e) {
            this.body = "退出登录失败";
            console.log(e);
        }
    }
};