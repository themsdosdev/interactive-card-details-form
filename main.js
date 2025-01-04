const d = document;

let nameCard = d.querySelector('.card__details-name');
let nameInput = d.querySelector('#cardholder');
let nameErrorDiv = d.querySelector('.form__cardholder--error');

let numberCard = d.querySelector('.card__number');
let numberInput = d.querySelector('#cardNumber');
let numberErrorDiv = d.querySelector('.form__inputnumber--error');

let monthCard = d.querySelector('.card__month');
let monthInput = d.querySelector('#cardMonth');
let monthErrorDiv = d.querySelector('.form__input-mm--error');

let yearCard = d.querySelector('.card__year');
let yearInput = d.querySelector('#cardYear');
let yearErrorDiv = d.querySelector('.form__input-yy--error');

let cvcCard = d.querySelector('.card-back__cvc');
let cvcInput = d.querySelector('#cardCvc');
let cvcErrorDiv = d.querySelector('.form__input-cvc--error');


nameInput.addEventListener('input', () => {
    nameCard.innerText = nameInput.value ? nameInput.value : 'JANE APPLESEED';
});


numberInput.addEventListener('input', () => {
    let regExp = /[A-z]/g;
    if (regExp.test(numberInput.value)) {
        showError(numberInput, numberErrorDiv, 'Wrong format, numbers only');
    } else {
        numberInput.value = numberInput.value.replace(/\s/g, '').replace(/(\d{4})/g, "$1 ").trim();
        showError(numberInput, numberErrorDiv, '', false);
    }
    numberCard.innerText = numberInput.value || '0000 0000 0000 0000';
});


monthInput.addEventListener('input', () => {
    monthCard.innerText = monthInput.value;
    validateLetters(monthInput, monthErrorDiv);
});


yearInput.addEventListener('input', () => {
    yearCard.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv);
});


cvcInput.addEventListener('input', () => {
    cvcCard.innerText = cvcInput.value;
    validateLetters(cvcInput, cvcErrorDiv);
});


let confirmBtn = d.querySelector('.form__submit');
let formSection = d.querySelector('.form');
let thanksSection = d.querySelector('.thanks-section');

confirmBtn.addEventListener('click', event => {
    event.preventDefault();

    let nameValidation = verifyIsFilled(nameInput, nameErrorDiv);
    let numberValidation = verifyIsFilled(numberInput, numberErrorDiv) && numberInput.value.length === 19;
    let monthValidation = verifyIsFilled(monthInput, monthErrorDiv) && parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12;
    let yearValidation = verifyIsFilled(yearInput, yearErrorDiv) && parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27;
    let cvcValidation = verifyIsFilled(cvcInput, cvcErrorDiv) && cvcInput.value.length === 3;

    if (nameValidation && numberValidation && monthValidation && yearValidation && cvcValidation) {
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    }
});


function showError(divInput, divError, msgError, show = true) {
    if (show) {
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(0, 100%, 66%)';
    } else {
        divError.innerText = '';
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}

function verifyIsFilled(divInput, divError) {
    if (divInput.value.length > 0) {
        showError(divInput, divError, '', false);
        return true;
    } else {
        showError(divInput, divError, "Can't be blank");
        return false;
    }
}

function validateLetters(input, divError) {
    let regExp = /[A-z]/g;
    if (regExp.test(input.value)) {
        showError(input, divError, 'Wrong format, numbers only');
    } else {
        showError(input, divError, '', false);
    }
}
