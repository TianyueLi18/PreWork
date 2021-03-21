# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: Tianyue Li

Time spent: 6 hours

Link to project: https://glitch.com/edit/#!/organized-upbeat-witch

## Required Functionality

The following **required** functionality is complete:

-  Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
-  "Start" button toggles between "Start" and "Stop" when clicked.
-  Game buttons each light up and play a sound when clicked.
-  Computer plays back sequence of clues including sound and visual cue for each button
-  Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
-  User wins the game after guessing a complete pattern
-  User loses the game after an incorrect guess

The following **optional** features are implemented:

- [ ] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
- [ ] More than 4 functional game buttons
-  Playback speeds up on each turn
-  Computer picks a different pattern each time the game is played
-  Player only loses after 3 mistakes (instead of on the first mistake)
- [ ] Game button appearance change goes beyond color (e.g. add an image)
- [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
-  User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

-  Progress Bar indicating the time left to guess on each turn
-  Number of mistakes left before losing the game

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

   When making a button-progress-bar to mimic a count-down, I was able to program the basic HTML and CSS by adapting code from other buttons and implement a similar timeout approach to make the buttons diappear in set time intervals. I also planned to call loseGame() when a global variable indicating the player's time reduces to 0.
   
   When I test this out, the buttons started disappearing in at "random" time intervals, and do not restore to full time after turns. At first, I looked at existing code and the console log to check for snytax errors. I then used console.log to see what the guessTime was at each turn, which confirmed that it was not reset for each turn, but there was no indication of why buttons were disappearing at random intervals. I looked up the difference between global and local variables specifically in Javascript to confirm my usage, tinkered with what I wrote but could not change the pattern.
   
   After sleeping on this, I decided to make a flowchart of the game process and determine where my functions should be called. After realizing the lack of direct connection, I separated the removal of buttons and the count down of time, and each process became simpler and was individually tackled. 
   
   I was not familiar with the setTimeout function, so I read its documentation. That was when I addressed my misconception that outer functions wait for the time-out to execute before moving on; rather, it simply set a function call at a later time. Looking at the flowchart with this new understanding, I realized the random disappearance had to be previous held-up removals that were not executed until a new turn.
   
   To clear all time-outs, I adopted pieces of code from the fourth link in question 1, and the problem with progress-bar buttons was solved.
   
   It did lead to another problem. The time would appear to be out as soon as a player hit "start" even though all my variables were correct. I then recalled the topic of macros and call expressions that evaluate the operand before applying the operator, and I hypothesized that I must have called the loseGame function somewhere before the game started. After addressing this, the game worked as expected.

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
