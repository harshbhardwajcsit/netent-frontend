var pre_round_result = null;
var bet = 0;
var gain = 0;
var coins;
var playerName;

function loadGame() {
  coins = 10000;
  document.getElementById("coins").innerHTML = coins;
  takeUser();
}

function playGame() {
  console.log(coins);
  document.getElementById("result").innerHTML = "";
  document.getElementsByClassName('spinner')[0].style.visibility = 'visible';


  if (pre_round_result !== 'FREE_ROUND') {
    coins = coins - 10;
    console.log("coins before play game", coins);
    document.getElementById("coins").innerHTML = coins
    bet = bet + 10;
  }
  pre_round_result = null;
  fetchRandomResult();
}


function evaluateGameResult(result) {
  document.getElementsByClassName('spinner')[0].style.visibility = 'hidden';
  // saveRecordByPlayer(result);
  if (result.data.gameStatus === "LOST") {
    if (result.data.isFreeRound) {
      pre_round_result = 'FREE_ROUND';
      document.getElementById("result").innerHTML = "LOST but get 1 round free";
    } else {
      document.getElementById("result").innerHTML = "LOST! better luck next time";
    }
  } else {
    coins = coins + 20;
    gain = gain + 20;
    document.getElementById("coins").innerHTML = coins;
    if (result.data.isFreeRound) {
      pre_round_result = 'FREE_ROUND';
      document.getElementById("result").innerHTML = "BINGO! you won 20 coins and 1 free round";
    } else {
      document.getElementById("result").innerHTML = "HURRY! you won 20 coins";
    }
  }
}

function gameRules() {
  alert("you can bet 10 coin per round, if you win we give you 20 coins, but if loose 10 coins are gone now. you can also earn a bonus round where you don't have to bet 10 coins to play game");
}

function fetchRandomResult() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var result = JSON.parse(this.responseText);
      if (result) {
        evaluateGameResult(result);
        xhr.onreadystatechange = null;
        console.log(result);
      }
    }
  };
  xhr.open("GET", "https://dry-dawn-73485.herokuapp.com/api/coin/result", true);
  xhr.send();
}

function gameRTP() {
  if (gain === 0) {
    alert("NO RTP generated");
  } else {
    alert(gain / bet);
  }
}

function saveRecordByPlayer(result) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      xhr.onreadystatechange = null;
      var result = JSON.parse(this.responseText);
      if (result) {
        console.log(result);
      }
    }
  };
  xhr.open("POST", "http://localhost:8080/api/coin/save/player", true);
  xhr.send();
}


function takeUser() {
  document.getElementById("name").innerHTML = prompt("What's your cool name?", "Mighty harsh");
}
