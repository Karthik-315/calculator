const display = document.querySelector(".display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");

let num1;
let num2;
let operator;
let calculationResult = null;
let displayNeedsClearing = false;
let secondNumberInputted = false;

function operate(num1, num2, operator) {
    num1 = +num1;
    num2 = +num2;

    const add = (num1, num2) => num1 + num2;
    const subtract = (num1, num2) => num1 - num2;
    const multiply = (num1, num2) => num1 * num2;
    const divide = (num1, num2) => num1 / num2;

    switch (operator) {
        case "+":
            return add(num1, num2);
        case "−":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    }
};

clearBtn.addEventListener("click", () => {
    num1 = null;
    operator = null;
    num2 = null;
    display.textContent = 0;
    secondNumberInputted = false;
    calculationResult = null;
});

function displayDigit(e) {
    if (display.textContent == 0 || displayNeedsClearing) {
        display.textContent = "";
        displayNeedsClearing = false;
    }
    display.textContent += e.target.textContent;
};
digitBtns.forEach(btn => btn.addEventListener("click", displayDigit));

function handleOperationBtnClick(e) {
    console.log("second number inputted?", secondNumberInputted)
    if (!secondNumberInputted) {
        num1 = display.textContent;
    } else if (secondNumberInputted) {
        num2 = display.textContent;
        calculationResult = operate(num1, num2, operator);
        display.textContent = calculationResult;
        displayNeedsClearing = true;

        // prep for chain calculations
        num1 = calculationResult;
        secondNumberInputted = false;
    };

    digitBtns.forEach(
        btn => btn.addEventListener("click",
            () => secondNumberInputted = true,
            { once: true }));

    operator = e.target.textContent;
    console.log("current operator:", operator);
    console.log("num1:", num1)
    console.log("num2:", num2);

    displayNeedsClearing = true;
};
operatorBtns.forEach(btn => btn.addEventListener("click", handleOperationBtnClick));

function handleEqualBtnClick() {
    if (!num1 || !secondNumberInputted) return;
    num2 = display.textContent;
    calculationResult = operate(num1, num2, operator);
    display.textContent = calculationResult;
    displayNeedsClearing = true;

    // prep for chain calculations
    num1 = calculationResult;
    secondNumberInputted = false;
};
equalsBtn.addEventListener("click", handleEqualBtnClick)

//TODO: RESIZE NUMBERS TO MAKE SURE IT FITS WITHIN THE DISPLAY CONTAINER?