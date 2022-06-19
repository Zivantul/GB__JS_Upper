class Cart {
    constructor() {
        this.counters = [0];
        this.order = {};
        this.discount = 1;
    }

    /**
     * добавляет товар в корзину: если товар уже есть,
     * то увеличивает количество добавленного товара
     * @param {Object} product - продукт, обавляемый в корзину
     * @param {*} count  - количество добавляемого продукта
     */
    addToCart(product, count) {
        let ctr = 0
        Object.values(this.order).forEach(addProd => {
            if (addProd[0] === product) {
                addProd[1] += count;
                ctr++;
            }
        });
        if (ctr === 0) {
            const tmpCounter = this.counters.sort()[this.counters.length - 1] + 1;
            this.counters.push(+tmpCounter);
            this.order[tmpCounter] = [product, count];
        }
    }

    /**
     * Удаляет товар из корзины полностью
     * @param {Object} product - продукт, удаляемый из корзины
     */
    remooveProductFromCart(product) {
        const cartKeys = Object.keys(this.order)
        cartKeys.forEach(key => {
            if (this.order[key][0] === product) {
                delete this.order[key];
            }
        });
    }

    /**
     * Изменяет количество конкретного продукта в корзине
     * @param {Object} product - продукт, по которому нужно изменение количества
     * @param {Number} newCount - новое количество продукта
     */
    changeProductCart(product, newCount) {
        Object.values(this.order).forEach(addProd => {
            if (addProd[0] === product) {
                addProd[1] = newCount;
            }
        });
    }

    /**
     * 
     * @returns Возвращает общее количество товаров в корзине
     */
    countTotalProductsInCart() {
        let totalProducts = 0;
        Object.values(this.order).forEach(addProd => {
            totalProducts += addProd[1];
        });
        return totalProducts
    }

    /**
     * 
     * @returns Возвращает общую стоимость товаров в корзине
     */
    countTotalPriceInCart() {
        let totalPrice = 0;
        Object.values(this.order).forEach(addProd => {
            totalPrice += addProd[0].price * addProd[1];
        });
        return (totalPrice * this.discount).toFixed(2)
    }

    addCartDiscount(discount = 0) {
        this.discount = 1 - discount;
    }

    /**
     * 
     * @returns Возвращает полное описание заказа в корзине
     */
    getCartInfo() {
        let resultInfo = "";
        if (this.discount != 1) {
            resultInfo = `Ваша корзина (с учетом скидки ${((1 - this.discount) * 100).toFixed(2)}%): \n`;
        } else {
            resultInfo = "Ваша корзина: \n";
        }
        Object.values(this.order).forEach(addProd => {
            resultInfo += addProd[0].getProductInfo()
                + ` - кол-во ${addProd[1]}`
                + ` на сумму ${(addProd[0].price * addProd[1] * this.discount).toFixed(2)} \n`
        });
        resultInfo += `Итого ${this.countTotalProductsInCart()} товаров на общую сумму: ${this.countTotalPriceInCart()}`;
        return resultInfo
    }

}


class Product {
    constructor(article, title, price, weight) {
        this.article = article;
        this.title = title;
        this.price = +price;
        this.weight = +weight;
    }

    /**
     * устанавливает новое наименования продукта
     * по умолчанию - текущее значение
     * @param {String} newTitle - новое наименование продукта
     */
    setProductTitle(newTitle = this.title) {
        this.title = newTitle;
    }

    /**
     * устанавливает новую Цену продукта
     * по умолчанию - текущее значение
     * @param {Number} newPrice - новая цена продукта
     */
    setProductPrice(newPrice = this.price) {
        if (!isNaN(newPrice)) {
            return
        }
        this.price = +newPrice;
    }

    /**
     * устанавливает новое значение веса продукта
     * по умолчанию - текущее значение
     * @param {Number} newWeight - новый вес продукта
     */
    setProductWeight(newWeight = this.weight) {
        if (!isNaN(newWeight)) {
            return
        }
        this.weight = +newWeight;
    }

    /**
     * Возвращает информацию по продукту
     * @returns данные о товаре в строковом формате
     */
    getProductInfo() {
        const resInfo = `Продукт: ${this.title} (арт. ${this.article}) - `
            + `цена ${(this.price).toFixed(2)}, `
            + `вес ${this.weight}кг.`;
        return resInfo
    }
}