// 加载模型
var Corporation = require('../../models/corporation.js');

module.exports = {
    // 审核单位（管理员首页）
    index: function* () {
        try {
            // 查询未审核单位
            var result = yield Corporation.find({'state': '未审核'}).sort({'_id': -1});

            yield this.render('admin/index', {
                'title': '审核单位',
                'result': result
            });
        } catch(e) {
            this.body = '审核单位页面加载失败';
            console.log(e);
        }
    },
    // 审核单位详情
    verify: function* () {
        try {
            var id = this.params.id;// 单位 ID

            // 查询符合条件的第一条单位记录
            var result = yield Corporation.findOne({'_id': id});

            yield this.render('admin/verify', {
                'title': '审核单位详情',
                'result': result
            });
        } catch(e) {
            this.body = '审核单位详情页面加载失败';
            console.log(e);
        }
    },
    // 审核单位处理
    doVerify: function* () {
        try {
            var result = this.request.body;
            var id = result._id;// 单位 ID
            var state = result.state;// 审核结果

            // 重定向到审核单位页面
            this.redirect('/admin/');
        } catch(e) {
            this.body = '审核单位处理失败';
            console.log(e);
        }
    }
};