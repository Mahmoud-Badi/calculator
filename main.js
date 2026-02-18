let firstNumber = '';
let secondNumber = '';
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const lastOperation = document.getElementById('lastOperation');

const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operator');
const equalsButton = document.querySelector('.btn-equals');
const clearButton = document.querySelector('.btn-clear');

// Number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (shouldResetDisplay) {
            display.textContent = '';
            shouldResetDisplay = false;
        }
        
        if (button.textContent === '.') {
            if (display.textContent.includes('.')) return;
            if (display.textContent === '' || display.textContent === '0') {
                display.textContent = '0.';
                return;
            }
        }
        
        if (display.textContent === '0' && button.textContent !== '.') {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }
    });
});

// Operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (operator !== null && !shouldResetDisplay) {
            calculate();
        }
        
        firstNumber = display.textContent;
        operator = button.textContent;
        lastOperation.textContent = `${firstNumber} ${operator}`;
        shouldResetDisplay = true;
    });
});

// Equals button
equalsButton.addEventListener('click', () => {
    if (operator === null || shouldResetDisplay) return;
    
    calculate();
    operator = null;
});

// Clear button
clearButton.addEventListener('click', () => {
    display.textContent = '0';
    lastOperation.textContent = '';
    firstNumber = '';
    secondNumber = '';
    operator = null;
    shouldResetDisplay = false;
});

// Calculate function
function calculate() {
    secondNumber = display.textContent;
    
    let result;
    const first = parseFloat(firstNumber);
    const second = parseFloat(secondNumber);
    
    if (operator === '+') {
        result = first + second;
    } else if (operator === '−') {
        result = first - second;
    } else if (operator === '×') {
        result = first * second;
    } else if (operator === '÷') {
        if (second === 0) {
            alert("Can't divide by zero!");
            return;
        }
        result = first / second;
    }
    
    lastOperation.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    display.textContent = result.toString();
    firstNumber = result.toString();
    shouldResetDisplay = true;
}
