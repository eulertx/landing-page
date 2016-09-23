/**
 * euler js by developer
 * @auther euler
 */

// 初始化leanCloud
function initLeanCloud() {
    var APP_ID = 'SK9RWaTzy9kh69i1Fbo9sJvc-gzGzoHsz';
    var APP_KEY = '1V2JugfbH5wYflzSgTpuOA1F';
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
}

// 发送消息
function sendMessage () {
    var name = document.getElementById("icon_prefix").value;
    var email = document.getElementById("icon_email").value;
    var phone = document.getElementById("icon_phone").value;
    var content = document.getElementById("icon_message").value;

    var messageToast = document.getElementById("message-toast");

    if (email && phone && content) {
        var Message = AV.Object.extend("Message");
        new Message({
            name: name,
            phone: phone,
            email: email,
            content: content
        }).save().then(function (message) {
            messageToast.innerHTML = "发送成功";
        }, function (err) {
            messageToast.innerHTML = "发送失败," + err.message;
        });
    } else {
        messageToast.innerHTML = '请补全信息';
    }

}
