function operate(string) {
  // Detect the operator in the string
  let operator = '';
  for(let i = 0; i < string.length; i++) {
    if(operators.includes(string[i])) {
      operator = string[i];
      break;
    }
  }

  let [a, b] = string.split(operator);
  a = parseInt(a);
  b = parseInt(b);

  switch(operator) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b ) {
  return a / b;
}

let display = document.querySelector("#display");
let result = document.querySelector("#display-result");
const buttonsPanel = document.querySelector(".buttons-panel");
const operators = "÷×−+"
buttonsPanel.addEventListener('click', event => {
  target = event.target;
  if(target.classList.value.includes("btn")) {

    if(target.id == "clear") {
      display.textContent = '0';
      result.textContent = '';
    } else {
      if(display.textContent == '0') display.textContent = '';
      
      if(!isNaN(target.value)) {
        display.textContent += target.value;
      } else if(operators.includes(target.value)) {

        if(operators.includes(display.textContent.at(-1))) {}
        else {
          if(display.textContent
            .split('')
            .some(item => operators.includes(item))
          ) {
            // Operator detected, Operates
            result.textContent = operate(display.textContent);
          } else {
            // No operator detected, add the operator to display
            display.textContent += target.value;
          }
        }

      } else if(target.value == "=") {
        // Operates
        result.textContent = operate(display.textContent);
      }
    }
  }
})

// Once you press an operator, also check if the last letter typed in is an operator
// If true do nothing
// If false
// Once you press an operator
// Check the whole string if it is containing an operator
// If false do nothing
// If true start operating

