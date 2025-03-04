const startButton = document.getElementById('start-btn');
const checkButton = document.getElementById('check-btn');
const input = document.getElementById('input');
const sentenceField = document.querySelector('.task-sentence');
const wordsField = document.querySelector('.words-field');
const result = document.querySelector('.result');

const arrEng = ['What are you doing?', 'Hello, World!', 'What is your name?'];
const arrRus = ['Чем ты занимаешься?', 'Привет, мир!', "Как тебя зовут?"];
let current = 0;

startButton.addEventListener('click', function (event) {
  input.value = '';
  current = Math.floor(Math.random() * arrEng.length);
  sentenceField.innerHTML = arrRus[current];
  // sentenceField.innerHTML = '';
  const shuffled = arrEng[current].toLowerCase().replace(/[\W_]+/g, ' ').split(' ').sort(function() {
    // console.log(0.5 - Math.random());
    return 0.5 - Math.random();
  }).join(' ');

  wordsField.innerHTML = shuffled;

});

checkButton.addEventListener('click', () => {
  if (!input.value) {
    result.style.color = 'red';
    result.innerHTML = 'Вы ничего не ввели, попробуйте еще раз!!!';
  } else if ((input.value).includes(arrEng[current])) {
    result.style.color = 'green';
    result.innerHTML = `Поздравляем с правильным ответом!)`;
  } else {
    result.style.color = 'red';
    result.innerHTML = `Вы ввели: ${input.value}`;
  }
})
