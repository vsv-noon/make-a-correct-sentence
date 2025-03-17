// import { arrEng, arrRus } from "./../data/arrays.js";

const header = document.querySelector(".header");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const svgMoon = document.querySelector(".svg-moon");
const svgSun = document.querySelector(".svg-sun");
const startButton = document.getElementById("start-btn");
const checkButton = document.getElementById("check-btn");
const input = document.getElementById("input");
const resetButton = document.querySelector(".reset-btn");
const sentenceField = document.querySelector(".task-sentence");
const wordsField = document.querySelector(".words-field");
const result = document.querySelector(".result");

const themeChangerInput = document.querySelector("#theme-changer-input");
const themeChangerLabel = document.querySelector(".theme-changer-label");

let current = 0;

const url = "./data/sentences.json";
const arrEng = [];
const arrRus = [];
let shuffled = [];

async function fetchSentencesJSON() {
  const response = await fetch(url);
  const sentences = await response.json();
  return sentences;
}

fetchSentencesJSON().then((data) => {
  for (let i = 0; i < data.length; i++) {
    arrEng[i] = data[i]["eng"];
    arrRus[i] = data[i]["rus"];
  }
});

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     for (let i = 0; i < data.length; i++) {
//       arrEng[i] = data[i]['eng'];
//       arrRus[i] = data[i]['rus'];
//     }
//   });

function initTheme() {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'dark') {
      darkTheme();
    } else {
      lightTheme();
    }
  }
};

initTheme();

themeChangerInput.addEventListener("click", () => {
     if (themeChangerInput.checked) {
       darkTheme();
       localStorage.setItem('theme', 'dark');
    } else {
      lightTheme();
      localStorage.setItem('theme', 'light');
    }
    resultFieldBackground();
});

// function changeTheme(themeChangerInput) {
//   svgMoon.classList.toggle("svg-none-display");
//   header.classList.toggle("dark-theme");
//   main.classList.toggle("dark-theme");
//   footer.classList.toggle("dark-theme");
//   svgSun.classList.toggle("svg-none-display");
//   resultFieldBackground();
// }

function darkTheme() {
  themeChangerInput.checked = true;
  svgSun.classList.remove("svg-none-display");
  svgMoon.classList.add("svg-none-display");
  header.classList.add("dark-theme");
  main.classList.add("dark-theme");
  footer.classList.add("dark-theme");
}

function lightTheme() {
  themeChangerInput.checked = false;
  svgSun.classList.add("svg-none-display");
  svgMoon.classList.remove("svg-none-display");
  header.classList.remove("dark-theme");
  footer.classList.remove("dark-theme");
  main.classList.remove("dark-theme");
}

input.addEventListener("input", () => {
  if (input.value.length !== 0) {
    checkButton.classList.remove("disabled");
    resetButton.style.display = "block";
  } else {
    initState();
  }
});

resetButton.addEventListener("click", () => {
  initState();
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    // event.preventDefault();
    checkButton.click();
  }
});

function initState() {
  input.value = "";
  result.innerHTML = "";
  checkButton.classList.add("disabled");
  resetButton.style.display = "none";
  result.style.background = "transparent";
}

startButton.addEventListener("click", function (event) {
  initState();
  wordsField.innerHTML = "";

  current = Math.floor(Math.random() * arrEng.length);
  sentenceField.innerHTML = arrRus[current];

  shuffled = arrEng[current]
    .replace(/[\W_]+/g, " ")
    .trim()
    .split(" ")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .concat(
      arrEng[current]
        .replace(/[\w\s]+/g, "")
        .trim()
        .split("")
    );

  shuffled.forEach((el, i) => {
    let item = document.createElement("p");
    item.setAttribute("id", i);
    item.classList.add("word");
    item.innerHTML = el.toLowerCase();

    wordsField.appendChild(item);
  });

  input.classList.remove("disabled");
  input.focus();
});

checkButton.addEventListener("click", () => {
  if (input.value === arrEng[current]) {
    result.style.color = "green";
    result.innerHTML = `Поздравляем с правильным ответом!)`;
  } else {
    result.style.color = "red";
    // result.style.background = '#cdf2f5';

    result.innerHTML = `Вы ввели: <span>${input.value}</span>. Скорректируйте свой ответ.`;
  }

  resultFieldBackground();
});

function resultFieldBackground() {
  if (main.classList.contains("dark-theme") && input.value) {
    result.style.background = "#cdf2f5";
  } else {
    result.style.background = "transparent";
  }
}

document.addEventListener("click", (event) => {
  let target = event.target.closest(".word");

  if (target) {
    if (!input.value.includes(shuffled[target.id])) {
      if (input.value.length === 0 || shuffled[target.id].match(/[\W]/)) {
        input.value += shuffled[target.id];
      } else {
        input.value += " " + shuffled[target.id];
      }
    } else {
      input.value = input.value.replace(shuffled[target.id], "").trim();
      input.value = input.value.replace(/[\s]+/g, " ").trim();
      if (!input.value) {
        initState();
      }
    }

    // if (input.value.length === 0 || shuffled[target.id].match(/[\W]/)) {
    //   input.value += shuffled[target.id];
    // } else {
    //   input.value += ' ' + shuffled[target.id];
    // }
  }

  if (input.value) {
    // target.classList.add('disabled');
    checkButton.classList.remove("disabled");
    resetButton.style.display = "block";
  }
});

// Copyright

document
  .getElementById("year")
  .appendChild(document.createTextNode(new Date().getFullYear()));
