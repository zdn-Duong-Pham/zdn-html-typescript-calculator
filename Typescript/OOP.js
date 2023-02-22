var Calculator = /** @class */ (function () {
    function Calculator() {
        this.display = document.getElementById("display");
        this.buttons = document.querySelectorAll(".button");
        this.equal = document.getElementById("equal");
        this.currentVal = "0";
        this.operation = undefined;
        this.firstVal = undefined;
    }
    Calculator.prototype.start = function () {
        this.addEventListeners();
    };
    Calculator.prototype.addEventListeners = function () {
        var _this = this;
        this.buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                var buttonVal = button.textContent;
                if (buttonVal === "C") {
                    _this.clearDisplay();
                }
                else if (buttonVal === "+" ||
                    buttonVal === "-" ||
                    buttonVal === "*" ||
                    buttonVal === "/") {
                    _this.handleOperation(buttonVal);
                }
                else if (buttonVal === "=") {
                    _this.handleEqual();
                }
                else if (buttonVal === "&larr;") {
                    _this.handleBackspace();
                }
                else {
                    _this.handleNumber(buttonVal);
                }
            });
        });
    };
    Calculator.prototype.updateDisplay = function (val) {
        this.display.textContent = val;
    };
    Calculator.prototype.clearDisplay = function () {
        this.currentVal = "0";
        this.operation = undefined;
        this.firstVal = undefined;
        this.updateDisplay(this.currentVal);
    };
    Calculator.prototype.handleNumber = function (val) {
        if (this.currentVal === "0") {
            this.currentVal = val;
        }
        else {
            this.currentVal += val;
        }
        this.updateDisplay(this.currentVal);
    };
    Calculator.prototype.handleBackspace = function () {
        this.currentVal = this.currentVal.slice(0, -1);
        if (this.currentVal === "") {
            this.currentVal = "0";
        }
        this.updateDisplay(this.currentVal);
    };
    Calculator.prototype.handleOperation = function (op) {
        if (this.firstVal === undefined) {
            this.firstVal = parseFloat(this.currentVal);
        }
        else {
            var secondVal = parseFloat(this.currentVal);
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
    };
    Calculator.prototype.handleEqual = function () {
        if (this.firstVal !== undefined && this.operation !== undefined) {
            var secondVal = parseFloat(this.currentVal);
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
    };
    return Calculator;
}());
var calculator = new Calculator();
calculator.start();
