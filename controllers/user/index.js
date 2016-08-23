// 加载模型
var Leaflet = require('../../models/leaflet.js');

module.exports = {
    // 首页
    index: function* () {
        try {
            var leaflets = yield Leaflet.find({}).sort({'_id': -1}).limit(12);

            yield this.render('index', {
                'title': '校园传单',
                'leaflets': leaflets
            });
        } catch(e) {
            this.body = '首页加载失败';
            console.log(e);
        }
    }
};