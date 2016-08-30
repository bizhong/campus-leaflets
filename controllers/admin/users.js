// 加载模型
var User = require('../../models/user.js');

module.exports = {
    // 用户管理
    userList: function* () {
        try {
            // 查询单位（社团，部门，团队，商店，公司）
            var corporations = yield User.find({$or: [{'belong': '社团'}, {'belong': '部门'}, {'belong': '团队'}, {'belong': '商店'}, {'belong': '公司'}]}).sort({'_id': -1});

            // 查询学生
            var students = yield User.find({'belong': '学生'}).sort({'_id': -1});

            yield this.render('admin/users', {
                'title': '用户管理',
                'corporations': corporations,
                'students': students
            });
        } catch(e) {
            this.body = '用户管理页面加载失败';
            console.log(e);
        }
    },
    // 删除用户
    deleteUser: function* () {
        try {
            var id = this.params.id;// 用户 ID

            // 删除用户
            yield User.remove({'_id': id});

            // 重定向到用户管理页面
            this.redirect('/admin/users/');
        } catch(e) {
            this.body = '删除用户失败';
            console.log(e);
        }
    }
};