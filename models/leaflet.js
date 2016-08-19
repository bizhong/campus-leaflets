// 引用模块
var mongoose = require('mongoose');

// 定义传单模式
var LeafletSchema = new mongoose.Schema({
    title: {// 标题
        unique: true,
        type: String
    },
    time: Date,// 发布时间
    avatar: String,// 头像
    author: String,// 作者
    belong: String,// 角色
    images: [{
        type: String,
        width: String,
        height: String
    }],
    content: String// 内容
});

// 编译传单模型
var Leaflet = mongoose.model('Leaflet', LeafletSchema);

// 导出传单模型
module.exports = Leaflet;