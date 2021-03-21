//Global Constants
const nextClueWaitTime = 600; //how long to wait before starting playback of the clue sequence
const Offset = 15; //after each progress, 30 miliseconds will be deducted from the clue wait time and hold time.
const patternLength = 8; 
const buttonTime = 1000; //time blocks each progress_bar_button represents
const allowedTime = 15; //player is allowed 15 button_time to respond on each turn

//Global Variables
var pattern = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.3; //must be between 0.0 and 1.0
var clueHoldTime = 600; //how long each clue is sounded for, decrease as player progresses
var cluePauseTime = 333; //how long to pause in between clues, decrease as player progresses
var guessCounter = 0;
var guessTime = allowedTime * buttonTime; //how much time the player has left to respond, initially set to total allowed time
var timeouts = [];
var mistake = 3; //player can make three mistakes before game_over

function getPattern(len) {
  //initiate a pattern randomly and print it in console for easy debugging
  for (let i = 0; i < len; i++) {
    pattern.push(Math.floor(Math.random() * 3) + 1);
  }
  console.log(pattern);
}

function startGame() {
  //initialize game variables
  progress = 0;
  pattern = [];
  clueHoldTime = 600;
  cluePauseTime = 333; 
  gamePlaying = true;
  mistake = 3;
  switchMistake(3);
  getPattern(patternLength);
  //swap the Start and Stop button
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  clearAllTimeout();
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
}

function clearAllTimeout() {
  //helper function that clears all timeout logs to prevent unintended lagging actions.
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts = [];
  console.log("timeout cleared");
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  //this function plays the next sequence of clues and initiate the timing of player response.
  guessCounter = 0;
  //re-initialize progress_bar:
  guessTime = allowedTime * buttonTime; 
  clearAllTimeout();
  for (let i = 0; i < allowedTime; i++) {
    //restore all buttons
    document
      .getElementById("second" + (allowedTime - i))
      .classList.remove("hidden");
  }
  //play clue sequence:
  let delay = nextClueWaitTime; //set delay to initial wait time
  clueHoldTime = clueHoldTime - Offset;
  cluePauseTime = cluePauseTime - Offset;
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  //user's turn and timing starts
  for (let i = 0; i < allowedTime; i++) {
    var to = setTimeout(removeBtn, delay + buttonTime * (i + 1), i);
    timeouts.push(to);
  }
  var lostTime = setTimeout(loseGame, delay + buttonTime * allowedTime, "time");
  timeouts.push(lostTime);
}

function removeBtn(time) {
  //helper function, remove progress_bar_button and reduce remaining guess_time after each button_time ellapse
  var btn = "second" + (allowedTime - time);
  document.getElementById(btn).classList.add("hidden");
  guessTime = guessTime - buttonTime;
}

function guess(btn) {
  context.resume(); //To break any browser auto-suspension, so that even when game has not started, player can test out the buttons. Require one extra click at the beginning to initiate.
  console.log(
    "user guessed: " + btn + ", they still have guessTime = " + guessTime
  );
  if (!gamePlaying) {
    return;
  }
  if (btn != pattern[guessCounter]) {
    //wrong guess
    if (mistake != 0) {
      //when user did not use their last chance
      mistake -= 1;
      switchMistake(mistake);
      //flash all buttons to signify mistake
      for (let i = 1; i <= 4; i++) {
        lightButton(i);
      }
      for (let i = 1; i <= 4; i++) {
        setTimeout(clearButton, clueHoldTime, i);
      }
      //repeat previous pattern
      clueHoldTime = clueHoldTime + Offset;
      cluePauseTime = cluePauseTime + Offset;
      playClueSequence();
    } else {
      //all mistake allowance used up
      loseGame("mistakes");
    }
  } else if (guessCounter != progress) {
    //right guess, but not end of turn
    guessCounter += 1;
  } else {
    //right guess, end of turn
    if (progress == pattern.length - 1) {
      //last clue sequence of the pattern, player wins
      winGame();
    } else {
      //advance to the next clue sequence
      progress += 1;
      playClueSequence();
    }
  }
}

function switchMistake(mistakes) {
  //Notice the player how many mistakes they have left
  if (mistakes == 3) {
    document.getElementById("0mistakes").classList.add("hidden");
    document.getElementById("3mistakes").classList.remove("hidden");
  } else {
    var prevBtn = mistakes + 1;
    document.getElementById(prevBtn + "mistakes").classList.add("hidden");
    document.getElementById(mistakes + "mistakes").classList.remove("hidden");
  }
  
}

function loseGame(msg) {
  //adjust losing message based on how the user lost
  stopGame();
  alert(
    "Game Over. You ran out of " +
      msg +
      ". You made it to clue number " +
      progress
  );
}

function winGame() {
  stopGame();
  alert("Congratulations. You win. You have " + mistake + " mistake(s) left.");
}
