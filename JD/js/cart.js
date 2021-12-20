function getAndShow() {
    let products = JSON.parse(localStorage.getItem('cart')) || [];
    let allPrice = 0
    let res = false
    products.forEach(item => {
        item.total = (item.num * item.price).toFixed(2)

        if (item.num == 0) {
            products.splice(products.indexOf(item), 1)
        }
        if (item.allcheck == true) {
            res = true

        }
        if (item.check == true) {
            allPrice += item.total - 0

        }


    });
    $('#totalPrice').html('￥' + allPrice.toFixed(2))
    localStorage.setItem('cart', JSON.stringify(products))
    let data = {
        products
    };
    let str = template('show', data);
    $('table').html(str)
    if (res) {
        document.querySelector('.checkAll').checked = res;
        checkAll()
    }
    products.forEach(item => {
        if (item.check == true) {
            let index = products.indexOf(item)
            let boxs = document.querySelectorAll('.box')
            boxs[index].checked = true

        }
    });

}
addOrLess()

getAndShow()

function toIndex() {
    $('.toindex').click(function () {
        location.href = './theIndex.html'
    })
}
toIndex()

function checkBox() {
    let box = document.querySelectorAll('input[type=checkbox]')
}

function addOrLess() {
    $('table').on('click', function (e) {
        let target = e.target;
        //减按钮
        if (target.getAttribute('name') == 'minus') {
            let id = target.parentNode.previousElementSibling.previousElementSibling.innerHTML;
            let products = JSON.parse(localStorage.getItem('cart'));
            products.forEach(item => {
                if (item.id == id) {
                    item.num = item.num - 1
                    item.num <= 0 && (item.num = 0)
                }
            })
            localStorage.setItem('cart', JSON.stringify(products))
            getAndShow()
        }
        //加按钮
        if (target.getAttribute('name') == 'plus') {
            let id = target.parentNode.previousElementSibling.previousElementSibling.innerHTML;
            let products = JSON.parse(localStorage.getItem('cart'));
            products.forEach(item => {
                if (item.id == id) {
                    item.num = item.num + 1
                    item.num <= 0 && (item.num = 0)
                }
            })
            localStorage.setItem('cart', JSON.stringify(products))
            getAndShow()
        }
        //删除按钮
        if (target.getAttribute('class') == 'delete-btn') {
            let res = confirm('确定要删除吗？')
            if (!res) {
                return
            }
            let id = target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
            let products = JSON.parse(localStorage.getItem('cart'))
            products.forEach(item => {
                if (item.id == id) {
                    item.num = 0
                }
            })
            localStorage.setItem('cart', JSON.stringify(products))
            getAndShow()
        }
        //单选按钮
        if (target.getAttribute('class') == 'box') {
            let boxs = document.querySelectorAll('.box')
            let result = true
            boxs.forEach(item => {
                if (item.checked == false) {
                    result = false
                    return
                }
            })
            if (result == true) {
                document.querySelector('.checkAll').checked = true
            } else {
                document.querySelector('.checkAll').checked = false
            }
            let id = target.parentNode.nextElementSibling.nextElementSibling.innerHTML
            let products = JSON.parse(localStorage.getItem('cart'))
            products.forEach(item => {
                item.allcheck = result
                if (item.id == id) {
                    item.check = target.checked
                }
            })
            localStorage.setItem('cart', JSON.stringify(products))
            getAndShow()
        }
    })

}

function checkAll() {

    let res = document.querySelector('.checkAll').checked;
    let products = JSON.parse(localStorage.getItem('cart'))
    let box = document.querySelectorAll('.box')
    let allPrice = 0
    if (res == true) {
        products.forEach(item => {
            item.check = true
            if (item.check == true) {
                allPrice+= Number(item.total) 
                console.log(item.total);
            }
            item.allcheck = true;
            for (let i = 0; i < box.length; i++) {
                box[i].checked = true
            }
        })
        console.log(allPrice);
        $('#totalPrice').html('￥' + allPrice.toFixed(2))
    } else if(res==false){
        products.forEach(item => {

            item.check = false;
            item.allcheck = false
            for (let i = 0; i < box.length; i++) {
                box[i].checked = false
            }

        })
        $('#totalPrice').html('￥' + 0)
    }
    localStorage.setItem('cart', JSON.stringify(products))
    // $('#totalPrice').html('￥' + allPrice.toFixed(2))

}