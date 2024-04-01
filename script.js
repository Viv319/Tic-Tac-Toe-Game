let boxes = document.querySelectorAll(".btn");
let winner = document.querySelector("#winMessage");
let reset = document.querySelector('#reset');
let newGame = document.getElementById('newGame');
let span = document.getElementsByTagName('span');

var xCount=parseInt(localStorage.getItem('xWon'))||0;
var oCount=parseInt(localStorage.getItem('oWon'))||0;

let winningPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let player0= true;
let count=0;

function userValues() {
    const xElement = document.getElementById('xS');
    conststoredValue = localStorage.getItem('xWon');
    xElement.value = xCount;

    const oElement = document.getElementById('oS');
    conststoredValue = localStorage.getItem('oWon');
    oElement.value = oCount;
}
window.onload = userValues;

const checkUser  = (user) =>{
    if(user === 'X')
    {
        winner.innerText="Winner is X";
        xCount+=1;
            localStorage.setItem('xWon',xCount);
            const storedValue = localStorage.getItem('xWon');
            document.getElementById('xS').value=storedValue;
    }
    else
    {
        winner.innerText="Winner is O";
        oCount+=1;
            localStorage.setItem('oWon',oCount);
            const storedValue = localStorage.getItem('oWon');
            document.getElementById('oS').value=storedValue;
    }
    
}

const disabledBoxes = ()=>{
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

const checkWinner = () => {
    for(let pattern of winningPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "")
        if(pos1Val === pos2Val && pos2Val === pos3Val)
        {
            checkUser(pos1Val);
            console.log('congrats you won');
            disabledBoxes();
        }
    }
}

const checkDraw=()=>{
    if(count===9)
        winner.innerText = 'Match Draw';
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(player0) {
            box.innerText='O';
            // span.innerText='O';
            
            player0=false;
            box.disabled = true;
        }
        else {
            box.innerText='X';
            player0=true;
            box.disabled = true;
        }
        count=count+1;
        console.log('box was clicked');
        checkDraw();
        checkWinner();
        
    })
})

const resetBoxes = () =>{

    for (let box of boxes)
    {
        count=0;
        box.disabled = false;
        box.innerText="";
        // winner.innerText="";
    }
}

const resetFunction = () => {
    player0 = true;
    resetBoxes();
    document.getElementById('xS').value=storedValue;
    document.getElementById('oS').value=storedValue;
}

reset.addEventListener('click', ()=>{
    console.log('reset clicked');
    resetFunction();
});

newGame.addEventListener('click',()=>{
    resetFunction();
})