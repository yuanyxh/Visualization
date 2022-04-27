window.addEventListener('DOMContentLoaded', function () {
    const login = document.querySelector('.login');
    const register = document.querySelector('.register');
    const toRegister = login.querySelector('.toRegister');
    const toLogin = register.querySelector('.toLogin');

    toLogin.addEventListener('click', function () {
        register.style.display = 'none';
        login.style.display = 'block';
    });

    toRegister.addEventListener('click', function () {
        login.style.display = 'none';
        register.style.display = 'block';
    });

    // 比如，验证一个用户名和密码
    function test() {
        return {
            fields: {
                username: { // 这里username是 input 的name属性值，表示对这个输入框进行验证
                validators: { // 添加真正的校验规则
                    notEmpty: {   //不能为空
                    message: '用户名不能为空.'// 如果不满足校验规则，则给出这句提示
                    },
                    stringLength: {   //检测长度
                    min: 2, // 最少2位
                    max: 15, // 最多15位
                    message: '用户名需要2~15个字符'
                    }
                }
            },
                password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {   //检测长度
                        min: 6,
                        max: 15,
                        message: '密码需要6~15个字符'
                    }
                }
            }
        }
    }
}

    // 单击实现注册
    // 比如，注册
    // $('.register form')：获取表单
    // on：jq中绑定事件的方法
    // 'success.form.bv'：表单元素submit的默认提交事件类型
    // jq中绑定事件的语法： $('选择器').on('事件类型'，事件处理函数)
    $('.register form')
        .bootstrapValidator(test())
        .on('success.form.bv', function (e) {
            e.preventDefault()
            // 通过验证，这里的代码将会执行。我们将Ajax请求的代码放到这里即可
            // 实现注册
            // 1.收集数据
            let username = register.querySelector('[name="username"]').value
            let password = register.querySelector('[name="password"]').value

            // 2.发起axios请求
            axios({
                method: 'post',
                url: '/api/register',
                // data: `username=${username}&password=${password}`
                data: { username, password }
            }).then(res => {
                console.log(res)
                // 成功之后
                if (res.data.code == 0) {
                    // 1.清空输入框
                    // 2.给出提示
                    toastr.success(res.data.message)
                    // 3.切换到登陆页面
                    login.style.display = 'block'
                    register.style.display = 'none'
                } else {
                    toastr.warning(res.data.message)
                }
            })
        });

    // 登陆
    $('.login form')
        .bootstrapValidator(test())
        .on('success.form.bv', function (e) {
            e.preventDefault()
            // 1.收集数据
            let username = login.querySelector('[name="username"]').value
            let password = login.querySelector('[name="password"]').value
            // 2.发起axios请求
            axios({
                url: '/api/login',
                method: 'post',
                data: { username, password }
            }).then(res => {
                console.log(res)
                if (res.data.code == 0) {
                    localStorage.setItem('user', res.data.token)
                    toastr.success(res.data.message)
                    // 实现页面的跳转
                    location.href = './index.html'
                } else {
                    toastr.success(res.data.message)
                }
            })
        })
});