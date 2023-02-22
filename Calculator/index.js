class Calculator {
  constructor() {
    this.display = document.getElementById("display");
    this.buttons = document.querySelectorAll(".button");
    this.equation = "";
    this.currentValue = "";
    this.lastKeyWasOperator = false;
  }

  init() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () =>
        this.handleButtonPress(button.textContent)
      );
    });
  }

  handleButtonPress(key) {
    switch (key) {
      case "C":
        this.equation = "";
        this.currentValue = "";
        break;

      case "&larr;":
        this.equation = this.equation.slice(0, -1);
        break;

      case "=":
        this.calculate();
        break;

      default:
        if (this.isOperator(key)) {
          if (this.lastKeyWasOperator) {
            this.equation = this.equation.slice(0, -1);
          } else {
            this.calculate();
          }
          this.lastKeyWasOperator = true;
        } else {
          this.lastKeyWasOperator = false;
        }
        this.equation += key;
        this.currentValue += key;
        break;
    }

    this.updateDisplay();
  }

  calculate() {
    try {
      const result = eval(this.equation);
      this.currentValue = result.toString();
      this.equation = this.currentValue;
    } catch (error) {
      this.currentValue = "Error";
    }
  }

  updateDisplay() {
    this.display.textContent = this.currentValue;
  }

  isOperator(key) {
    return key === "/" || key === "*" || key === "-" || key === "+";
  }
}

const calculator = new Calculator();
calculator.init();
