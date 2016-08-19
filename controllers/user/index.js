// 加载模型
var Leaflet = require('../../models/leaflet.js');

module.exports={
    //首页
    // index: function *() {
    //     try {
    //         var leaflets = yield Leaflet.find({}).sort({_id:-1});
    //         // if (this.session.username) {
    //         //     var username = this.session.username;
    //         // }
    //         yield this.render('index', {
    //             title: '校园传单',
    //             // username: username,
    //             leaflets: leaflets
    //         });
    //     } catch(e) {
    //         this.body = '加载错误';
    //         console.log(e);
    //     }
    // }
    index: function *() {
        yield this.render('index', {
            title: '校园传单'
        });
    }
};