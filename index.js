document.addEventListener('DOMContentLoaded', function() {
    displayInput();
    displayResult();
})

function displayInput() {
    document.querySelector('#calculator-input').value = '';
    document.querySelector('#calculator-input').readOnly = true;
    let valueButtons = document.querySelectorAll('.calculator-button');
    valueButtons.forEach(valueButton => {
        let value = valueButton.innerHTML;
        let count = 0;
        valueButton.onclick = function() {
            if (valueButton.id === "delete-char") {
                let expression = document.querySelector('#calculator-input').value;
                document.querySelector('#calculator-input').value = expression.substr(0, expression.length-1);
            }
            else if (valueButton.innerHTML === "AC") {
                document.querySelector('#calculator-input').value = 0;
            }
            else if (valueButton.innerHTML === "O/F") {
                let screen = document.querySelector('#calculator-input');
                if (count == 0) {
                    screen.style.backgroundColor = "rgb(160, 222, 224)";
                    screen.readOnly = false;
                    count = 1;
                }
                else {
                    
                    screen.style.backgroundColor = "cadetblue";
                    screen.value = "";
                    screen.readOnly = true;
                    count = 0;
                }
            }
            else {
                document.querySelector('#calculator-input').value += value;
            }
        }
    })
}

function isOperator(opr) {
    if (opr === '+' || opr === '-' || opr === 'x' || opr === '/') {
        return true;
    }
    return false;
}

function displayResult() {
    let expression = '', result = '';
    document.querySelector('#calculator-calculate').onclick = function(e) {
        e.preventDefault();
        expression = document.querySelector('#calculator-input').value;
       // result = getResult(expression);
       result = getResult('(6+1-12)');
        document.querySelector('#calculator-input').value = result;
    }
}

function updateExpression(index, expr) {
    let o1 = '', o2 = '';
    let start = 0, end = expr.length-1, flag = 0;
    for (let i = index-1; i > -1; i--) {
        if (!isOperator(expr[i]) || expr[i] != '(') {
            o1 += expr[i];
        }
        else {
            start = i+1;
            break;
        }
    }

    for (let i = index+1; i < expr.length; i++) {
        if (!isOperator(expr[i]) || expr[i] != ')') {
            o2 += expr[i];
        }
        else {
            end = i-1;
            break;
        }
    }

    let opr1 = parseInt(o1.split('').reverse().join('')), opr2 = parseInt(o2), result = 0;
    alert("start = "+start+", end = "+end+", opr1 = "+opr1+", opr2 = "+opr2);
    if (expr[index] === '+') {
        result = opr1+opr2;
    }
    if (expr[index] === '-') {
        result = opr1-opr2;
    }
    if (expr[index] === 'x') {
        result = opr1*opr2;
    }
    if (expr[index] === '/') {
        result = opr1/opr2;
    }

    if (start == 0) {
        if (end == expr.length-1) {
            return `${result}`;
        }
        else {
            return `${result}`+expr.substr(end+1,);
        }
    }
    else {
        if (end == expr.length-1) {
            return expr.substring(0, start)+`${result}`;
        }
        else {
            
            //alert(expr.substr(end+1,));
            return expr.substring(0, start)+`${result}`+expr.substring(end+1,);
        }
    }
}

function getResult(expr) {
    let first = expr.lastIndexOf('('), last = expr.indexOf(')'), flag = 0;
    if (first == -1 || last == -1) {
        return evaluate(expr);
    }
    for (let i = first+1; i < last; i++) {
        if (isOperator(expr[i])) {
            flag = 1;
            break;
        }
    }
    if (flag == 1) {
        let exprRem = expr.substring(first+1, last);
        
        alert("first = "+first+", last = "+last+", exprem = "+exprRem+", expr = "+expr);
        expr = expr.substring(0, first)+`${evaluate(exprRem)}`+expr.substring(last+1,);
    }
    return getResult(expr);
}

function evaluate(expr) {
    while (expr.search('/') != -1) {
        expr = updateExpression(expr.search('/'), expr);
    }
    while (expr.search('x') != -1) {
        expr = updateExpression(expr.search('x'), expr);
    }
    while (expr.indexOf('+') != -1) {
        expr = updateExpression(expr.indexOf('+'), expr);
    }
    alert(expr);
    while (expr.search('-') != -1) {
        expr = updateExpression(expr.search('-'), expr);
    }
    return expr;
}