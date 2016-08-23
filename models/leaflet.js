// 引用模块
var mongoose = require('mongoose');

// 定义传单模式
var LeafletSchema = new mongoose.Schema({
    title: { unique: true, type: String },// 标题
    time: Date,// 发布时间
    avatar: String,// 头像
    author: String,// 作者
    belong: String,// 角色
    content: String,// 内容
    images: [{ type: String, paddingBottom: String }]// 传单
});

// 定义传单实例方法
LeafletSchema.methods = {};
    
// 定义传单静态方法，在 Model 层就能使用
LeafletSchema.statics = {};

// 编译传单模型
var Leaflet = mongoose.model('Leaflet', LeafletSchema);

// 导出传单模型
module.exports = Leaflet;