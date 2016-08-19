// 加载模型
var Leaflet = require('../../models/leaflet.js');

module.exports={
    index: function *() {
        yield this.render('admin/index', {
            title: '管理员首页'
        });
    }
};