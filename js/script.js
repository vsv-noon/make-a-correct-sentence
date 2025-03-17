// import { arrEng, arrRus } from "./../data/arrays.js";

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const svgMoon = document.querySelector('.svg-moon');
const svgSun = document.querySelector('.svg-sun');
const startButton = document.getElementById('start-btn');
const checkButton = document.getElementById('check-btn');
const input = document.getElementById('input');
const resetButton = document.querySelector('.reset-btn');
const sentenceField = document.querySelector('.task-sentence');
const wordsField = document.querySelector('.words-field');
const result = document.querySelector('.result');

const themeChangerInput = document.querySelector('#theme-changer-input');
const themeChangerLabel = document.querySelector('.theme-changer-label');

let current = 0;

const url = './data/sentences.json';
const arrEng = [];
const arrRus = [];

async function fetchSentencesJSON() {
  const response = await fetch(url);
  const sentences = await response.json();
  return sentences;
};

fetchSentencesJSON().then(data => {
  for (let i = 0; i < data.length; i++) {
    arrEng[i] = data[i]['eng'];
    arrRus[i] = data[i]['rus'];
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

themeChangerLabel.addEventListener('click', () => {
  if (themeChangerInput.checked) {
    themeChangerInput.checked;
    svgMoon.classList.add('svg-non-display');
    header.classList.add('dark-theme');
    main.classList.add('dark-theme');
    footer.classList.add('dark-theme');
    svgSun.classList.remove('svg-non-display');
  } else {
    !themeChangerInput.checked;
    svgSun.classList.add('svg-non-display');
    svgMoon.classList.remove('svg-non-display');
    header.classList.remove('dark-theme');
    footer.classList.remove('dark-theme');
    main.classList.remove('dark-theme');
  }
  resultFieldBackground();

})

input.addEventListener('input', () => {
  if (input.value.length !== 0) {
    checkButton.classList.remove('disabled');
    resetButton.style.display = 'block';
  } else {
    checkButton.classList.add('disabled');
    resetButton.style.display = 'none';
    result.innerHTML = '';
    result.style.background = 'transparent';
  }
});

resetButton.addEventListener('click', () => {
  input.value = '';
  checkButton.classList.add('disabled');
  resetButton.style.display = 'none';
  result.innerHTML = '';
  result.style.background = 'transparent';
})

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    // event.preventDefault();
    checkButton.click();
  }
});

startButton.addEventListener('click', function (event) {
  input.value = '';
  wordsField.innerHTML = '';
  result.innerHTML = '';
  result.style.background = 'transparent';

  current = Math.floor(Math.random() * arrEng.length);
  sentenceField.innerHTML = arrRus[current];

  const shuffled = arrEng[current].toLowerCase().replace(/[\W_]+/g, ' ').trim().split(' ').sort(function () {
    return 0.5 - Math.random();
  }).concat(arrEng[current].replace(/[\w\s]+/g, '').trim().split(''));

  shuffled.forEach((el) => {
    let item = document.createElement('p');
    item.classList.add('word');
    item.innerHTML = el;

    wordsField.appendChild(item);
  });

  checkButton.classList.add('disabled');
  input.classList.remove('disabled');
  input.focus();

  // console.log(word);
});

checkButton.addEventListener('click', () => {
  // if ((input.value).includes(arrEng[current])) {
  if (input.value === arrEng[current]) {
    result.style.color = 'green';
    result.innerHTML = `Поздравляем с правильным ответом!)`;
  } else {
    result.style.color = 'red';
    // result.style.background = '#cdf2f5';

    result.innerHTML = `Вы ввели: <span>${input.value}</span>. Скорректируйте свой ответ.`;
  }

  resultFieldBackground();
});

function resultFieldBackground() {
  if ((main.classList.contains('dark-theme')) && input.value) {
    result.style.background = '#cdf2f5';
  } else {
    result.style.background = 'transparent';
  }
}

document.addEventListener('click', (event) => {
  let target = event.target.closest('.word');

  if (target) {
    if (input.value.length === 0) {
      input.value += target.innerHTML.slice(0, 1).toUpperCase() + target.innerHTML.slice(1)
    } else if (target.innerHTML.match(/[\W]/)) {
      input.value += target.innerHTML;
    } else {
      input.value += ' ' + target.innerHTML;
    }
  };

  if (input.value) {
    // target.classList.add('disabled');
    checkButton.classList.remove('disabled');
    resetButton.style.display = 'block';
  }

});


// Copyright

document.getElementById('year').appendChild(document.createTextNode(new Date().getFullYear()));
