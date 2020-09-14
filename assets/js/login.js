$(function () {
    //点击 去注册账号 的连接
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()

    })
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()

    })
    //从layui上获取 form对象
    var form = layui.form
    var layer = layui.layer
    //通过 form.verify 函数自定义校验规则
    form.verify({
        //自定义一个叫做 pwd校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
        //校验两次密码是否一样
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //再拿到密码框中的内容 进行判断
            //若不一致 返回提示信息
            var pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return "两次的密码不一致"
            }

        }
    })


    // 发起注册用户的Ajax请求
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post("http://ajax.frontend.itheima.net/api/reguser", data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            //模拟人的点击行为
            $("#link_login").click()
        })
    })
    // 发起登录的Ajax请求
    $("#form_login").submit0000000(function (e) {
        e.preventDefault()
        $.ajax({
            url: "http://ajax.frontend.itheima.net/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登陆失败")
                }
                layer.msg("登陆成功")
                //将登录成功的 token字符串保存到localStorage 中
                localStorage.setItem("token", res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})