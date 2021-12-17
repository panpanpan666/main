let products=JSON.parse(localStorage.getItem('cart'));
let data={
    products
};
let str=template('show',data);
$('table').html(str)