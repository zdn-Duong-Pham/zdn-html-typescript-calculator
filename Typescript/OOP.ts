class Calculator {
    display: HTMLDivElement;
    buttons: NodeListOf<HTMLDivElement>;
    equal: HTMLDivElement;
    currentVal: string;
    operation: string | undefined;
    firstVal: number | undefined;
  
    constructor() {
      this.display = document.getElementById("display") as HTMLDivElement;
      this.buttons = document.querySelectorAll(".button") as NodeListOf<HTMLDivElement>;
      this.equal = document.getElementById("equal") as HTMLDivElement;
      this.currentVal = "0";
      this.operation = undefined;
      this.firstVal = undefined;
    }
  
    start() {
      this.addEventListeners();
    }
  
    addEventListeners() {
      this.buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const buttonVal = button.textContent;
          if (buttonVal === "C") {
            this.clearDisplay();
          } else if (
            buttonVal === "+" ||
            buttonVal === "-" ||
            buttonVal === "*" ||
            buttonVal === "/"
          ) {
            this.handleOperation(buttonVal);
          } else if (buttonVal === "=") {
            this.handleEqual();
          } else if (buttonVal === `←`) {
            this.handleBackspace();
          } else {
            this.handleNumber(buttonVal!);
          }
        });
      });
    }
  
    updateDisplay(val: string) {
      this.display.textContent = val;
    }
  
    clearDisplay() {
      this.currentVal = "0";
      this.operation = undefined;
      this.firstVal = undefined;
      this.updateDisplay(this.currentVal);
    }
  
    handleNumber(val: string) {
      if (this.currentVal === "0") {
        this.currentVal = val;
      } else {
        this.currentVal += val;
      }
      this.updateDisplay(this.currentVal);
    }
  
    handleBackspace() {
      this.currentVal = this.currentVal.slice(0, -1);
      if (this.currentVal === "") {
        this.currentVal = "0";
      }
      this.updateDisplay(this.currentVal);
    }
  
    handleOperation(op: string) {
      if (this.firstVal === undefined) {
        this.firstVal = parseFloat(this.currentVal);
      } else {
        const secondVal = parseFloat(this.currentVal);
        switch (this.operation) {
          case "+":
            this.firstVal += secondVal;
            break;
          case "-":
            this.firstVal -= secondVal;
            break;
          case "*":
            this.firstVal *= secondVal;
            break;
          case "/":
            this.firstVal /= secondVal;
            break;
        }
      }
      this.currentVal = "0";
      this.operation = op;
    }
  
    handleEqual() {
      if (this.firstVal !== undefined && this.operation !== undefined) {
        const secondVal = parseFloat(this.currentVal);
        switch (this.operation) {
          case "+":
            this.currentVal = (this.firstVal + secondVal).toString();
            break;
          case "-":
            this.currentVal = (this.firstVal - secondVal).toString();
            break;
          case "*":
            this.currentVal = (this.firstVal * secondVal).toString();
            break;
          case "/":
            this.currentVal = (this.firstVal / secondVal).toString();
            break;
        }
        this.firstVal = undefined;
        this.operation = undefined;
        this.updateDisplay(this.currentVal);
      }
    }
  }
  
  const calculator = new Calculator();
  calculator.start();
  