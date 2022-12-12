const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calculator-display');
const keyButtons = calculator.querySelector('.calculator-keys');

const operate = (operator, num1, num2) => {
    let result;
    if (operator === 'add') {
        result = add(+num1, +num2);
    }
    if (operator === 'subtract') {
        result = subtract(+num1, +num2);
    }
    if (operator === 'multiply') {
        result = multiply(+num1, +num2);
    }
    if (operator === 'divide') {
        result = divide(+num1, +num2);
    }
    return Math.round(result*10000)/10000;
}

keyButtons.addEventListener('click', e => {

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedValue = display.textContent;
    const lastKeyType = calculator.dataset.lastKeyType;

    if (!action) {
        if (
            displayedValue === '0' ||
            lastKeyType === 'operator' ||
            lastKeyType === 'calculate'
        ) {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedValue + keyContent;
        }
        calculator.dataset.lastKeyType = 'number';
    }

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedValue;

        if (
            firstValue &&
            operator &&
            lastKeyType !== 'operator' &&
            lastKeyType !== 'calculate'
        ) {
            const calculatedValue = operate(operator, firstValue, secondValue);
            display.textContent = calculatedValue;
            calculator.dataset.firstValue = calculatedValue;
        } else {
            calculator.dataset.firstValue = displayedValue;
        }

        calculator.dataset.lastKeyType = 'operator';
        calculator.dataset.operator = action;
    }

    if (action === 'clear') {

        calculator.dataset.firstValue = '';
        calculator.dataset.previousSecondValue = '';
        calculator.dataset.operator = '';
        display.textContent = 0;
        calculator.dataset.lastKeyType = 'clear';
    }

    if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        let secondValue = displayedValue;

        if (firstValue) {
            if (lastKeyType === 'calculate') {
                firstValue = displayedValue;
                secondValue = calculator.dataset.previousSecondValue;
            }

            display.textContent = operate(operator, firstValue, secondValue);
        }

        calculator.dataset.previousSecondValue = secondValue;
        calculator.dataset.lastKeyType = 'calculate';
    }
})