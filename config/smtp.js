// SMTP Transport 配置
module.exports = {
    // SMTP Transport
    smtpTransport: {
        host: "smtp.qq.com", // 主机
        secure: true, // 使用 SSL
        port: 465, // SMTP 端口
        auth: {
            user: "bizhongbio@qq.com", // 账号
            pass: "xxxxxxxxxx" // 密码
        }
    }
};