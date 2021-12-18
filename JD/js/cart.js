function getAndShow() {
    let products = JSON.parse(localStorage.getItem('cart'));
    products.forEach(item => {
        if (item.num==0) {
           products.splice(products.indexOf(item),1)
        }
        
        item.total=(item.num*item.price).toFixed(2)

    });
    localStorage.setItem('cart',JSON.stringify(products))
    let data = {
        products
    };

    let str = template('show', data);
    $('table').html(str)
    // addOrLess()
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
    let box=document.querySelectorAll('input[type=checkbox]')
}
function addOrLess() {
    $('table').on('click',function (e) {
        let target=e.target;
        
        if (target.getAttribute('name')=='minus') {
            let id=target.parentNode.previousElementSibling.previousElementSibling.innerHTML;
            let products = JSON.parse(localStorage.getItem('cart'));
            products.forEach(item=>{
                  if (item.id==id) {
                      item.num=item.num-1
                      item.num<=0 &&(item.num=0)
                    console.log(item);
                    //   getAndShow()
                  }
            })
            localStorage.setItem('cart',JSON.stringify(products))
            getAndShow()
        }
        if (target.getAttribute('name')=='plus') {
            let id=target.parentNode.previousElementSibling.previousElementSibling.innerHTML;
            let products = JSON.parse(localStorage.getItem('cart'));
            products.forEach(item=>{
                  if (item.id==id) {
                      item.num=item.num+1
                      item.num<=0 &&(item.num=0)
                  }
            })
            localStorage.setItem('cart',JSON.stringify(products))
            getAndShow()
        }
    })
}
