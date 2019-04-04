/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,gamePlaying;
var gamePlaying = false;

// this initialize the game setting the scores,roundScore, and activePlayer back to 0
// also reverts the scoreboard back to 0 
function init() {

  gamePlaying = true;
    // main score
  scores = [0,0];
  // score for the round 
  roundScore = 0;
  // who is currently playing 
  activePlayer = 0;
  // changing the scoreboard to 0 for start or back to 0 for another game 
  document.getElementById('score-0').textContent = "0";
  document.getElementById('score-1').textContent = "0";
  document.getElementById('current-0').textContent = "0";
  document.getElementById('current-1').textContent = "0";
  document.querySelector('#name-0').textContent = "Player 1";
  document.querySelector('#name-1').textContent = "Player 2";
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  //You first remove the active from both the class so that the active class wouldnt be duplicate
  document.querySelector('.player-0-panel').classList.remove('active')  
  document.querySelector('.player-1-panel').classList.remove('active')
  // You then got to add it back to the first player that is playing 
  document.querySelector('.player-0-panel').classList.add('active')


}

init();

//document.querySelector("#current-"+ activePlayer).textContent= dice;
//document.querySelector("#current-"+ activePlayer).innerHTML = "<em>"+ dice + "</em>"
//var x = document.querySelector("#score-0").textContent;
//console.log(x);


document.querySelector(".dice").style.display = "none";
document.querySelector('.btn-roll').addEventListener("click", function() {

  if(gamePlaying){
      //Getting random number
        var dice = Math.floor(Math.random() * 6) + 1 ;
      //Displaying the Results
        var diceDom = document.querySelector(".dice");
        diceDom.style.display = "block";
        diceDom.src = 'dice-' + dice+ '.png';
      //Update score if number is not 1
      if(dice !== 1){
        //Add score
        roundScore += dice;     //Trick to get #current-0 or #current-1
        document.querySelector("#current-"+activePlayer).textContent = roundScore;
      } else{
        //switch to next player
        nextPlayer();
      } 
  }
});


// connect to the button with class .btn-hold && added click event listener
document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
      // Current score to Global score
      scores[activePlayer] += roundScore;
      
      //Update the score UI 
      //Trick to get #score-0 or #score-1 because activePlayer returns 0 or 1 
      document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

      // Check if player won the game 
      if (scores[activePlayer] >= 20){

        // for the player with over 100 points first gets called winner
        document.querySelector('#name-'+activePlayer).textContent = "Winner"
        document.querySelector('.dice').style.display = "none";
        // add a winner class to div of the winning player 
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner')
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
        //setting gamePlaying to false because the game has ended 
        gamePlaying = false;
      }else{
        //switch to next player
        nextPlayer();
      }
  };
});



function nextPlayer(){
  //if activeplayer equals 0 make it 1 else make it 0, in another word switch to next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";  
}

// new game button, refresh scores and  score text content 
document.querySelector('.btn-new').addEventListener('click', init); 

