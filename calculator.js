//new 
var numBtns = document.getElementsByClassName('btn_num');
var operatorBtns = document.getElementsByClassName('btn_operator');
var btnDecimal = document.querySelector('.calc_decimal');
var btnClear = document.getElementById('calc_Clear');
var display = document.getElementById('display');
//can
var displayVal = '0';
var pendingVal;
var evalStringArry = [];

// Update the display value when a number button is clicked
var updateDisplayVal = (clickObj) => {
  var btnText = clickObj.target.innerText;

  if (displayVal === '0') {
    displayVal = '';
  }
  displayVal += btnText;
  display.innerText = displayVal;
};

// Perform the calculation operation operator is clicked
var performOperation = (clickObj) => {
  var operator = clickObj.target.innerText;

  if (pendingVal !== undefined) {
    evalStringArry.push(displayVal);

    try {
      var expression = evalStringArry.join(' ');
      var evaluation = eval(expression); // Evaluate the joined expression
      displayVal = evaluation.toString();
      // Show only the result in the display
      display.innerText = displayVal;
      evalStringArry = []; // Clear expression array
    } catch (e) {
      display.innerText = 'Error';
      evalStringArry = [];
    }
  } else {
    evalStringArry.push(displayVal);
  }

  switch (operator) {
    case '+':
    case '-':
    case '×':
    case '÷':
      evalStringArry.push(operator === '×' ? '*' : operator === '÷' ? '/' : operator);
      displayVal = '0';
      display.innerText = `${evalStringArry.join(' ')} ${displayVal}`;
      pendingVal = displayVal;
      break;

    case '%':
      evalStringArry.push(displayVal);
      try {
        var per = parseFloat(displayVal) / 100;
        displayVal = per.toString();
        display.innerText = displayVal;
        evalStringArry = []; // Clear the expression array
      } catch (e) {
        display.innerText = 'Error';
      }
      pendingVal = undefined;
      break;

    case '+/-':
      try {
        var neg = -parseFloat(displayVal);
        displayVal = neg.toString();
        display.innerText = displayVal;
      } catch (e) {
        display.innerText = 'Error';
      }
      evalStringArry = [];
      pendingVal = undefined;
      break;

    case '=':
      evalStringArry.push(displayVal);
      try {
        var finalExpression = evalStringArry.join(' ');
        var finalResult = eval(finalExpression); // Evaluate the final expression
        displayVal = finalResult.toString();
        // Show only the result in the display
        display.innerText = displayVal;
      } catch (e) {
        display.innerText = 'Error';
      }
      evalStringArry = []; // Clear the expression array
      pendingVal = undefined;
      break;

    default:
      break;
  }
};

// Add event listeners to number buttons
for (var i = 0; i < numBtns.length; i++) {
  numBtns[i].addEventListener('click', updateDisplayVal, false);
}

// Add event listeners to operator buttons
for (var i = 0; i < operatorBtns.length; i++) {
  operatorBtns[i].addEventListener('click', performOperation, false);
}

// Add event listener to decimal button
btnDecimal.addEventListener('click', () => {
  if (!displayVal.includes('.')) {
    displayVal += '.';
    display.innerText = displayVal;
  }
});

// Add event listener to clear button
btnClear.addEventListener('click', () => {
  displayVal = '0';
  pendingVal = undefined;
  evalStringArry = [];
  display.innerText = displayVal;
});
