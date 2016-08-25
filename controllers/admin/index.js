// 加载模型
var Corporation = require('../../models/corporation.js');

module.exports = {
    // 管理员首页
    index: function* () {
        try {
            // 查询未审核单位
            var result = yield Corporation.find({'state': '未审核'}).sort({'_id': -1});

            yield this.render('admin/index', {
                'title': '审核单位',
                'result': result
            });
        } catch(e) {
            this.body = '未审核单位页面加载失败';
            console.log(e);
        }
    }
};