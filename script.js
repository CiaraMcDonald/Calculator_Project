//select all the DOM elements
const display1 = document.querySelector(".display-1");
const display2 = document.querySelector(".display-2");
const tempResult = document.querySelector("#temp-result");
const numbers = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const allClear = document.querySelector(".all-clear");
const back = document.querySelector(".back");
const zeros = document.querySelector(".number0")

//dis1Num will initially be empty
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;
let haveNumber0 = false;

//for each number element we want to add a click event 
//if the inner text does not have a dot add one when clicked
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
      //if it previously has a dot, don't add another - return don't continue adding dot 
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }

    //keep adding display 2 numbers when clicked
    dis2Num += e.target.innerText;
    //show them in display 2
    display2.innerText = dis2Num;
    // console.log();
  });
});

/*zeros.forEach((number0) => {
  number0.addEventListener("click", (e) => {
    if (e.target.innerText === "0" && !haveNumber0) {
      haveNumber0 = true;
//if it previously has a dot, don't add another - return don't continue adding dot 
    } else if (e.target.innerText === "0" && haveNumber0) {
      return;
    }
    //keep adding display 2 numbers when clicked
    dis2Num += e.target.innerText;
    //show them in display 2
    display2.innerText = dis2Num;
  });
}); */

//for each operation we want to add a click event
//if there is no number in display 2 - return don't continue adding operation (+ etc.)
operation.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;
    haveDot = false;
    //the operation name is what is typed e.g. "x"
    const operationName = e.target.innerText;
    //if we have these three numbers present do math operation
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
      // when we want to display temporary result, change the history back into a number
    } else {
      result = parseFloat(dis2Num);
    }
    //clear variable operation 
    clearVar(operationName);
    //let the lastOperation be the operation name clicked e.g. +
    lastOperation = operationName;
  });
});
//in the function clearVar clear number from display 2 and move to display 1
function clearVar(name = "") {
  //add display number 1 and display number two and operation name
  dis1Num += dis2Num + " " + name + " ";
  display1.innerText = dis1Num;
  //clear display 2
  display2.innerText = "";
  dis2Num = "";
  //temporary result will display the result
  tempResult.innerText = result;
}

//in the function math operation
//depending on the operaionName do the following
//parseFloat converts them back from a string they are stored in back to a number
function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }

  if (result.length > 5) {
    result = result.slice(0, 5)
    display2.innerText = result
  }
}
//if there is no display 1 number or display 2 number dont't continue with adding an equals
equal.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  //if the mathoperation is complete
  mathOperation();
  //update screen
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = "";
  dis2Num = result;
  dis1Num = "";
});
//in the allClear operation on a click event clear all displays
allClear.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  display1.innerText = "";
  display2.innerText = "";
  result = "";
  tempResult.innerText = "";
});

//in the back operation on a click, clear the last element in display 2
back.addEventListener("click", () => {
  display2.innerText = "";
  dis2Num = "";
});

//to use keyboard to operate calculator
//if we press any number
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  )
  //if the key matches the operation function
  {
    clickButtonEl(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
    //accounting for the * symbol being pressed - use the 'x' operation
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
  // console.log(e.key)
});
function clickButtonEl(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operation.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() {
  equal.click();
}
