"use strict"
var stack = [];
window.onload = function () {
    var displayVal = "0";
    var is_in_decimal_point = 0;
    var is_in_equal_value = 0;
    var is_in_operator = 0;
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = $(this).innerHTML;
             if(value >= 0 && value <= 9 && displayVal != "ERROR"){
                if(is_in_equal_value == 1){
                    is_in_decimal_point = 0;
                    is_in_equal_value = 0;
                    is_in_operator = 0;
                    displayVal = "0";
                    stack = [];
                    $('expression').innerHTML = "0";
                }
                if(stack.last() == ")"){
                    stack.push("*");
                }
                if(displayVal != "0"){
                    displayVal = displayVal + value;
                }
                else{
                    displayVal = value;
                }
                is_in_operator = 0;
             }
             else if(value == "AC"){
                is_in_decimal_point = 0;
                is_in_equal_value = 0;
                is_in_operator = 0;
                displayVal = "0";
                stack = [];
                $('expression').innerHTML = "0";
             }
             else if(value == "." && displayVal != "ERROR"){
                if(!is_in_decimal_point){
                    is_in_decimal_point = 1;
                    displayVal = displayVal + value;
                }   
             }
             else if((value == "(" || value == ")") && displayVal != "ERROR"){
                is_in_decimal_point = 0;
                is_in_operator = 0;
                if($('expression').innerHTML == "0"){
                    if (displayVal == "0") {
                        $('expression').innerHTML = "";      
                    }
                    else{
                        $('expression').innerHTML = displayVal;  
                    }
                } 
                else{
                    if(displayVal != "0"){
                        $('expression').innerHTML += displayVal;  
                    }
                } 
                $('expression').innerHTML += value;
                if(displayVal != "0"){
                    stack.push(parseFloat(displayVal));    
                }
                displayVal = "0";
                $('result').innerHTML = displayVal;
                if(value == "(" && !isNaN(stack.last())){
                    stack.push("*");
                }
                stack.push(value);
             }
             else{
                if(displayVal != "ERROR"){
                    if(is_in_operator == 0){
                        is_in_decimal_point = 0;
                        if($('expression').innerHTML == "0"){
                            if (displayVal == "0") {
                                $('expression').innerHTML = "";
                            }
                            else{
                                $('expression').innerHTML = displayVal;  
                            }
                        } 
                        else{
                            if(displayVal != "0"){
                                $('expression').innerHTML += displayVal;  
                            }
                        } 
                        $('expression').innerHTML += value;
                        if(displayVal != "0"){
                            stack.push(parseFloat(displayVal));    
                        }
                        displayVal = "0";
                        $('result').innerHTML = displayVal;
                        if(value == "="){
                            is_in_equal_value = 1;
                            if(isValidExpression(stack)){
                                stack = infixToPostfix(stack);
                                displayVal = postfixCalculate(stack);
                            }
                            else{
                                displayVal = "ERROR";
                            }
                        }
                        else{
                            stack.push(value);
                        }
                    }
                    is_in_operator = 1;
                }
             }
             if(isNaN(displayVal) || displayVal === undefined){
                displayVal = "ERROR";
             }
            $('result').innerHTML = displayVal;
        };
    }
}


function isValidExpression(s) {
    var leftCount = 0;
    var rightCount = 0;
    for(var i = 0; i < s.length; i++){
        if(s[i] == "("){
            leftCount++;
        }
        if(s[i] == ")"){
            rightCount++;
        }
    }
    if(leftCount == rightCount){
        return true;
    }
    else{
        return false;
    }
}
function infixToPostfix(s) {
    var priority = {
        "+":0,
        "-":0,
        "*":1,
        "/":1
    };
    var tmpStack = [];
    var result = [];
    for(var i =0; i<stack.length ; i++) {
        if(/^[0-9]+$/.test(s[i])){
            result.push(s[i]);
        } else {
            if(tmpStack.length === 0){
                tmpStack.push(s[i]);
            } else {
                if(s[i] === ")"){
                    while (true) {
                        if(tmpStack.last() === "("){
                            tmpStack.pop();
                            break;
                        } else {
                            result.push(tmpStack.pop());
                        }
                    }
                    continue;
                }
                if(s[i] ==="(" || tmpStack.last() === "("){
                    tmpStack.push(s[i]);
                } else {
                    while(priority[tmpStack.last()] >= priority[s[i]]){
                        result.push(tmpStack.pop());
                    }
                    tmpStack.push(s[i]);
                }
            }
        }
    }
    for(var i = tmpStack.length; i > 0; i--){
        result.push(tmpStack.pop());
    }
    return result;
}

function postfixCalculate(s) {
    var result;
    var postfixCalculate_tmpStack = [];
    var operand1;
    var operand2;
    var temp;

    for(var i = 0; i < s.length; i++){
        temp = s[i];
        if(temp != "+" && temp != "-" && temp != "*" && temp != "/"){
            postfixCalculate_tmpStack.push(parseFloat(temp));
            continue;
        }

        operand2 = postfixCalculate_tmpStack.pop();
        operand1 = postfixCalculate_tmpStack.pop();

        switch(temp){
            case "+": result = operand1 + operand2; break;
            case "-": result = operand1 - operand2; break;
            case "*": result = operand1 * operand2; break;
            case "/": result = operand1 / operand2; break;
        }
        postfixCalculate_tmpStack.push(result);
    }
    result = postfixCalculate_tmpStack.pop();
    return result;
}