/**
 * core
 */
class Calculator {
    constructor() {

    }
}


/**
 * UI
 */

function numberPressed (event){
    console.log("number pressed: " + event.target.value);
}

function operatorPressed(event){
    console.log("operator pressed: " + event.target.value);
}

function commandPressed(event){
    console.log("command pressed" + event.target.id);
}

window.addEventListener('DOMContentLoaded', function() {
    const calculator = new Calculator();
    const numbers = Array.from(document.getElementsByClassName("number"));
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