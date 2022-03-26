/*Making the hands responsive*/

const calculator = document.querySelector("#calculator_body");
const hand = document.querySelector("#handImg");

calculator.addEventListener('mouseover', () => {
    hand.style.left="350px"
    hand.style.top="100px"
    hand.style.width="950px"
    hand.style.transform="rotate(-80deg)"
    hand.style.filter="blur(1px)"
})
calculator.addEventListener('mouseleave', () => {
    hand.style.left="50px"
    hand.style.top="400px"
    hand.style.width="800px"
    hand.style.transform="rotate(-60deg)"
    hand.style.filter="blur(8px)"
})

let buttonPress = false;
const fingerImg = document.querySelector("#fingerImg");
const html = document.querySelector("html");
html.addEventListener('mousemove', (e) => {
    if(buttonPress==false){
        const x = e.pageX-776;
        const y = e.pageY-310;
        fingerImg.style.left= x+"px";
        fingerImg.style.top= y+"px";
    }
    else if(buttonPress==true){
        const x = e.pageX-540;
        const y = e.pageY-220;
        fingerImg.style.left= x+"px";
        fingerImg.style.top= y+"px";
    }
});

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('mousedown', (e) => {
        buttonPress=true;
        const x = e.pageX - 540;
        const y = e.pageY - 220;
        fingerImg.style.left=x+"px";
        fingerImg.style.top=y+"px";
        fingerImg.style.width="1450px"
        fingerImg.style.opacity = "0.8";
        fingerImg.style.filter="blur(0px)"
    });
});
html.addEventListener('mouseup', (e) => {
    buttonPress=false;
    const x = e.pageX - 776;
    const y = e.pageY - 310;
    fingerImg.style.left=x+"px";
    fingerImg.style.top=y+"px";
    fingerImg.style.width="2080px"
    fingerImg.style.opacity = "0.5";
    fingerImg.style.filter="blur(4px)"
});



//prevents the movign of html page with the arrow keya
var ar=new Array(33,34,35,36,37,38,39,40);

$(document).keydown(function(e) {
     var key = e.which;
      //console.log(key);
      //if(key==35 || key == 36 || key == 37 || key == 39)
      if($.inArray(key,ar) > -1) {
          e.preventDefault();
          return false;
      }
      return true;
});


/*CALCULATOR*/

/* Selecting the elements of HTML */

const led = document.querySelector("#led");
const power = document.querySelector("#power");
const screen = document.querySelector("#screen");
const clear = document.querySelector("#reset");
const numberButtons = document.querySelectorAll(".numbers");
const equal = document.querySelector("#equal")
const operators = document.querySelectorAll(".operator")
const addButton = document.querySelector("#add")
const substractButton = document.querySelector("#substract")
const multiplyButton = document.querySelector("#multiply")
const divideButton = document.querySelector("#divide")
const point = document.querySelector("#point");


/* Setting of the POWER button */

let powerOn = 0;

power.addEventListener('click', () => {
    powerOn++;
    powerSwitcher();
})


document.addEventListener("keydown", function onEvent(e){
    if (e.key === "p") {
        powerOn++;
        powerSwitcher();
        keyDown(power)
    }
})

document.addEventListener("keyup", function onEvent(e){
    if (e.key === "p") {
        keyUp(power)
    }
})


function powerSwitcher(){
    if (powerOn%2==0) {
        led.style.backgroundColor="rgb(11, 29, 53)";
        screen.style.backgroundColor="rgb(10, 44, 23)";
        closeCalculator();
    }
    else if(powerOn%2==1){
        led.style.backgroundColor="rgb(152, 235, 226)";
        screen.style.backgroundColor="rgb(1, 109, 37)";
        startCalculator();
    }
}


