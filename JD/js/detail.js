function banners() {
    let swiper = new Swiper('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: true,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
    $('.swiper-container').mouseenter(function () {
        swiper.autoplay.stop();
    })
    $('.swiper-container').mouseleave(function () {
        swiper.autoplay.start();
    })

}
// 左边的黄色方块为200px 图片为282px  右边为400px 600px
function fangdajing() {
    let yellow = document.querySelector('.yellow') //  这是左边黄色方块
    let yellowImg = document.querySelector('.swiper-slide')
    let right = document.querySelector('.big')
    let rightImg = document.querySelector('.big img')
    rightImg.style.width = right.offsetWidth / (yellow.offsetWidth / yellowImg.offsetWidth) + 'px'
    rightImg.style.Height = right.offsetWidth / (yellow.offsetWidth / yellowImg.offsetWidth) + 'px'
    let banners=document.querySelectorAll('.Iimg')
    console.log(banners);
    for(let i=0;i<banners.length;i++){
        banners[i].onmouseenter=function () {
            yellow.style.display='block'
            let src=this.getAttribute('src')
            rightImg.setAttribute('src',src)
            right.style.display='block'
        }
        banners[i].onmouseleave=function () {
            yellow.style.display='none'
            right.style.display='none'
        }
        banners[i].onmousemove=function (e) {

            
            
            let y=e.offsetY-(yellow.offsetHeight/2)
            let x=e.offsetX-(yellow.offsetWidth/2)
            if (x<=0) {
                x=0
            }
            if (y<=0) {
                y=0
            }
            if (x>yellowImg.offsetWidth-yellow.offsetWidth) {
                x=yellowImg.offsetWidth-yellow.offsetWidth
            }
            if (y>yellowImg.offsetHeight-yellow.offsetHeight) {
                y=yellowImg.offsetHeight-yellow.offsetHeight
            }
            //    左边小的移动的距离     右边小的移动的距离
            //    左边大的总长度          右边大图总长度
            yellow.style.left=x+'px'
            yellow.style.top=y+'px'
            rightImg.style.top=-parseInt(yellow.style.top)/parseInt(yellowImg.offsetHeight)*parseInt(rightImg.offsetHeight)+'px'
            rightImg.style.left=-parseInt(yellow.style.left)/parseInt(yellowImg.offsetWidth)*parseInt(rightImg.offsetWidth)+'px'
        }
    }
}

function getId() {
    let url = location.href;
    let num = url.indexOf('?');
    url = url.substring(num + 1)
    return url
};
function getData() {
    let res = $.ajax({
        url: 'http://www.xiongmaoyouxuan.com/api/detail?' + getId(),
        type: 'get',
    }).then(function (data) {
        let datalist = data.data.detail;
        let images = data.data.detail.descContentList
        show(datalist, images)
    })
}
getData()

function show(data, images) {
    // console.log(detail);
    let jude = {
        data
    }
    let stress = template('one', jude)
    $('section').html(stress)
    banners()
    // console.log(images);
    let joke = {
        images
    }
    let str = template('imgs', joke)
    $('#img .container').html(str)
    toCart(data.price)
    fangdajing()
}

function toCart(toprice) {
    $('.toCart').click(function () {
        let url = document.querySelector('.Iimg').getAttribute('src')
        let index=(location.href).indexOf('=')
        let id = location.href.substring(index+1)
        let price = toprice
        let num = 1;
        let total = toprice;
        let product = {
            id,
            price,
            num,
            price,
            total,
            url,
            check:false,
            allcheck:false
        }

        // localStorage.setItem('cart',JSON.stringify(product))
        let local = localStorage.getItem('cart')
        local = JSON.parse(local) || [];

        let res = local.find(item => item.id == id)
        if (res) {
            res.num++
        } else {
            local.push(product)
        }
        localStorage.setItem('cart', JSON.stringify(local))
        alert('加入购物车成功！')



    })
    $('h4').eq(1).click(function () {
        location.href = './cart.html'
    })
}