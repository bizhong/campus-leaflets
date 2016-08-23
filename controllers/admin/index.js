// 加载模型
var Leaflet = require('../../models/leaflet.js');

module.exports = {
    // 管理员首页
    index: function* () {
        yield this.render('admin/index', {
            'title': '管理员首页'
        });
    }
};