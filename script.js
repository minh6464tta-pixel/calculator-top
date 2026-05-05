let stack = [];
let temp = '';
let isFirstOperation = 1;
let main = document.querySelector("#main");
let secondary = document.querySelector("#secondary");
const buttonsPanel = document.querySelector(".buttons-panel");
const operators = "÷×−+";

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

buttonsPanel.addEventListener('click', event => {
  target = event.target;
  if(target.classList.value.includes("btn")) {

    if(target.id == "clear") {

      clear();

    } else if(target.id == "backspace") {

      backspace();

    } else if(!isNaN(target.value)) {
      
      handleNumberInput();

    } else if(operators.includes(target.value)) {
        
      handleOperatorInput();

    } else if(target.value == "=") {

      handleEqualInput();

    } else if(target.value == ".") {

      handleDecimalPointInput();

    }
  }
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

function handleNumberInput() {
  if(main.textContent == '0') {
    main.textContent = '';
    temp = '';
  }
  if(!isFirstOperation) {
    main.textContent = '';
    temp = '';
    isFirstOperation = 1;
  }
  main.textContent += target.value;
  temp += target.value;
}

function handleOperatorInput() {
  if (!(stack.length == 2 && temp == '')) {
    isFirstOperation = 1;
    stack.push(temp);
    temp = '';
    if(stack.length == 3) {
      startOperate();
      stack.push(temp);
      temp = '';
    }
    main.textContent += target.value;
    stack.push(target.value);
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
    temp += target.value;
    main.textContent += target.value;
  }
}