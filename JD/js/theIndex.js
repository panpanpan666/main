// $.ajax({
//     url: 'http://www.xiongmaoyouxuan.com/api/tab/1',
//     type: 'get',
//     Headers: {
//         'x-platform': 'pc'
//     },
//     success: function (result) {
//         if (result.code == 200) {
//             let productsList = result.data.items.list
//             // let list = [...productsList, ...newList]
//             showProducts(productsList)
//         }
//     }
// })
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

function getList(newList) {
    $.ajax({
        url: 'http://www.xiongmaoyouxuan.com/api/tab/1',
        type: 'get',
        Headers: {
            'x-platform': 'pc'
        },
        success: function (result) {
            if (result.code == 200) {
                let productsList = result.data.items.list
                productsList.splice(4,1)
                console.log(productsList);
                // let list = [...productsList, ...newList]
                showProducts(productsList)
            }
        }
    })
}
getList()
let lists=[]
function showProducts(lists) {

    
    // lists=[...lists,...productsList]
    // console.log(productsList);
    let data = {
        lists
    }
    let htmlStr = template('moban', data)
    $('.container').append(htmlStr)
}
function ToShow(id) {
    location.href='../pages/detail.html?id='+id
}
let num=1
$('main').click(function () {
    num++
    $.ajax({
        url:'http://www.xiongmaoyouxuan.com/api/tab/1/feeds?start=20&sort=0',
        type:'get',
        data:{'start':20*num,'sort':0},
        success:function (data) {
            console.log(data.data.list);
            let result=data.data.list
            showProducts(result)
        }
    })
})