function operate(a, operator, b) {
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

let stack = [];
let temp = '';

let main = document.querySelector("#main");
let secondary = document.querySelector("#secondary");
const buttonsPanel = document.querySelector(".buttons-panel");
const operators = "÷×−+"
buttonsPanel.addEventListener('click', event => {
  target = event.target;
  if(target.classList.value.includes("btn")) {

    if(target.id == "clear") {
      main.textContent = '0';
      secondary.textContent = '';
      temp = '0';
      popStack();
    } else if(target.id == "backspace") {
      
    } else {
      
      if(!isNaN(target.value)) {
        if(main.textContent == '0') {
          main.textContent = '';
          temp = '';
        }
        main.textContent += target.value;
        temp += target.value;
      } else if(operators.includes(target.value)) {

        if (!(stack.length == 2 && temp == '')) {
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
      } else if(target.value == "=") {
        // Operates
        if(stack.length == 2 && temp != '') {
          stack.push(temp);
          startOperate();
        }
      }
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

// After every operator we add temp to the stack