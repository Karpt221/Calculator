let num1 = null;
let num2  = null;
let operator  = null;

let waitingForFirstNum2Number = false;
let num1Typed = false;
let operatorTyped = false;
let num2Typed = false;

let choosedOperatorButton = null;
const display = document.querySelector(".calculator-display");

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

function resetAllVariables(){
    if(choosedOperatorButton !== null)
        choosedOperatorButton.style.backgroundColor = "orange";
    choosedOperatorButton = null;
    num1 = null;
    num2 = null;
    operator = null;
    num1Typed = false;
    operatorTyped = false;
    num2Typed = false;
    waitingForFirstNum2Number = false;
}

function displayResult(){
    num2 = parseFloat(display.textContent);
    let result = operate(num1, num2, operator);
    let fractionalPartLength = 0;
    if(!Number.isInteger(result)){
        fractionalPartLength = result
        .toString()
        .split(".")[1]
        .length;
    }
    if(fractionalPartLength > 6){
        display.textContent = result.toFixed(6);
    }else{
        display.textContent = result;
    }
}

document
.querySelectorAll(".numbers")
.forEach(numberBtn => {
   numberBtn.addEventListener("click",() =>{
    if(numberBtn.value === "." && display.textContent.includes(".")) return;

    if(num1Typed && operatorTyped){
        if(waitingForFirstNum2Number){
            display.textContent = numberBtn.value;
            waitingForFirstNum2Number = false;
        }else{
            display.textContent += numberBtn.value;
        }
        if(!num2Typed) num2Typed = true;
        
        return;
    }
    if(display.textContent === "0"){
        display.textContent = numberBtn.value;
    }else{
        display.textContent += numberBtn.value;
    }
   });
});

document
.querySelectorAll(".operators")
.forEach(operatorBtn => {
    operatorBtn.addEventListener("click",() =>{
        operatorBtn.style.backgroundColor = "mediumslateblue";
        if(choosedOperatorButton !== null &&
            !operatorBtn.isEqualNode(choosedOperatorButton)){
                choosedOperatorButton.style.backgroundColor = "orange";
        }
        choosedOperatorButton = operatorBtn;

        if(num2Typed){
            displayResult();
            num2 = null;
            num2Typed = false;
            console.log(`num2Typed: ${num2Typed}`);
        }
        num1 = parseFloat(display.textContent);
        operator = operatorBtn.value;
        num1Typed = true;
        operatorTyped = true;
        waitingForFirstNum2Number = true;

   });
});


document
.querySelector(".equal")
.addEventListener("click",() => {
    if(!num2Typed) return;
    displayResult();
    resetAllVariables();
});

document
.querySelector(".clear-all")
.addEventListener("click",() => {
    display.textContent = "0";
    resetAllVariables();
});

document
.querySelector(".clear-entrie")
.addEventListener("click",() => {
    if(!num2Typed && operatorTyped){
        choosedOperatorButton.style.backgroundColor = "orange";
        choosedOperatorButton = null;
        operator = null;
        operatorTyped = false;
        return;
    }
     
    display.textContent = display.textContent
    .slice(0, display.textContent.length - 1);

    if(display.textContent === "") {
        if(num2Typed){
            waitingForFirstNum2Number = true;
        }
        display.textContent = "0"; 
        
    }
});