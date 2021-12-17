function banners() {
    new Swiper('.swiper-container', {
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
}

function getId() {
    let url = location.href;
    let num = url.indexOf('?');
    url = url.substring(num + 1)
    return url
};
function getData() {
    let res=$.ajax({
        url: 'http://www.xiongmaoyouxuan.com/api/detail?' + getId(),
        type: 'get',
    }).then(function (data) {
        let datalist=data.data.detail;
        let images=data.data.detail.descContentList
        show(datalist,images)
    })
}
getData()
function show(data,images) {
// console.log(detail);
    let jude={
        data
    }
    let stress=template('one',jude)
    $('section').html(stress)
    banners()
    // console.log(images);
    let joke={
        images
    }
    let str=template('imgs',joke)
    $('#img .container').html(str)
    toCart(data.price)
}
function toCart(toprice) {
   $('.toCart').click(function () {
    let url=document.querySelector('.Iimg').getAttribute('src')
    let id=location.href.substring(43)
    let price=toprice
    let num=1;
    let total=toprice;
    let product={id,price,num,price,total,url}

    // localStorage.setItem('cart',JSON.stringify(product))
    let local=localStorage.getItem('cart')
    local=JSON.parse(local)||[];

    let res=local.find(item=>item.id==id)
    if (res) {
        res.num++
    }else{
        local.push(product)
    }
    localStorage.setItem('cart',JSON.stringify(local))
    alert('加入购物车成功！')
    
    
    
   })
   $('h4').eq(1).click(function () {
       confirm('这个还没写呢！')
   })
}