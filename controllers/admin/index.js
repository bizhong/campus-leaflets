// 加载模型
var Corporation = require('../../models/corporation.js');
var User = require('../../models/user.js');

module.exports = {
    // 审核单位（管理员首页）
    index: function* () {
        try {
            // 查询未审核单位
            var result = yield Corporation.find({'state': '未审核'}).sort({'_id': -1});

            yield this.render('admin/index', {
                'title': '审核单位',
                'result': result
            });
        } catch(e) {
            this.body = '审核单位页面加载失败';
            console.log(e);
        }
    },
    // 审核单位详情
    verify: function* () {
        try {
            var id = this.params.id;// 单位 ID

            // 查询符合条件的第一条单位记录
            var result = yield Corporation.findOne({'_id': id});

            yield this.render('admin/verify', {
                'title': '审核单位详情',
                'result': result
            });
        } catch(e) {
            this.body = '审核单位详情页面加载失败';
            console.log(e);
        }
    },
    // 审核单位处理
    doVerify: function* () {
        try {
            var result = this.request.body;
            var id = result._id;// 单位 ID
            var state = result.state;// 审核单位结果

            if (!state) {// 没填写审核单位结果
                // 重定向到上个页面
                this.redirect('/admin/verifyCorporation/' + id + '/');
            } else {// 填写了审核单位结果
                var text = '';// 邮件正文内容
                
                // 查询符合条件的第一条单位记录
                var result = yield Corporation.findOne({'_id': id});

                if (state === '通过') {// 通过
                    // 设置单位状态为“通过”
                    yield Corporation.setCorporationState(id, state);

                    // 单位信息保存到数据库
                    var _user = new User({
                        'email': result.email,
                        'username': result.name,
                        'tel': result.tel,
                        'belong': result.belong,
                        'password': 'CLu0000'
                    });
                    yield _user.save();

                    // 发送邮件通知单位
                    text = '<p>恭喜 <strong>' + result.name + '</strong>，单位注册成功。</p><p>点击链接即可登录（用户名：'+ result.name +'，电子邮箱：'+ result.email +'，初始密码：CLu0000）：<a href="http://localhost:3000/login/">http://localhost:3000/login/</a>，登录成功之后可完善单位信息、发布传单等。</p><p style="padding-top: 60px;">校园传单（Campus Leaflets）</p>';
                    yield Corporation.sendMail(result.email, text);
                } else {// 不通过
                    // 删除单位信息
                    yield Corporation.remove({'_id': id});

                    // 发送邮件通知单位
                    text = '<p>很遗憾 <strong>' + result.name + '</strong>，单位注册失败。</p><p>点击链接重新注册：<a href="http://localhost:3000/corporation/register/">http://localhost:3000/corporation/register/</a>。</p><p style="padding-top: 60px;">校园传单（Campus Leaflets）</p>';
                    yield Corporation.sendMail(result.email, text);
                }

                // 重定向到审核单位页面
                this.redirect('/admin/');
            }
        } catch(e) {
            this.body = '审核单位处理失败';
            console.log(e);
        }
    }
};