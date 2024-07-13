let num1 = null;
let num2  = null;
let operator  = null;
let num2FirstNumber = false;
let num2Entered = false;
const calculatorDisplay = document.querySelector(".calculator-display");

function operate(num1, num2, operator){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch(operator){
        case "+": 
            return num1 + num2;
        case "-": 
            return num1 - num2;
        case "*": 
            return num1 * num2;
        case "/": 
            return num1 / num2;
    }
}

document
.querySelectorAll(".numbers")
.forEach(numberBtn => {
   numberBtn.addEventListener("click",() =>{
    if(numberBtn.value === "." && calculatorDisplay.textContent.includes(".")) return;

    if(num1 && operator){
        if(num2FirstNumber){
            calculatorDisplay.textContent = numberBtn.value;
            num2FirstNumber = false;
        }else{
            calculatorDisplay.textContent += numberBtn.value;
        }
        num2Entered = true;
        return;
    }
    if(calculatorDisplay.textContent === "0"){
        calculatorDisplay.textContent = numberBtn.value;
    }else{
        calculatorDisplay.textContent += numberBtn.value;
    }
   });
});

document
.querySelectorAll(".operators")
.forEach(numberBtn => {
   numberBtn.addEventListener("click",() =>{
    if(num2Entered){
        num2 = parseFloat(calculatorDisplay.textContent);
        calculatorDisplay.textContent = operate(num1, num2, operator);
        num2Entered = false;
    }
    num1 = parseFloat(calculatorDisplay.textContent);
    operator = numberBtn.value;
    num2FirstNumber = true;
   });
});


document
.querySelector(".equal")
.addEventListener("click",() => {
    if(!num2Entered) return;
    num2 = parseFloat(calculatorDisplay.textContent);
    let result = operate(num1, num2, operator);
    if(Number.isInteger(result)) calculatorDisplay.textContent = result;
    else calculatorDisplay.textContent = result.toFixed(6);
    
    num1 = num2 = operator = null;
    num2Entered = false;
});

document
.querySelector(".clear-all")
.addEventListener("click",() => {
    calculatorDisplay.textContent = "0";
    num1 = num2 = operator = null;
    num2Entered = num2FirstNumber = false;
});

document
.querySelector(".clear-entrie")
.addEventListener("click",(event) => {
    if(!num2Entered){
        if(operator) {
            operator = null;
            return;
        }
    }
    calculatorDisplay.textContent = calculatorDisplay.textContent.
    slice(0, calculatorDisplay.textContent.length - 1);

    if(calculatorDisplay.textContent === "") {
        calculatorDisplay.textContent = "0"; 
    }
});