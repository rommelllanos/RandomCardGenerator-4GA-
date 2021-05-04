/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

var suits = ["♦", "♥", "♠", "♣"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];
var timer;
var countdown = 10;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//function that renders the card
function render(variables = {}) {
  document.querySelector("#card").innerHTML = `
    <div class = "topSuit" style = "color: ${variables.color}">
      <span>${variables.suit}</span>
    </div>
    
    <div class = "value">
      <span>${variables.value}</span>
    </div>
    
    <div class = "bottomSuit" style = "color: ${variables.color}">
      <span>${variables.suit}</span>
    </div>`;
}

window.onload = function() {
  window.variables = {
    suit: suits[Math.floor(Math.random() * suits.length)],
    value: values[Math.floor(Math.random() * values.length)],
    color: "#d23b3b"
  };

  console.log(variables.suit);
  if (variables.suit == "♠" || variables.suit == "♣") {
    variables.color = "rgb(44, 44, 44)";
  }
  //renders the card for the first time
  render(window.variables);
};

document.getElementById("button").onclick = async function() {
  flipCard();
  randomize(window.variables);
  document.getElementById("button").disabled = true;
  await sleep(1000);
  flipCard();
  document.getElementById("button").disabled = false;
};

document.getElementById("cardcontainer").onmouseover = async function() {
  moveLeft();
};

document.getElementById("section").onmouseover = async function() {
  moveRight();
};

document.onclick = async function() {
  moveLeft();
};

function randomize(variables = {}) {
  window.variables = {
    suit: suits[Math.floor(Math.random() * suits.length)],
    value: values[Math.floor(Math.random() * values.length)]
  };

  if (window.variables.suit == "♠" || window.variables.suit == "♣") {
    window.variables.color = "rgb(44, 44, 44)";
  } else {
    window.variables.color = "#d23b3b";
  }
  countdown = 10;
  clearInterval(intervalo);
  intervalo = window.setInterval(randomizeInterval, 10000);

  render(window.variables);
}

function flipCard() {
  const card1 = document.getElementById("flipper1");
  card1.classList.toggle("flipCard");
}

function moveLeft() {
  const section = document.getElementById("section");
  const texto = document.getElementById("titulo");
  section.classList.add("col-2");
  texto.classList.add("titulazo");
}

function moveRight() {
  const section = document.getElementById("section");
  const texto = document.getElementById("titulo");
  section.classList.remove("col-2");
  texto.classList.remove("titulazo");
}

// Update the count down every 1 second
var x = setInterval(function() {
  console.log(countdown);
  countdown = countdown - 1;
  document.getElementById("counter").innerHTML = countdown;

  if (countdown <= 0) {
    document.getElementById("counter").innerHTML = "0";
  }
}, 1000);

async function randomizeInterval() {
  flipCard();
  randomize();
  document.getElementById("button").disabled = true;
  await sleep(1000);
  flipCard();
  document.getElementById("button").disabled = false;
}

//intervals that change the card on 10s
var intervalo = window.setInterval(randomizeInterval, 10000);
