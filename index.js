const add = (a, b) => a+b;
const subtract = (a, b) => a-b;
const multiply = (a, b) => a*b;
const divide = (a, b) => a/b;

const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".calculator-display");
const keyButtons = calculator.querySelector(".calculator-keys");

const operate = (operator, num1, num2) => {
    let result;
    if (operator === "add") {
        result = add(+num1, +num2);
    } 
    if (operator === "subtract") {
        result = subtract(+num1, +num2);
    } 
    if (operator === "multiply") {
        result = multiply(+num1, +num2);
    } 
    if (operator === "divide") {
        result = divide(+num1, +num2);
    }
    return result;
}

keyButtons.addEventListener("click", e => {
    const key = e.target; // <button>
    const action = key.dataset.action; // operator, number, or equal
    const keyContent = key.textContent; // button content
    const displayValue = display.textContent; // number on display
    const previousKeyType = calculator.dataset.previousKeyType; // previous key type

    console.log('key: ' + key)
    console.log('action: ' + action)
    console.log('keyContent: ' + keyContent)
    console.log('displayValue: ' + displayValue)
    console.log('previousKeyType: ' + previousKeyType)

    if (!action) {
        if (displayValue === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent;
        } else {
            display.textContent = displayValue + keyContent;
        }
    }

    if (action === 'add' || action === 'subtract' ||
        action === 'multiply' || action === 'divide') {

        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.firstValue = displayValue;
        calculator.dataset.operator = action;
    }

    if (action === 'clear') {
        display.textContent = 0;
    }

    if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue;
        const secondValue = displayValue;
        const operator = calculator.dataset.operator;

        display.textContent = operate(operator, firstValue, secondValue);
    }
})




