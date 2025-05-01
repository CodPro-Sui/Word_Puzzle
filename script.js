const words = [
  "apple", "ball", "cat", "dog", "egg", "fish", "go", "hat", "ice", "jam",
  "kite", "lion", "man", "nest", "orange", "pen", "queen", "rat", "sun", "top",
  "umbrella", "van", "win", "box", "yes", "zoo", "ant", "bat", "cup", "dig",
  "eat", "fan", "gift", "hill", "ink", "jug", "key", "leg", "map", "net",
  "owl", "pig", "quiz", "rope", "sip", "toy", "use", "vet", "wet", "axe",
  "bed", "cow", "dot", "end", "fun", "gap", "hit", "ice", "job", "kid",
  "lap", "mix", "new", "old", "pop", "run", "sit", "tip", "up", "win",
  "yak", "zip", "arm", "back", "cook", "draw", "easy", "farm", "game", "hop",
  "idea", "join", "king", "look", "moon", "name", "open", "play", "quiet", "read",
  "slow", "talk", "under", "very", "walk", "x-ray", "young", "zero", "able", "big",
  "cold", "deep", "each", "fast", "good", "hard", "into", "jump", "kind", "long",
  "more", "near", "over", "part", "quit", "ride", "some", "take", "upon", "view",
  "want", "xmas", "your", "zone", "again", "blue", "clean", "drive", "easy", "face",
  "green", "hear", "iron", "joke", "kick", "love", "mean", "nice", "open", "past",
  "quiet", "rain", "say", "tell", "upset", "vote", "warm", "yard", "zebra", "ask",
  "book", "cake", "dark", "ever", "fire", "grow", "home", "idea", "join", "keep",
  "late", "mine", "near", "only", "pair", "rest", "sing", "tree", "use", "view",
  "wash", "xenon", "yarn", "zero", "away", "best", "come", "done", "else", "free",
  "give", "here", "item", "just", "know", "life", "make", "need", "okay", "push",
  "quiz", "read", "star", "top", "unit", "vast", "wing", "yard", "zip", "zone"
];


let fixLetters = document.getElementById("fixLetters");
let fillLetters = document.getElementById("fillLetters");
let next = document.getElementById("next");
let check = document.getElementById("check");

let fillBoxes = [];



function nextWord() {
  let random = Math.floor(Math.random() * words.length);
  return words[random];
}

let remainLetters;
let currentWord = "";
let attemps = 3;

function wordLogic(word) {
  currentWord = word.toLowerCase();
  fixLetters.innerHTML = "";
  fillLetters.innerHTML = "";
  remainLetters = [];
  
  for (let i = 0; i < word.length; i++) {
    let letter = document.createElement("div");
    letter.classList.add("letter");
    
    if (i % 2 === 0) {
      letter.innerHTML = word[i].toUpperCase();
    } else {
      remainLetters.push(word[i].toUpperCase());
      letter.innerHTML = "";
      letter.classList.add("empty", "filling");
      
    }
    fixLetters.appendChild(letter)
  }
  remainLetters.sort();
  for (let i = 0; i < remainLetters.length; i++) {
    let reletter = document.createElement("div");
    reletter.innerHTML = remainLetters[i];
    reletter.classList.add("letter", "filling");
    
    fillLetters.appendChild(reletter)
    
    reletter.addEventListener("click", function() {
      
      let emptyBoxes = fixLetters.querySelectorAll(".letter");
      for (let box of emptyBoxes) {
        if (box.innerHTML === "") {
          box.innerHTML = reletter.innerHTML;
          let tap = new Audio("touch.mp3");
          tap.play();
          reletter.remove();
          break;
        }
      }
    });
    
  }
  
  // undo function
  let boxes = document.querySelectorAll(".empty");
  boxes.forEach(box => {
    box.addEventListener("click", function() {
      if (box.innerHTML !== "") {
        let reletter = document.createElement("div");
        reletter.innerHTML = box.innerHTML;
        let tap = new Audio("touch.mp3");
        tap.play();
        reletter.classList.add("letter", "filling");
        fillLetters.appendChild(reletter);
        
        reletter.addEventListener("click", function() {
          let allEle = document.querySelectorAll(".letter");
          for (let each of allEle) {
            if (each.innerHTML === "") {
              each.innerHTML = reletter.innerHTML;
              let tap = new Audio("touch.mp3");
              tap.play();
              reletter.remove();
              break;
            }
          }
        })
        box.innerHTML = ""
      }
    })
  })
  
  //check
  
  
}

let cScore = document.getElementById("CScore");

let hScore = document.getElementById("HScore");

let result = 0;


let high = localStorage.getItem("score") || 0;
hScore.innerHTML = String(high).padStart(2, "0");



check.addEventListener("click", function() {
  let tap = new Audio("touch.mp3");
  tap.play();
  let userWord = "";
  const boxes = document.querySelectorAll(".letter");
  
  boxes.forEach(box => {
    userWord += box.innerHTML.toLowerCase();
  });
  
  if (userWord === currentWord) {
    let won = new Audio("won.mp3");
    attemps = 3;
    
    result += 2
    cScore.innerHTML = String(result).padStart(2, "0");
    if (result > Number(hScore.innerHTML)) {
      hScore.innerHTML = String(result).padStart(2, "0");
      localStorage.setItem("score", result);
    }
    
    boxes.forEach(box => {
      box.classList.remove("empty");
      box.classList.remove("filling");
      box.classList.remove("error");
      box.classList.add("correct");
    });
    won.play();
    check.disabled = true;
    
    
    won.onended = () => {
      wordLogic(nextWord());
      check.disabled = false;
    }
    
    
  } else {
    boxes.forEach(box => {
      let over = new Audio("over.wav");
      
      if (box.classList.contains("empty") || box.classList.contains("letter")) {
        box.classList.remove("empty");
        box.classList.remove("filling");
        box.classList.add("error");
        over.play();
        navigator.vibrate([200, 599, 100, 300]);
        
        setTimeout(() => {
          box.classList.remove("error");
          box.classList.add("letter");
          over.pause();
        }, 1500)
      }
    });
    attemps--;
    if (attemps < 1) {
      wordLogic(nextWord());
      attemps = 3;
    }
    
  }
});








wordLogic(nextWord());

next.addEventListener("click", function() {
  let tap = new Audio("touch.mp3");
  tap.play();
  tap.ended = () => {
    wordLogic(nextWord());
  }
})


//about me 

let ident = document.getElementById("identity");

ident.addEventListener("click", () => {
  ident.style.color = "blue";
  
  let infoPage = document.createElement("div");
  infoPage.classList.add("info");
  document.querySelector(".main").appendChild(infoPage);
  
  let close = document.createElement("div");
  let imageArea = document.createElement("div");
  let contentBIO = document.createElement("div");
  let center = document.createElement("div");
  center.classList.add("center");
  close.innerHTML = `<span class="material-symbols-outlined">close</span>`;
  imageArea.innerHTML = `<img src="youself.png" alt="my_pic"/>`;
  contentBIO.innerHTML = `<address style="font-family: 'cursive'">
  <strong>Name: </strong> CodPro Sui (°_*)<br>
  <strong>Skills: </strong> $HFL Programming language (:CS
</address>`;
close.classList.add("close");
  imageArea.classList.add("image");
  contentBIO.classList.add("bio");
  infoPage.appendChild(close);
  center.appendChild(imageArea);
  center.appendChild(contentBIO);
infoPage.appendChild(center);
close.addEventListener("click",() =>{
  infoPage.remove();
})
});