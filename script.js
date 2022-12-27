"strict mode";

const previousvalueEl = document.querySelector(".input-history");

const currentValueEL = document.querySelector(".current-input");

const ans = document.querySelector(".ans");

const clear = document.querySelector(".clear");

const del = document.querySelector(".del");

const points = document.querySelector(".points");

const equals = document.querySelector(".equals");

const alternate = document.querySelector(".alternate");

const numbers = document.querySelectorAll(".numbers");

const operand = document.querySelectorAll(".operand");
function loopHold(mainBtn) {
  operand.forEach((btn) => {
    btn.classList.remove("operand-hold");
  });

  mainBtn.classList.add("operand-hold");
}

class Calculator {
  previousValue;
  currentValue;
  operationType;
  ans;
  operandState = false;
  operandClickTimes = 0;
  count = 0;

  eq = false;

  constructor() {
    this.numberEvent();
    this.operandEvent();
    this.addPoints();
    this.equalsTo();
    this.alternate();
    this.del();
    this.clear();
  }

  /////

  clear() {
    const app = this;
    clear.addEventListener("click", function () {
      app.previousValue = undefined;
      app.currentValue = undefined;
      app.ans = undefined;
      app.operandState = false;
      app.operandClickTimes = 0;
      app.count = 0;
      currentValueEL.textContent = 0;
      previousvalueEl.textContent = 0;
      app.operationType = undefined;
    });
  }
  /////////

  del() {
    del.addEventListener("click", function () {
      currentValueEL.textContent = currentValueEL.textContent.slice(
        0,
        length - 1
      );
      if (
        currentValueEL.textContent === "0" ||
        currentValueEL.textContent === "0."
      ) {
        currentValueEL.textContent = "0";
      }
      if (
        currentValueEL.textContent.length < 1 ||
        currentValueEL.textContent === "-"
      ) {
        currentValueEL.textContent = "0";
      }
    });
  }

  ////////////

  numberEvent() {
    const app = this;
    numbers.forEach((button) => {
      button.addEventListener("click", function (e) {
        if (currentValueEL.textContent.length > 33) {
          currentValueEL.textContent =
            currentValueEL.textContent.split("").slice(0, -1).join("") +
            button.textContent;

          //   console.log(currentValueEL.textContent);

          return;
        }

        operand.forEach((btn) => {
          btn.classList.remove("operand-hold");
        });
        app.appendNumber(button.textContent);
        app.operandState = true;
        app.operandClickTimes = 0;
        // console.log(app.operandState);
      });
    });
  }

  /////////////

  operandEvent() {
    // if(this.operandClickTimes < 1) return
    const app = this;
    operand.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        if (!app.operandState) return;

        if (app.operandClickTimes > 0) {
          loopHold(btn);

          ///asign operand type

          app.operationType = btn.getAttribute("data-dType");
          ///////
          console.log("1");
          return;
        }

        if (app.count > 0 && app.operandClickTimes < 1) {
          if (currentValueEL.textContent === "0") {
            app.operationType = btn.getAttribute("data-dType");
            loopHold(btn);
            return;
          }
          app.currentValue = +currentValueEL.textContent;

          app.ans = app.operation(
            app.operationType,
            app.previousValue,
            app.currentValue
          );

          previousvalueEl.textContent = app.ans;
          app.previousValue = app.ans;
          //   console.log(app.ans);

          currentValueEL.textContent = "0";

          loopHold(btn);

          ///asign operand type

          app.operationType = btn.getAttribute("data-dType");
          ///////
          //   console.log(app.operationType);
          console.log("2");
          console.log(app.count, app.operandClickTimes);

          return;
        }

        if (app.operandState) {
          app.previousValue = +currentValueEL.textContent;

          previousvalueEl.textContent = app.previousValue;

          currentValueEL.textContent = "0";

          app.operandClickTimes++;

          ////llop to remove and hold

          loopHold(btn);

          ///asign operand type

          app.operationType = btn.getAttribute("data-dType");
          ///////
          //   console.log(app.operationType);
          console.log("3");

          app.count++;
        }
      });
    });
  }

  /////////

  appendNumber(number) {
    if (currentValueEL.textContent === "0") {
      currentValueEL.textContent = "";
    }
    currentValueEL.textContent += number;
  }

  ///////////////

  operation(type, val1, val2) {
    let answer;
    if (type === "additions") {
      answer = val1 + val2;
    }
    if (type === "subtract") {
      answer = val1 - val2;
    }
    if (type === "multiply") {
      answer = val1 * val2;
    }
    if (type === "divide") {
      answer = val1 / val2;
    }

    // console.log(val1);
    // console.log(val2);
    // console.log(type);
    return answer;
  }

  addPoints() {
    const app = this;
    points.addEventListener("click", function (e) {
      if (currentValueEL.textContent.includes("0.")) {
        return;
      }
      if (currentValueEL.textContent.includes(".")) {
        return;
      }
      if (currentValueEL.textContent === "0") {
        app.appendNumber("0" + points.textContent);
        return;
      }
      app.appendNumber(points.textContent);
    });
  }

  alternate() {
    alternate.addEventListener("click", function () {
      if (currentValueEL.textContent.includes("-")) {
        currentValueEL.textContent = currentValueEL.textContent.slice(1);
        return;
      }

      currentValueEL.textContent = `-${currentValueEL.textContent}`;
    });
  }

  equalsTo() {
    const app = this;
    equals.addEventListener("click", function (e) {
      if (app.count > 0 && app.operandState) {
        app.previousValue = +previousvalueEl.textContent;

        app.currentValue = +currentValueEL.textContent;

        // console.log(app.previousValue, app.currentValue);

        app.ans = app.operation(
          app.operationType,
          app.previousValue,
          app.currentValue
        );

        currentValueEL.textContent = app.ans;

        app.eq = true;
        app.operandClickTimes = 0;
        app.count = 0;
      }
    });
  }
}

const calc = new Calculator();

const st = "-0.3";

// console.log(+st - 1);
