// Query selectors
var display = document.getElementById('display');
var buttons = document.querySelectorAll('.button');
var equal = document.getElementById('equal');
// Calculator state
var currentVal = '0';
var operation;
var firstVal;
// Helper functions
function updateDisplay(val) {
    display.textContent = val;
}
function clearDisplay() {
    currentVal = '0';
    operation = undefined;
    firstVal = undefined;
    updateDisplay(currentVal);
}
function handleOperation(op) {
    if (firstVal === undefined) {
        firstVal = parseFloat(currentVal);
    }
    else {
        var secondVal = parseFloat(currentVal);
        switch (operation) {
            case '+':
                firstVal += secondVal;
                break;
            case '-':
                firstVal -= secondVal;
                break;
            case '*':
                firstVal *= secondVal;
                break;
            case '/':
                firstVal /= secondVal;
                break;
        }
    }
    currentVal = '0';
    operation = op;
}
function handleEqual() {
    if (firstVal !== undefined && operation !== undefined) {
        var secondVal = parseFloat(currentVal);
        switch (operation) {
            case '+':
                currentVal = (firstVal + secondVal).toString();
                break;
            case '-':
                currentVal = (firstVal - secondVal).toString();
                break;
            case '*':
                currentVal = (firstVal * secondVal).toString();
                break;
            case '/':
                currentVal = (firstVal / secondVal).toString();
                break;
        }
        firstVal = undefined;
        operation = undefined;
        updateDisplay(currentVal);
    }
}
// Event listeners
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        var buttonVal = button.textContent;
        if (buttonVal === 'C') {
            clearDisplay();
        }
        else if (buttonVal === '+' || buttonVal === '-' || buttonVal === '*' || buttonVal === '/') {
            handleOperation(buttonVal);
        }
        else if (buttonVal === '=') {
            handleEqual();
        }
        else if (buttonVal === '&larr;') {
            currentVal = currentVal.slice(0, -1);
            if (currentVal === '') {
                currentVal = '0';
            }
            updateDisplay(currentVal);
        }
        else {
            if (currentVal === '0') {
                currentVal = buttonVal;
            }
            else {
                currentVal += buttonVal;
            }
            updateDisplay(currentVal);
        }
    });
});
