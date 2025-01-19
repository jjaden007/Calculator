let runningTotal = 0;  // Stores the total calculation
let buffer = "0";  // Current number on screen
let previousOperator;  // Last operator used

const screen = document.querySelector('.screen'); // Screen display

function buttonClick(value) {
    if (isNaN(value)) {  // Check if button is a symbol
        handleSymbol(value);
    } else {
        handleNumber(value);  // Handle number input
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':  // Clear everything
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':  // Perform calculation
            if (!previousOperator) return;
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':  // Delete last digit
            buffer = buffer.length === 1 ? '0' : buffer.slice(0, -1);
            break;
        case '+': case '-': case '×': case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') return;

    const intBuffer = parseInt(buffer);
    runningTotal = runningTotal ? flushOperation(intBuffer) : intBuffer;
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') runningTotal += intBuffer;
    else if (previousOperator === '-') runningTotal -= intBuffer;
    else if (previousOperator === '×') runningTotal *= intBuffer;
    else if (previousOperator === '÷') runningTotal /= intBuffer;
}

function handleNumber(numberString) {
    buffer = buffer === '0' ? numberString : buffer + numberString;
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', event => 
        buttonClick(event.target.innerText));
}

init();
