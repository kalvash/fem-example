// calculator needs three things: a running total, tracking  user input, and tracking  previous input. 'buffer' identifies waiting for user input. previousOperator identifies past input

let runningTotal = 0;
let buffer = "0"; 
// this is a string because what's in calc is string already
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  reRender();
}

//this function performs two different things if a number or symbol is the input. First we ask "is value number or not". Using function isNotANumber isNaN. It checks parseInt which identifies numbers. If not a number, it handles the symbol. Else, it handles number

function handleNumber(value) {
  if (buffer === "0") {
  buffer = value;
  } else {
    buffer += value;
  }
}

//references global let, if true, buffer becomes value input. If false, append to previous input. += is addition assignment. it adds the right operand value to the variable buffer

function handleSymbol(value) {
  switch (value) {
    case 'C':
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case '=':
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
      case '←':
        if (buffer.length === 1) {
            buffer = "0";
        } else {
          buffer = buffer.substring(0, buffer.length - 1);
        }
        break;
        default:
          handleMath(value);
          break;
  }
}

//switch case replaces long strings of if else lines. Break ends each case. Null is NOT Zero. It is the absence of anything. Return immediately ends the function. flushOperation will turns the buffer into a number and passes it to flushOperation. REMEMBER we start at 0 not 1

//You cannot use HTML code to represent symbols. it will come back with an error.

function  handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;

  buffer = "0";
}

function flushOperation (intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
      runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
      } else if (previousOperator === "÷") {
          runningTotal /= intBuffer;
  }
}

//this is the actual commiting of the math. Use assignment operators to do the math

function reRender() {
  screen.innerText = buffer;
}

// This function updates the screen after other functions execute

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function(event) {
  buttonClick(event.target.innerText);
});

//"calc-buttons" is the container (HTML section class="calc-buttons") YOU MUST PUT EVENT in function params to define the event about to be tracked