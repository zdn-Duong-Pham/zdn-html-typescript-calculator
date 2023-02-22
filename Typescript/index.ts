// Query selectors
const display = document.getElementById('display') as HTMLDivElement;
const buttons = document.querySelectorAll('.button') as NodeListOf<HTMLDivElement>;
const equal = document.getElementById('equal') as HTMLDivElement;

// Calculator state
let currentVal = '0';
let operation: string | undefined;
let firstVal: number | undefined;

// Helper functions
function updateDisplay(val: string) {
  display.textContent = val;
}

function clearDisplay() {
  currentVal = '0';
  operation = undefined;
  firstVal = undefined;
  updateDisplay(currentVal);
}

function handleOperation(op: string) {
  if (firstVal === undefined) {
    firstVal = parseFloat(currentVal);
  } else {
    const secondVal = parseFloat(currentVal);
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
    const secondVal = parseFloat(currentVal);
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
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonVal = button.textContent;
    if (buttonVal === 'C') {
      clearDisplay();
    } else if (buttonVal === '+' || buttonVal === '-' || buttonVal === '*' || buttonVal === '/') {
      handleOperation(buttonVal);
    } else if (buttonVal === '=') {
      handleEqual();
    } else if (buttonVal === '&larr;') {
      currentVal = currentVal.slice(0, -1);
      if (currentVal === '') {
        currentVal = '0';
      }
      updateDisplay(currentVal);
    } else {
      if (currentVal === '0') {
        currentVal = buttonVal!;
      } else {
        currentVal += buttonVal!;
      }
      updateDisplay(currentVal);
    }
  });
});
