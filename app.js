/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore,activePlayer,isWinner,prevDiceRoll,finalScore;
init();
function init()
{
    prevDiceRoll = 0;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-0').textContent='Player-1';
    document.getElementById('name-1').textContent='Player-2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    isWinner = false;
    
}

document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer()
{
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('singleDice').style.display = 'none';

}

document.querySelector('.btn-roll').addEventListener('click',function() {
    if(!isWinner)
    {
        //Get the Winning score and update if null
        finalScore = document.querySelector('.target-score').value;
        if(!finalScore)
        {
            finalScore= 100;
        }
        
        var dice = Math.floor(Math.random() * 6 )+1;
        //document.querySelector("#current-"+activePlayer).textContent += dice;
        var diceDOM = document.getElementById('singleDice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice+'.png';

        if(prevDiceRoll==6 && dice==6)
        {
            scores[activePlayer] = 0;
            prevDiceRoll = 0;
            document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
        else if(dice!=1 )
        {
            //add score
            
            roundScore +=dice;
            document.getElementById("current-"+activePlayer).textContent = roundScore;
            
        }
        else
        {
            prevDiceRoll = 0;
            nextPlayer();
        }
        prevDiceRoll = dice;
    }

});



document.querySelector('.btn-hold').addEventListener('click',function(){
    if(!isWinner)
    {
        console.log(finalScore);
        scores[activePlayer]+=roundScore;
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= finalScore)
        {
            document.getElementById('name-'+activePlayer).textContent = "WINNER";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isWinner = true;
        }
        else
        {
            nextPlayer();
        }
    }
    

});