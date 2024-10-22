let display = document.querySelector(".display");
let btns = document.querySelectorAll("button");
let num1 = '';
let oprt = '';
let num2 = '';

function disableButtons(disable) {
    btns.forEach(button => {
        if (button.textContent !== "AC" && button.textContent !== "C") {
            button.disabled = disable;
        }
    });
}

btns.forEach(button => {
    button.addEventListener('click', () => {
        let value = button.textContent;

        if (value === "AC") {
            display.value = "";
            num1 = '';
            num2 = '';
            oprt = '';
            disableButtons(false);
        } 
        else if (value === "C") {
            if (num1 && num2 && oprt) {
                num2 = num2.slice(0,-1);
                display.value = num1 + oprt+num2;
            } else if (num1 && oprt && !num2) {
                oprt = '';
                display.value = num1;
            } else if (num1 && !oprt && !num2) {
                num1 = num1.slice(0,-1);
                display.value = num1;
            }   
        }
        else if(value === "Ans" && !num1 && !num2) {
            display.value = '';
  
            
        }
        else if (['+', '-', 'x', '÷', '%'].includes(value)) {
            if (num1 && !oprt) {
                oprt = value;
                display.value += oprt;
            }
        } 
        else if (value === '.') {
            if (!oprt && !num1.includes('.')) {
                num1 += value;
                display.value = num1;
            } else if (oprt && !num2.includes('.')) {
                num2 += value;
                display.value = num1 + oprt + num2;
            }
        }
        else if (!num1) {
            num1 = value;
            display.value += num1;
        } 
        else if (value === "Ans" && num1 && !num2) {
            let ans = calculate(num1, num1, oprt);
            display.value = ans;
            num1 = ans.toString();
           
        }

        else if (num1 && oprt) {
            if (!num2) {
                num2 += value;
                display.value = num1 + oprt + num2;
            }
            else if (value === "Ans") {
                let ans = calculate(num1, num2, oprt);
                display.value = ans;
                num1 = ans.toString();
                num2 = '';
                oprt = '';
            }
            else {
                num2 += value;
                display.value = num1 + oprt + num2;
            }
        }
        else if (num1 && oprt && num2.includes('.') && value !== '.' && value !== "Ans") {
            num2 += value;
            display.value = num1 + oprt + num2;
        }
        else if (num1 && !oprt) {
            num1 += value;
            display.value = num1;
        }
        else if (value === "Ans" &&num1 &&num2 &&oprt) {
            
            let ans = calculate(num1, num2, oprt);
            if(display.value==="ERROR"){
               display.value=ans;
                
            }
            display.value = ans;
            num1 = ans.toString();
            num2 = '';
            oprt = '';
           
        }
    });
});
function calculate(num1, num2, oprt) {
    if (oprt === "+") {
        return Number(num1) + Number(num2);
    }
    else if (oprt === "-") {
        return Number(num1) - Number(num2);
    }
    else if (oprt === "x") {
        let result = Number(num1) * Number(num2);
        if (result === Infinity || result === -Infinity) {
            disableButtons(true);
            return "ERROR";
        }
        if (result >= 1e15) {
            result = result.toExponential();
        }
        return result;
    }
    else if (oprt === "%") {
        return Number(num1) % Number(num2);
    }
    else if (oprt === "÷") {
        if (num2 == 0) {
            disableButtons(true);
            return "ERROR";
        }
        let result = Number(num1) / Number(num2);
        if (result === Infinity || result === -Infinity) {
            disableButtons(true);
            return "ERROR";
        }
        return result;
    }
}










