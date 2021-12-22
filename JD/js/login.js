$('#sureEnroll').click(function () {
    let username=$('.username').val();
    let password=$('.password').val();
    let phone=$('.phone').val();
    let res=axios.post({url:'http://localhost:3000/users',data:{
        username,password,phone
    }})
    // if (res.statusText=="Created") {
    //     confirm('注册成功，是否立即登录？')
    // }
    alert('注册成功，赶紧登录吧！')
})
var mySwiper = new Swiper('.swiper', {
    loop: true, // 循环模式选项
    autoplay: true,
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 如果需要滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})
class login {
    constructor() {
        $('.form').on('click', function () {
            alert('666')
        })
    }
    static loginTo() {
        let userName = document.querySelector('.user').value;
        let password = document.querySelector('.pwd').value
        //    $('.alert-warning').css('display','block');
        if (!userName || !password) {
            $('.alert-warning p').html('<strong>WARNING:</strong> 用户名密码不能为空！')
            document.querySelector('.user').value = ''
            document.querySelector('.pwd').value = ''
            $('.alert-warning').css('display', 'block');
            setTimeout(() => {
                $('.alert-warning').css('display', 'none');
            }, 2000);
            return
        }
        let reg = /[A-Za-z0-9]{6,}/;
        let reg2 = /[0-9]{6,}/;
        let name = reg.test(userName);
        let pass = reg2.test(password)
        if (!name || !pass) {
            $('.alert-warning p').html('<strong>WARNING:</strong> 请输入6位以上的用户名和密码哦！')
            document.querySelector('.user').value = ''
            document.querySelector('.pwd').value = ''
            $('.alert-warning').css('display', 'block');
            setTimeout(() => {
                $('.alert-warning').css('display', 'none');
            }, 2000);
            return
        }
        axios.get({
            url: 'http://localhost:3000/users',
            data: {
                'username': userName,
                'password': password
            },
        }).then(function (data) {
            if (data.length==0) {
                $('.alert-warning p').html('<strong>WARNING:</strong> 眼角膜没用就捐了吧！')
                document.querySelector('.user').value = ''
                document.querySelector('.pwd').value = ''
                $('.alert-warning').css('display', 'block');
                setTimeout(() => {
                    $('.alert-warning').css('display', 'none');
                }, 2000);
                return
            }
            document.querySelector('.user').value = '';
            document.querySelector('.pwd').value = '';
            let res=confirm('登录成功，是否跳转？')
            if (res) {
                location.href = './theIndex.html'
            }
        })
    }
}