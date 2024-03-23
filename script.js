let boxes = document.querySelectorAll(".btn");
let winner = document.querySelector("#scoreboard");
let reset = document.querySelector('#reset');
let newGame = document.getElementById('newGame');
let span = document.getElementsByTagName('span');

let winningPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let player0= true;
let count=0;

const checkUser  = (user) =>{
    if(user === 'X')
        winner.innerText="Winner is X";
    else
    winner.innerText="Winner is O";
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
        winner.innerText="";
    }
}

const resetFunction = () => {
    player0 = true;
    resetBoxes();
}

reset.addEventListener('click', ()=>{
    console.log('reset clicked');
    resetFunction();
});

newGame.addEventListener('click',()=>{
    resetFunction();
})