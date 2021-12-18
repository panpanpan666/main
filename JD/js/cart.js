function getAndShow() {
    let products = JSON.parse(localStorage.getItem('cart'));
    products.forEach(item => {
        item.total=item.num*item.price
    });
    let data = {
        products
    };

    let str = template('show', data);
    $('table').html(str)
    addOrLess()
}
getAndShow()
function toIndex() {
    $('.toindex').click(function () {
        location.href = './theIndex.html'
    })
}
toIndex()
function checkBox() {
    let box=document.querySelectorAll('input[type=checkbox]')
}
function addOrLess() {
    $('table').on('click',function (e) {
        let target=e.target;
        if (target.getAttribute('name')=='minus') {
            let products = JSON.parse(localStorage.getItem('cart'));
        }
    })
}
