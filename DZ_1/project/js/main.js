const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара (+оптимизировать)
//Добавить в выводе изображение
//Убрать запятые при выводе
//Минимальная верстка страницы
const renderProduct = (product) => {
    let prodTitle = product.title;
    let prodPrice = product.price;
    let imgSrc = `images/${prodTitle}.jpg`;
    let imgAlt = `${prodTitle}_img`;

    return `<div class="product-item">
                <h3>${prodTitle}</h3>
                <img class="prodImage" src=${imgSrc} alt=${imgAlt}>
                <p>${prodPrice}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join("");
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);