const play = document.querySelector(".play");
const restart = document.querySelector(".restart");
const blocks = document.querySelectorAll(".game-block");
const levelno = document.querySelector("#levelno");
const result = document.querySelector("#result");
const blocksArr = Array.from(blocks);
const playSound = document.querySelector("#playSound");
const loosingSound = document.querySelector("#loosingSound");
const levelDone = document.querySelector("#winningSound");
const score = document.querySelector(".score");
const levels = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
  8: 9,
  9: 10,
  10: 11,
};

let order = [];
let canPlayerPlay;
let level = 1;
let levelScore = 1;

const flash = (block) => {
  canPlayerPlay = false;
  return new Promise((resolve, _) => {
    blocksArr[block].classList.add("selected");
    setTimeout(() => {
      blocksArr[block].classList.remove("selected");
      setTimeout(() => {
        resolve();
      }, 200);
      playSound.play()
    }, 500);
    playSound.play();
  });
};

blocksArr.forEach((block, idx) => {
  block.addEventListener("click", () => {
    if (canPlayerPlay) {
      block.classList.add("selected");
      setTimeout(() => {
        block.classList.remove("selected");
      }, 100);
      playSound.play();
      const expectedBlock = order.shift();
      if (expectedBlock === idx) {
        if (order.length === 0) {
          setTimeout(() => {
            result.innerText = `You won this round! Click on play to play the next level`;
            levelScore *= 2;
            score.innerText = `Your Score is ${levelScore}`;
            canPlayerPlay = false;
            ++level;
            levelno.innerText = `Level ${level}`;
          }, 200);
          levelDone.play();
        }
      } else {
        loosingSound.play();
        result.innerText = `You lost this round! Click on play to start again!`;
        canPlayerPlay = false;
        level = 1;
        order.length = 0;
        levelno.innerText = `Level 1`;
        levelScore = 1;
        score.innerText = `Your Score is ${levelScore}`;
      }
    }
  });
});

play.addEventListener("click", async () => {
  order.length = 0;
  result.innerText = "";
  for (let i = 0; i < levels[level]; i++) {
    order.push(Math.floor(Math.random() * 4));
  }
  for (const block of order) {
    await flash(block);
    canPlayerPlay = true;
  }
});

restart.addEventListener("click", () => {
  order.length = 1;
  level = 1;
  levelno.innerText = `Level 1`;
  result.innerText = "";
  levelScore=1;
  score.innerText = `Your Score is 1`;
});
