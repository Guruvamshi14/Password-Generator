const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
 
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength=15;
let checkcount = 0;
handleSlider();
setIndicator("#ccc");

// function handleSlider(){
//     inputSlider.value = passwordLength;
//     lengthDisplay.innerText = passwordLength;
//     const min = inputSlider.min;
//     const max = inputSlider.max;

//     inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min)) + "% 100%"

// }

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(1,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length-1);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    }
    else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6){
      setIndicator("#0f0");
    } 
    else {
      setIndicator("#f00");
    }
}

inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();

})


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
        copyMsg.innerText = " "
    },4000);
}

copyBtn.addEventListener('click',()=>{
    // if(passwordLength)
    if(passwordDisplay.value)
        copyContent();
})

function handleCheckBoxChange(){
    checkcount=0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkcount++;
    });


    //special case
    if(passwordLength<checkcount){
        passwordLength = checkcount;
        handleSlider();
    }

}

allCheckBox.forEach((checkbx) => {
    checkbx.addEventListener('change',handleCheckBoxChange);
})


function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener("click",() => {

    if(checkcount == 0)
        return;

    if(passwordLength<checkcount){
        passwordLength = checkcount;
        handleSlider();
    }
    console.log("Starting the Journey");
    password="";
    

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }

    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }

    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
        // console.log(password);
    }
    console.log("Hai");
    for(let i=0;i<funcArr.length;i++){
        console.log(funcArr[i]);
    }
    console.log("Hai");
    

    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randNum = getRndInteger(0,funcArr.length);
        password += funcArr[randNum]();
        console.log(password);
    }
    console.log(password);
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;

    calcStrength();

})

