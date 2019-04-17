/**
 * core
 */
class Calculator {
    constructor() {
        this.setupOperatorDict();
        this.reset();
    }

    setupOperatorDict(){
        this.operatorDict = {};
        this.operatorDict["+"] = function(left, right){
            return parseInt(left)+ parseInt(right);
        }
        this.operatorDict["-"] = function(left, right){
            return left - right;
        }
        this.operatorDict["*"] = function(left, right){
            return left * right;
        }
        this.operatorDict["/"] = function(left, right){
            if(parseInt(right) == 0){
                return "Invalid Operation!"
            }
            return left / right;
        }
    }

    softReset(){
        this.left = "";
        this.right = "";
        this.operator = null;
    }

    reset(){
        this.lastResult = "0";
        this.output = null;
        this.input = null;
        this.softReset();
    }

    setOperator(operator){
        if(this.left == ""){
            this.left = this.lastResult;
        }
        if(this.operator == null){
            this.input = "";
        }
        this.operator = operator;
        this.output = this.left + operator;
    }

    setNumber(number){
        if(this.operator == null){
            this.left = this.left + number;
            this.input = this.left;
        } else {
            this.right += number;
            this.input = this.right;
        }
    }

    calculate(){
        if(this.left == "" || this.operator == null || this.right == ""){
            return;
        }
        this.input = this.operatorDict[this.operator](this.left, this.right);
        if (this.input == "Invalid Operation!"){
            this.lastResult = 0;
        } else{
            this.lastResult = this.input;
        }
        this.output = this.left + this.operator + this.right;
        this.softReset();
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
    if(event.target.id == "key-=") {
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
console.log(""/*TODO*/, "should be", 17);
console.log(""/*TODO*/, "should be", 15);
console.log(""/*TODO*/, "should be", 30);
console.log(""/*TODO*/, "should be", true); // true = hasError