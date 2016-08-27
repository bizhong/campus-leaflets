define(['EventUtil'], function(EventUtil) {
    // 检查用户电子邮件、用户名是否已注册
    var checkInput = function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event),
            email = EventUtil.getId("email"),
            username = EventUtil.getId("username"),
            emailPrompt = EventUtil.getId("cl-email-prompt"),
            usernamePrompt = EventUtil.getId("cl-username-prompt"),
            emailResult = EventUtil.getId("cl-email-result"),
            usernameResult = EventUtil.getId("cl-username-result");

        function ajaxGetResultNum(varname, element1, element2, element3) {
            var name = varname,// 变量名（email 或 username）
                value = element1.value,// 用户输入值
                request;

            if (window.XMLHttpRequest) {// IE 7+、Firefox、Chrome、Opera、Safari
                request = new XMLHttpRequest();
            } else {// IE 5/6
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    if (request.responseText === "电子邮件不可用" || request.responseText === "用户名不可用") {
                        element2.className = "mdl-color-text--red";
                        element3.value = "no";
                    } else {
                        element2.className = "mdl-color-text--green";
                        element3.value = "yes";
                    }

                    element2.innerHTML = request.responseText;
                }
            };
            request.open("GET", "/register/check/?name=" + name + "&value=" + value, true);
            request.send();
        }

        switch(target) {
            case email:
                if (email.value) {// 电子邮件不为空
                    ajaxGetResultNum("email", email, emailPrompt, emailResult);
                }
                break;
            case username:
                if (username.value) {// 用户名不为空
                    ajaxGetResultNum("username", username, usernamePrompt, usernameResult);
                }
                break;
        }
    };

    return {
        'checkInput': checkInput
    };
});