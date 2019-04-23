/**
 * core
 */
class Calculator {
    constructor() {
        this.setupOperatorDict();
        this.errorMessage = "Invalid Operation!";
        this.reset();
    }

    setupOperatorDict(){
        this.operatorDict = {};
        this.operatorDict["+"] = (left, right)=>{
            return left + right;
        };
        this.operatorDict["-"] = (left, right)=>{
            return left - right;
        };
        this.operatorDict["*"] = (left, right)=>{
            return left * right;
        };
        this.operatorDict["/"] = (left, right)=>{
            if(right === 0){
                return this.errorMessage;
            }
            return left / right;
        };
    }

    softReset(){
        this.left = null;
        this.right = null;
        this.operator = null;
    }

    reset(){
        this.lastResult = 0;
        this.output = "Welcome";
        this.input = null;
        this.softReset();
    }

    setOperator(operator){
        if(this.left === null){
            this.left = this.lastResult;
        }
        if(this.operator == null){
            this.input = null;
        }
        this.operator = operator;
        this.output = this.left + " " + operator;
    }

    setNumber(numberStr){
        const number = parseInt(numberStr);
        if(this.operator == null){
            this.left = this.left*10 + number;
            this.input = this.left;
        } else {
            this.right = this.right*10 + number;
            this.input = this.right;
        }
    }

    calculate(){
        if(this.left === null || this.operator == null || this.right === null){
            return;
        }
        this.input = this.operatorDict[this.operator](this.left, this.right);
        if (this.input === this.errorMessage){
            this.lastResult = 0;
        } else{
            this.lastResult = this.input;
        }
        this.output = this.left + " " + this.operator + " " + this.right;
        this.softReset();
    }

    hasError(){
        return this.input === this.errorMessage;
    }
}

/**
 * UI
 */

const calculator = new Calculator();
let input;
let output;

function refresh(){
    input.innerHTML = calculator.input;
    output.innerHTML = calculator.output;
}

function numberPressed (event){
    calculator.setNumber(event.target.value);
    refresh();
}

function operatorPressed(event){
    calculator.setOperator(event.target.value);
    refresh();
}

function commandPressed(event){
    if(event.target.id === "key-=") {
        calculator.calculate();
    }else{
        calculator.reset();
    }
    refresh();
}

window.addEventListener('DOMContentLoaded', function() {
    const numbers = Array.from(document.getElementsByClassName("number"));
    input = document.getElementById("input");
    output = document.getElementById("output");
    refresh();

    for(const number of numbers){
        number.addEventListener("click", numberPressed);
    }

    const operators = Array.from(document.getElementsByClassName("operator"));
    for(let element of operators){
        element.addEventListener("click", operatorPressed);
    }

    const commands = Array.from(document.getElementsByClassName("command"));
    for(let element of commands){
        element.addEventListener("click", commandPressed);
    }
});

/**
 * Tests Scenarios
 */
const testCalc = new Calculator();

testCalc.setNumber(4);
testCalc.setOperator("+");
testCalc.setNumber(13);
testCalc.calculate();
console.log(testCalc.input + " should be " + 17);

testCalc.setNumber(20);
testCalc.setOperator("-");
testCalc.setNumber(5);
testCalc.calculate();
console.log(testCalc.input + " should be " + 15);

testCalc.setNumber(6);
testCalc.setOperator("*");
testCalc.setNumber(5);
testCalc.calculate();
console.log(testCalc.input + " should be " + 30);

testCalc.setNumber(4);
testCalc.setOperator("/");
testCalc.setNumber(0);
testCalc.calculate();
console.log(testCalc.hasError() + " should be " + true);
