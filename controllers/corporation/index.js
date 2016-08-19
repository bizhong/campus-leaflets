// 加载模型
var Leaflet = require('../../models/leaflet.js');

module.exports={
    index: function *() {
        yield this.render('corporation/index', {
            title: '单位首页'
        });
    }
};