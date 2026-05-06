let stack = [];
let temp = '';
let isFirstOperation = 1;
let main = document.querySelector("#main");
let secondary = document.querySelector("#secondary");
const buttonsPanel = document.querySelector(".buttons-panel");
const operators = "÷×−+*/";

function operate(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);

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

buttonsPanel.addEventListener('click', (event) => {
  const target = event.target;
  if(target.classList.value.includes("btn")) {

    handleInputs(target.value);

  }
})

document.addEventListener('keydown', (event) => {
  const keyboardToClick = {
    "Enter": "=",
    "*": "×",
    "/": "÷",
    "Backspace": "backspace",
    "Delete": "clear",
  }
  const value = keyboardToClick[event.key] ?? event.key;

  handleInputs(value);

})

function popStack() {
  while(stack.length > 0) {
    stack.pop();
  }
}

function startOperate() {
  secondary.textContent = main.textContent;    
  main.textContent = operate(...stack);
  popStack();
  temp = main.textContent;
}

function clear() {
  main.textContent = '0';
  secondary.textContent = '0';
  temp = '0';
  popStack();
}

function backspace() {
  let lastLetter = main.textContent.at(-1);
  if(!isNaN(lastLetter)) {
    temp = temp.slice(0, -1); // Remove the last letter from temp
  } else if (operators.includes(lastLetter)) {
    stack.pop();
    temp = stack.pop();
  }
  main.textContent = main.textContent.slice(0, -1);
  if(main.textContent.length == 0) {
    main.textContent = '0';
    temp = 0;
  }
}

function handleNumberInput(value) {
  if(main.textContent == '0') {
    main.textContent = '';
    temp = '';
  }
  if(!isFirstOperation) {
    main.textContent = '';
    temp = '';
    isFirstOperation = 1;
  }
  main.textContent += value;
  temp += value;
}

function handleOperatorInput(value) {
  if (!(stack.length == 2 && temp == '')) {
    // Execute only stack length is not 2 (there's already an operator) or temp is not empty (there's no inputed number)
    isFirstOperation = 1;
    stack.push(temp);
    temp = '';
    if(stack.length == 3) {
      startOperate();
      stack.push(temp);
      temp = '';
    }
    main.textContent += value;
    stack.push(value);
  }
}

function handleEqualInput() {
  // Operates
  if(stack.length == 2 && temp != '') {
    stack.push(temp);
    startOperate();
    isFirstOperation = 0;
  }
}

function handleDecimalPointInput() {
  if(!temp.includes(".")) {
    temp += ".";
    main.textContent += ".";
  }
}

function handleInputs(value) {

  if(value == "clear") {

    clear();

  } else if(value == "backspace") {

    backspace();

  } else if(!Number.isNaN(parseInt(value))) {
    
    handleNumberInput(value);

  } else if(operators.includes(value)) {
      
    handleOperatorInput(value);

  } else if(value == "=") {

    handleEqualInput();

  } else if(value == ".") {

    handleDecimalPointInput();

  }

}