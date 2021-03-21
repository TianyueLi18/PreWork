# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: Tianyue Li

Time spent: 5 hours

Link to project: https://glitch.com/edit/#!/organized-upbeat-witch

## Required Functionality

The following **required** functionality is complete:

- [#] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [#] "Start" button toggles between "Start" and "Stop" when clicked.
- [#] Game buttons each light up and play a sound when clicked.
- [#] Computer plays back sequence of clues including sound and visual cue for each button
- [#] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [#] User wins the game after guessing a complete pattern
- [#] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [ ] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
- [ ] More than 4 functional game buttons
- [#] Playback speeds up on each turn
- [#] Computer picks a different pattern each time the game is played
- [#] Player only loses after 3 mistakes (instead of on the first mistake)
- [ ] Game button appearance change goes beyond color (e.g. add an image)
- [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [#] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [#] Progress Bar indicating the time left to guess on each turn
- [#] Number of mistakes left before losing the game

## Video Walkthrough

Here's a walkthrough of implemented user stories:

mistakes ending:
http://g.recordit.co/nwyiNh34Dk.gif

time-out ending:
http://g.recordit.co/KiudTszR27.gif

winning ending:
http://g.recordit.co/lRz9JfDICh.gif

Note: unfortunately I could not record sound using RecordIt on Windows 10. Please let me know if there is a fix to this situation!

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.
   
   To explain why autoplay is suspended upon starting the website:
   https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
   
   To generate random patterns using Math.random:
   https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/math/random
   
   To distinguish between global and local variables in Javascript:
   https://www.sitepoint.com/community/t/global-variable-is-undefined-in-function/34042
   
   To help with debugging and address timeout issues:
   https://stackoverflow.com/questions/8860188/javascript-clear-all-timeouts

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)

//REWORD
   I was inspired by the optional feature to limit the time of response on each turn and decided to make a progress bar to mimic a count-down as an additional feature.
   Using similar codes for other buttons in this project, I was able to program the basic actions of these progress-bar buttons.
   I adopted the timeout approach from other areas to make the buttons diappear in order, with set time intervals in between. I also used a global variable to count down, so that I can call "loseGame()" when the player's time run out.
   When I test this out, although the buttons disappear in the right order, they seem to disappear at "random" time stamps, and do not restore to intial state when the player exits guessing phase. This leads to less and less time for the player at each subsequent turn, which leads inevitably to a timeout.
   At first, I look at existing code and the console log to see if any small or snytax mistake is made. I then use console.log to see what the player's guess time is at each turn, and which button is disappearing at what time. This confirms that the guessTime is not reset for each turn, but there is no apparant indicator of why buttons are disappearing at random intervals.
   I looked up differences between global and local variables specifically in the Javascript language to confirm my usage. I tinkered with what I wrote for a while but couldn't change the pattern.
   After sleeping over it, I decided to make a flowchart of the game process and determine whether my functions are called at the right time. That is when I decide to separate the removal of buttons and the count down of time, and each process become simpler and is individually tackled.
   I was not familiar with the setTimeout function before, so I read its documentation. That is when I addressed my misconception of the function waiting until after each function execution to move on; rather, it simply set a function call at a later time. Looking at the flowchart with this new understanding, I realize the random disappearance has to do with previous held-up removals that were not executed until this next round.
   Looking online, I adopted pieces of code from the fourth link in question 1 to clear all the timeouts, and the problem with progress-bar buttons is solved.
   The game-losing timeout appear as soon as game is started even though all my variables are correct. I then recalled the topic of macros and call expressions that evaluates the operand before applying the operator, and I hypothesized that I must have called the loseGame function somewhere. After addressing this, the game works as expected.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
  
  In this project, we have a video demonstration of the game we are trying to replicate. Will there always be a clear image of the final product? Is a real-world web development more similar to the mandatory and optional portions of this project or the additional portion?
  
  This project is a very stand-alone product, but in real-world web development, what are some processes expected of web developers before or after the actual coding? Is there market investigation, data analysis, UI/UX design, and other disciplines?
  
  Finally, how do a team of web-developers work together from beginning to finish? How are roles assigned, and how is progress combined?

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
  
  I wanted to implement features that make the game more challenging, so I attempted some big improvements to the original rules. Given a more relaxed timeline, I will first touch-up on the game's appearance to give more variety to the colors and sound.
  
  Because I was not familiar with CSS, I could benefit from more time to learn the fancy features regarding flexibility and adjustability in the elements' position, size, color, and how they can be connected to changes using Javascript.
  
  To make use of what I know, I made a progress bar out of buttons, but to be more aesthetically pleasing I would implement a smooth progress bar timer. 
  
  I also want to handle user input and change the appearance and rules of the game accordingly, including the ability to change the number of mistakes one can make, the time allowed, and the length of the pattern generated. These aspects are all stored as constants or variables to make the "update" easier.


## License

    Copyright Tianyue Li

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
