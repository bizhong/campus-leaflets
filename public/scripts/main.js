require.config({
    baseUrl: '/scripts/',// 基路径
    paths: {// 模块加载路径
        'EventUtil': 'my/eventUtil',
        'CheckInput': 'my/checkInput'
    }
});

require(['EventUtil', 'CheckInput'], function(EventUtil, CheckInput) {
    var clForm = EventUtil.getId("cl-form");

    EventUtil.addHandler(clForm, "focusout", CheckInput.checkInput);
});