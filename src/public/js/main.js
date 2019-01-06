var pre_round_result = null;

var coins;

function loadGame() {
  coins = 10000;
  document.getElementById("coins").innerHTML = coins;
}

function playGame() {
  document.getElementById("result").innerHTML = "";
  document.getElementsByClassName('spinner')[0].style.visibility = 'visible';


  if (pre_round_result !== 'FREE_ROUND') {
    coins = coins - 10;
    console.log("coins before play game", coins);
    document.getElementById("coins").innerHTML = coins
  }
  pre_round_result = null;
  fetchRandomResult(coins);
}


function evaluateGameResult(result, coins) {
  document.getElementsByClassName('spinner')[0].style.visibility = 'hidden';
  if (result.data.gameStatus === "LOST") {
    document.getElementById("result").innerHTML = "Sorry you loose";
  } else if (result.data.gameStatus === 'WIN') {
    document.getElementById("result").innerHTML = "Congrats! you get 20 more coins";
    coins = coins + 20;
    document.getElementById("coins").innerHTML = coins
  } else {
    document.getElementById("result").innerHTML = "Hurry! you get extra free round to play";
    pre_round_result = 'FREE_ROUND'
  }
}

function gameRules() {
  alert("you can bet 10 coin per round, if you win we give you 20 coins, but if loose 10 coins are gone now. you can also earn a bonus round where you don't have to bet 10 coins to play game");
}

function fetchRandomResult(coins) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    var result = JSON.parse(this.responseText);
    if (result) {
      evaluateGameResult(result, coins);
    }
  };
  xhr.open("GET", "https://dry-dawn-73485.herokuapp.com/api/coin/result", true);
  xhr.send();
}

function gameHistory() {

}
