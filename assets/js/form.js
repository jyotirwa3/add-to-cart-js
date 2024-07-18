document.querySelector('#submit')
    .addEventListener('submit', (e) => {
        console.log(e)
        e.preventDefault() /// stop default value
        const inputAll = document.querySelectorAll('.localData input')
        /// all input values
        const p_category = document.querySelector('#category').value
        const p_desc = document.querySelector('#p_desc').value
        const p_name = inputAll[0].value;
        const p_price = inputAll[1].value;
        const p_qty = inputAll[2].value;
        const p_image = inputAll[3].value;

        /// check localstorage empty or not
        const box = JSON.parse(localStorage.getItem('productList')) || [];
        const user = {
            id: box.length + 1, p_category, p_desc, p_name, p_price, p_qty, p_image
        }


        /// all data inserted into array
        box.push(user)

        console.log(box)
        localStorage.setItem('productList', JSON.stringify(box))
        show()
    })

function show() {
    const user = JSON.parse(localStorage.getItem('productList'))

    const cardData = document.querySelector('#cardData')

    let result = ""
    user.forEach((ele, index) => {
        result +=
            `
                <div class="col-lg-3">
                <div class="card shadow border-0">
                    <img src=${ele.p_image} alt="" height="300px" class="p-3 border">
                    <div class="card-body">
                        <h3>${ele.p_category}</h3>
                        <ul>
                            <li>${ele.p_name}</li>
                            <li>${ele.p_price}</li>
                            <li>${ele.p_qty}</li>
                            <li>${ele.p_desc}</li>
                        </ul>
                        <button class="btn btn-success w-100" onclick="addToCart(${ele.id})">add to cart</button>
                    </div>
                </div>
            </div>`
    })
    cardData.innerHTML = result

}
show()

function trash(id) {
    if (confirm('do you want to delete this item?')) {
        const user = JSON.parse(localStorage.getItem('productList'))
        user.splice(id, 1)
        localStorage.setItem('productList', JSON.stringify(user))
        show()
    }
}

function edit(id) {
    ///// show update button and hide submit button
    document.querySelector('#update').style.display = "block"
    document.querySelector('#save').style.display = "none"

    ///// get all data from localstorage
    const user = JSON.parse(localStorage.getItem('productList'))


    /// get single user data 
    const singleUser = user[id];
    const inputAll = document.querySelectorAll('.localData input')

    //// values show in input
    inputAll[0].value = singleUser.username
    inputAll[1].value = singleUser.email
    inputAll[2].value = singleUser.mobile


}


function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('addToCart')) || [];
    let product = JSON.parse(localStorage.getItem('productList')) || [];

    const productItem = product.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...productItem, quantity: 1 });
    }

    localStorage.setItem('addToCart', JSON.stringify(cart));
}


