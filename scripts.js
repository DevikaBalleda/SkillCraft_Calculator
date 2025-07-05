
document.addEventListener('DOMContentLoaded',function(){
    const btns=document.querySelectorAll('.btn');
    const inputField = document.querySelector(".input");
    const resultBox = document.querySelector(".result-box");
    const textResult = document.querySelector(".text-result");

    function isValidExpression(expression){
        if(/^[+\-*/]/.test(expression)) return false;
        if(/[\+\-\*\/]{2,}/.test(expression)) return false;
        if (/\/0(?!\d)/.test(expression)) return false;
        return true;
    }

    function numberToWords(num){
        if(num===0) return 'zero';
        const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
        const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
        const thousands = ["", "thousand", "million", "billion"];

        function convertLessThanThousand(n){
            if(n==0) return "";
            if(n<10) return ones[n];
            if(n<20) return teens[n-10];
            if(n<100) return tens[Math.floor(n/10)]+ (n % 10 !== 0 ? " " + ones[n % 10] : "");
            return ones[Math.floor(n / 100)] + " hundred" + (n % 100 !== 0 ? " and " + convertLessThanThousand(n % 100) : "");
        }
        let wordResult='';
        let i=0;
        while(num>0){
            if(num%1000!==0){
                wordResult = convertLessThanThousand(num % 1000) + " " + thousands[i] + " " + wordResult;
            }
            num = Math.floor(num / 1000);
            i++;
        }
        return wordResult.trim();
    }
    btns.forEach(btn=>{
        btn.addEventListener('click',function(){
            const value=this.innerText;
            if(value==='C'){
                inputField.value='';
                textResult.innerText = "";
                resultBox.className = "result-box";
            }
            else if(value==='='){
                if (!isValidExpression(inputField.value)) {
                    inputField.value = "Invalid";
                    textResult.innerText = "Invalid Expression";
                    resultBox.className = "result-box error-bg"; // Red background
                    return;
                }
                try{
                    let result = eval(inputField.value);
                    if (!isFinite(result)) throw new Error("Invalid");

                    inputField.value = result;
                    textResult.innerText = numberToWords(Math.floor(result)); // Convert number to words
                    resultBox.className = "result-box success-bg";
                }
                catch(error){
                    inputField.value = "Invalid";
                    textResult.innerText = "Invalid Expression";
                    resultBox.className = "result-box error-bg";
                }
            }
            else{
                inputField.value+=value;
            }
        });
    });
});