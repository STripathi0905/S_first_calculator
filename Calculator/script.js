let currentInput = '';
let currentOperator = '';
let previousInput = '';
let shouldResetDisplay = false;

function updateDisplay(value) {
    const output = document.getElementById('output');
    output.textContent = value || '0';
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple decimal points
    if (num === '.' && currentInput.includes('.')) return;
    
    // Prevent leading zeros
    if (num === '0' && currentInput === '0') return;
    if (num !== '0' && num !== '.' && currentInput === '0') {
        currentInput = '';
    }
    
    currentInput += num;
    updateDisplay(currentInput);
}

function appendOperator(operator) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        calculate();
    }
    
    previousInput = currentInput;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (currentOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Round to prevent floating point precision issues
    result = Math.round(result * 1000000) / 1000000;
    
    currentInput = result.toString();
    previousInput = '';
    currentOperator = '';
    updateDisplay(currentInput);
    shouldResetDisplay = true;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    shouldResetDisplay = false;
    updateDisplay('0');
}