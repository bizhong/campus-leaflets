// 引用模块
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// 定义用户模式
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
    avatar: { type: String, default: '/upload/avatars/avatar.png' },// 头像
    email: { unique: true, type: String },// 电子邮件
    username: { unique: true, type: String },// 用户名
    sex: { type: String, default: '男' },// 性别
    tel: Number,// 手机号码或电话号码
    belong: { type: String, default: '学生' },// 身份（学生，社团，部门，团队，商店，公司，管理员）
    password: String,// 密码
    state: { type: String, default: '未登录' },// 状态（已登录，未登录）
    collections: [{type: ObjectId, ref: 'Leaflet'}]// 收藏的传单
});
// 定义用户实例方法
UserSchema.methods = {};
    
// 定义用户静态方法，在 Model 层就能使用
UserSchema.statics = {
    // 密码加密
    passwordEncrypt: function(password) {
        return bcrypt.hashSync(password);
    },
    // 密码比较
    passwordCompare: function(password, hash) {
        return bcrypt.compareSync(password, hash);
    },
    // 设置用户状态
    setUserState: function* (id, stateValue) {
        yield this.update({'_id': id}, {$set: {'state': stateValue}});
    }
};

// 编译用户模型
var User = mongoose.model('User', UserSchema);

// 导出用户模型
module.exports = User;