let text = `
One: 'Hi Mary.' 
Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'
`;

console.log(replaceQuotesSimple(text, 'simple'));
console.log(replaceQuotesSimple(text, 'pro'));

/**
 * Заменяет одинарные ковычки на двойные, в зависимости от типа замены меняет 
 * либо все одинарные ковычки (kind='simple'), либо меняет только одинарные 
 * ковычки в начале и конце прямой речи (kind = 'pro')
 * @param {String} text - текст для поиска и замены ковычек
 * @param {String} kind - тип замены ('simple' или 'pro')
 * @returns 
 */
function replaceQuotesSimple(text, kind = 'simple') {
    let regexp;
    let res;
    if (kind === 'simple') {
        regexp = /'/g;
        res = text.replace(regexp, '"');
    } else {
        regexp = /\W'/g;
        res = text.replace(regexp, ' "');
        regexp = /'\s?\n/g;
        res = res.replace(regexp, '"\n');
    }
    return res;
};



/*
Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
и сообщить пользователю об ошибке.
*/

document.addEventListener("DOMContentLoaded", () => {
    const sendBtnEl = document.querySelector('.btnSend');
    const inpNameEl = document.querySelector('.txtName');
    const inpPhoneEl = document.querySelector('.txtPhone');
    const inpMailEl = document.querySelector('.txtMail');
    const inpCommentEl = document.querySelector('.txtComment');



    sendBtnEl.addEventListener('click', event => {
        let checkCorrectData = [];
        event.preventDefault;
        // проверка имени (если хоть 1 не буква, то красим)
        if (inpNameEl.value === "" | getRegexp('name').test(inpNameEl.value)) {
            inpNameEl.classList.add('redBorder');
            document.querySelector('.contentMask[name=Name]').classList.remove('hidden');
            if (checkCorrectData.includes('name')) {
                checkCorrectData.remove('name');
            }
        } else {
            inpNameEl.classList.remove('redBorder');
            document.querySelector('.contentMask[name=Name]').classList.add('hidden');
            checkCorrectData.push('name');
        };
        // проверка номера телефона
        if (getRegexp('phone').test(inpPhoneEl.value)) {
            inpPhoneEl.classList.remove('redBorder');
            document.querySelector('.contentMask[name=Phone]').classList.add('hidden');
            checkCorrectData.push('phone');
        } else {
            inpPhoneEl.classList.add('redBorder');
            document.querySelector('.contentMask[name=Phone]').classList.remove('hidden');
            if (checkCorrectData.includes('phone')) {
                checkCorrectData.remove('phone');
            }
        };
        // проверка e-mail
        if (getRegexp('mail').test(inpMailEl.value)) {
            inpMailEl.classList.remove('redBorder');
            document.querySelector('.contentMask[name=Mail]').classList.add('hidden');
            checkCorrectData.push('mail');
        } else {
            inpMailEl.classList.add('redBorder');
            document.querySelector('.contentMask[name=Mail]').classList.remove('hidden');
            if (checkCorrectData.includes('mail')) {
                checkCorrectData.remove('mail');
            }
        };
        // проверка e-mail - произвольный текст, проверяем только что не пустой
        if (inpCommentEl.value !== "") {
            inpCommentEl.classList.remove('redBorder');
            document.querySelector('.contentMask[name=Comment]').classList.add('hidden');
            checkCorrectData.push('comments');
        } else {
            inpCommentEl.classList.add('redBorder');
            document.querySelector('.contentMask[name=Comment]').classList.remove('hidden');
            if (checkCorrectData.includes('comments')) {
                checkCorrectData.remove('comments');
            }
        };

        if (checkCorrectData.length === 4) {
            alert("Супер! Все верно!");
        };
    })
});


function getRegexp(dataType) {
    let mask;
    switch (dataType) {
        case 'name':
            //Имя содержит только буквы.
            // ищем от обратного - если есть хоть 1 небуквенный знак
            mask = /[^a-zа-яёЁ]/i;
            break;
        case 'phone':
            //Телефон имеет вид +7(000)000-0000.
            mask = /\+7\(\d{3}\)\d{3}\-\d{4}/;
            break;
        case 'mail':
            mask = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,6})$/i;
            break;
    };
    return mask;
};