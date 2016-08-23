// 加载模型
var Leaflet = require('../../models/leaflet.js');

module.exports = {
    // 单位首页
    index: function* () {
        yield this.render('corporation/index', {
            'title': '单位首页'
        });
    }
};