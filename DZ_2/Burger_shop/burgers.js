class Cart {
    constructor(container = '.cartProducts') {
        this.products = [];
        this.container = container;
    }

    addToCart(product) {
        this.products.push(product);
    }

    totalProductsInCart() {
        return this.products.length;
    }

    totalPriceInCart() {
        let totalPrice = 0;
        for (let prod of this.products) {
            totalPrice += +prod.price;
        }
        return totalPrice;
    }
    totalCaloriesInCart() {
        let totalCalories = 0;
        for (let prod of this.products) {
            totalCalories += +prod.calories;
        }
        return totalCalories;
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            block.insertAdjacentHTML("beforeend", product.render());
        }
        const totalRes = `<h4 class="CartH4 total">Итоговая сумма: ${this.totalPriceInCart()}`
            + `  (${this.totalCaloriesInCart()} ккал)</h4>`
        block.insertAdjacentHTML("afterend", totalRes);

    }
}

class Product {
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }

    render() {
        return `<div class="Burger">`
            + `  ${this.name}  (${this.calories} кал.)`
            + ` на сумму - ${this.price} </div>
            </div>`
    }

}


let mainCart = new Cart;

const CartButtonEl = document.querySelector('.cartButton');
const CartEl = document.querySelector('.cart');
const BuyButtonEl = document.querySelector('.putToCartButton');

function killCart() {
    if (CartEl.classList.contains('hidden')) {
        let tmpProdEl = document.querySelector('.Burger');

        while (tmpProdEl) {
            tmpProdEl.remove();
            tmpProdEl = document.querySelector('.Burger');
        };

        let tmpTotalEl;
        tmpTotalEl = document.querySelector('.total');
        if (tmpTotalEl) {
            tmpTotalEl.remove();
        }
    } else {
        mainCart.render();
    }
}

CartButtonEl.addEventListener('click', () => {
    CartEl.classList.toggle('hidden');
    killCart();
});

document.addEventListener('click', event => {
    if (event.target.classList.contains('cartButton')) {
        return;
    }
    CartEl.classList += ' hidden';
    killCart();
})

BuyButtonEl.addEventListener('click', () => {
    const burgerTypeEl = document.querySelectorAll('.burger_type');
    burgerTypeEl.forEach(elem => {
        if (elem.checked) {
            const prodName = elem.value;
            const prodPrice = elem.dataset.price;
            const prodCalories = elem.dataset.calories;
            mainCart.addToCart(new Product(prodName, prodPrice, prodCalories));
        }
    });
    //mainCart.render();
    CartButtonEl.value = `Корзина (${mainCart.totalProductsInCart()})`;
});

console.log(mainCart.totalPriceInCart())
