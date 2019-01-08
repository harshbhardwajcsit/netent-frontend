var pre_round_result = null;
var bet = 0;
var gain = 0;
var coins;

function loadGame() {
  coins = 10000;
  gain = 0;
  bet = 0;
  document.getElementById("coins").innerHTML = coins;
  document.getElementById("bet").innerHTML = bet;
  document.getElementById("gain").innerHTML = gain;
}

function playGame() {
  playGameAudio();
  document.getElementById("result").innerHTML = "";
  document.getElementsByClassName('spinner')[0].style.visibility = 'visible';


  if (pre_round_result !== 'FREE_ROUND') {
    coins = coins - 10;
    document.getElementById("coins").innerHTML = coins;
    bet = bet + 10;
  }
  document.getElementById("bet").innerHTML = bet;
  pre_round_result = null;
  fetchRandomResult();
}


function evaluateGameResult(result) {
  document.getElementsByClassName('spinner')[0].style.visibility = 'hidden';
  // saveRecordByPlayer(result);
  if (result.data.gameStatus === "LOST") {
    if (result.data.isFreeRound) {
      pre_round_result = 'FREE_ROUND';
      document.getElementById("result").innerHTML = "LOST but get 1 round free, just triggering....";
      playGame();
      showResultInAlert("LOST but get 1 round free, just triggering....");
    } else {
      document.getElementById("result").innerHTML = "LOST! better luck next time";
      showResultInAlert("LOST! better luck next time");
    }
    playLoseMusic();
  } else {
    coins = coins + 20;
    gain = gain + 20;
    document.getElementById("gain").innerHTML = gain;
    document.getElementById("coins").innerHTML = coins;
    if (result.data.isFreeRound) {
      pre_round_result = 'FREE_ROUND';
      document.getElementById("result").innerHTML = "BINGO! you won 20 coins and 1 free round, just triggering....";
      showResultInAlert("BINGO! you won 20 coins and 1 free round, just triggering....");
      playGame();
    } else {
      document.getElementById("result").innerHTML = "HURRY! you won 20 coins";
      showResultInAlert("HURRY! you won 20 coins");
    }
    playWinMusic();
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
      }
    }
  };
  xhr.open("GET", " https://dry-dawn-73485.herokuapp.com/api/coin/result", true);
  xhr.send();
}

function gameRTP() {
  if (gain === 0) {
    alert("NO RTP generated");
  } else {
    alert(gain / bet);
  }
}

function playGameAudio() {
  var sound = document.getElementById("audio1");
  sound.play();
}

function playWinMusic() {
  var sound = document.getElementById("audio2");
  sound.play();
}

function playLoseMusic() {
  var sound = document.getElementById("audio3");
  sound.play();
}

function showResultInAlert(result){
  alert(result);
}