/* When the power is ON */
function startCalculator(){
    screen.style.color="rgb(152, 235, 226)";
    
    screen.textContent = "0";
    let equationMath = 0;
    let number = "";
    let lastButton = "add";
    

    /* When the user uses the MOUSE */

    numberButtons.forEach(numberButton => {
        numberButton.addEventListener('click', (e) => {
            number = number+e.target.value;
            if (lastButton == "divide" && number=="0") {
                screen.textContent="NoZero!"
                number=""
            }
            else{
                screen.textContent=number;
            }
        })
    });

    point.addEventListener('click', (e) => {
        if(number.includes(".")){
            number = number;
            screen.textContent=number;
        }
        else{
            number = number+e.target.value;
            screen.textContent=number;
        }
    })


    addButton.addEventListener('click', () => {
        mathOperation();
        lastButton="add";
    });

    substractButton.addEventListener('click', () => {
        mathOperation();
        lastButton="substract";
    });

    multiplyButton.addEventListener('click', () => {
        mathOperation();
        lastButton="multiply";
    });

    divideButton.addEventListener('click', () => {
        mathOperation();
        lastButton="divide";
    });


    equal.addEventListener('click', () => {
        mathOperation();
        displaySolution();
    })

    clear.addEventListener('click', () => {
        clearEverything();
    })

    
    /* When the user uses the KEYBOARD */

    document.addEventListener("keydown", (e) => {
        for(i=0; i<10;i++){
            if (e.key === `${i}`) {
                keyDown(document.getElementById(`${i}b`))
                number=number+i;

                if (lastButton == "divide" && number=="0") {
                    screen.textContent="NoZero!"
                    number=""
                }
                else{
                    screen.textContent=number;
                }
            }
        }
        
        if (e.key === ",") {
            if(number.includes(".")){
                number = number;
                screen.textContent=number;
            }
            else{
                number = number+".";
                screen.textContent=number;
            }
            keyDown(point)
        }


        switch (e.key) {
            case "+":
                mathOperation();
                lastButton="add";
                keyDown(addButton);
                break;
            case "-":
                mathOperation();
                lastButton="substract";
                keyDown(substractButton)
                break;
            case "*":
                mathOperation();
                lastButton="multiply";
                keyDown(multiplyButton)
                break;
            case "/":
                mathOperation();
                lastButton="divide";
                keyDown(divideButton)
                break;
            default:
                break;
        }


        if (e.key === "c") {
            clearEverything();
            keyDown(clear)
        }
        
        if (e.key === "Enter") {
            //prevents clicking on button
            e.preventDefault();
            keyDown(equal)

            mathOperation();
            displaySolution();
        }
    })

    document.addEventListener("keyup", (e) => {
        for(i=0; i<10;i++){
            if (e.key === `${i}`) {
                keyUp(document.getElementById(`${i}b`))
            }
        }
        
        switch (e.key) {
            case "c":
                keyUp(clear)
                break;
            case "+":
                keyUp(addButton)
                break;
            case "-":
                keyUp(substractButton)
                break;
            case "*":
                keyUp(multiplyButton)
                break;
            case "/":
                keyUp(divideButton)
                break;
            case "Enter":
                keyUp(equal)
                break;
            case ",":
                keyUp(point)
                break;
            default:
                break;
        }
    })
    


    function displaySolution(){
        number=""
        lastButton=""
        y=1;

        if(equationMath>0 && equationMath.toString().includes("."))
        {
            dotFinder = equationMath.toString().indexOf(".");
            for(i=0; i < 6-dotFinder;i++){
                y=y*10;
            }
            screen.textContent=Math.round((equationMath + Number.EPSILON) * y) / y;
        }
        else if(equationMath>0 && !equationMath.toString().includes(".")){
            screen.textContent=equationMath;
        }
        else if(equationMath<0 && equationMath.toString().includes(".")){
            dotFinder = equationMath.toString().indexOf(".");
            for(i=0; i<6-dotFinder;i++){
                y=y*10;
            }
            screen.textContent=Math.round((equationMath + Number.EPSILON) * y) / y;
        }
        else if(equationMath<0 && !equationMath.toString().includes(".")){
            screen.textContent=equationMath;
        }
    }


    function mathOperation(){
        switch (lastButton) {
            case "add":
                add(parseFloat(number))
                break;
            case "substract":
                substract(parseFloat(number))
                break;
            case "multiply":
                multiply(parseFloat(number))
                break;
            case "divide":
                divide(parseFloat(number))
                break;
            default:
                break;
        }
        number="";
    }

    function add(e) {
        equationMath=equationMath+e;
    }
    
    function substract(e) {
        equationMath=equationMath-e;
    }
    
    function multiply(e) {
        equationMath=equationMath*e;
    }
    
    function divide(e) {
        equationMath=equationMath/e;
    }


    function clearEverything(){
        number="";
        equationMath=0;
        screen.textContent="0";
        equalPressed=false;
        lastButton="add"
    }
}
    

function closeCalculator(){   
    screen.style.color="rgb(10, 44, 23)"
}

function keyDown(x){
    x.style.borderTop="9px solid rgb(19, 52, 95)";
    x.style.borderRight="9px solid rgb(19, 52, 95)";
    x.style.borderBottom="9px solid rgba(116, 180, 218, 0.979)";
    x.style.borderLeft="9px solid rgba(116, 180, 218, 0.979)";
    x.style.transform="translateX(-5px) translateY(5px)";
    x.style.boxShadow="none";
}

function keyUp(x){
    x.style.borderTop="";
    x.style.borderRight="";
    x.style.borderBottom="";
    x.style.borderLeft="";
    x.style.transform="";
    x.style.boxShadow="";
}