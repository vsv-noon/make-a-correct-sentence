const startButton = document.getElementById('start-btn');
const checkButton = document.getElementById('check-btn');
const input = document.getElementById('input');
const sentenceField = document.querySelector('.task-sentence');
const wordsField = document.querySelector('.words-field');
const result = document.querySelector('.result');

// const arrEng = ['What are you doing?', 'Hello World!', 'What is your name?'];
// const arrRus = ['Чем ты занимаешься?', 'Привет мир!', "Как тебя зовут?"];

const arrEng = [
  "What are you doing?",
  "Hello World!", 
  "What is your name?", 
  "Hello, how are you?",
  "My name is Anna.",
  "I live in a big city.",
  "This is my friend.",
  "I like to drink tea.",
  "The sun is shining today.",
  "I have a small dog.",
  "Can you help me?",
  "Where is the bus stop?",
  "I want to buy a book.",
  "She is very happy.",
  "We go to school every day.",
  "It is a beautiful house.",
  "I can speak English.",
  "Goodbye! See you soon."
];
const arrRus = [
  "Чем ты занимаешься?",
   "Привет мир!", 
   "Как тебя зовут?",
   "Привет, как ты?",
  "Меня зовут Анна.",
  "Я живу в большом городе.",
  "Это мой друг.",
  "Я люблю пить чай.",
  "Сегодня светит солнце.",
  "У меня есть маленькая собака.",
  "Ты можешь мне помочь?",
  "Где автобусная остановка?",
  "Я хочу купить книгу.",
  "Она очень счастлива.",
  "Мы ходим в школу каждый день.",
  "Это красивый дом.",
  "Я говорю по-английски.",
  "До свидания! Увидимся скоро."
  ];

let current = 0;

input.addEventListener('input', () => {
  if (input.value.length !== 0) {
    checkButton.classList.remove('disabled');
  } else {
    checkButton.classList.add('disabled');
  }
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    // event.preventDefault();
    checkButton.click();
  }
})

startButton.addEventListener('click', function (event) {
  input.value = '';
  wordsField.innerHTML = '';
  result.innerHTML = '';
  current = Math.floor(Math.random() * arrEng.length);
  sentenceField.innerHTML = arrRus[current];

  const shuffled = arrEng[current].toLowerCase().replace(/[\W_]+/g, ' ').trim().split(' ').sort(function() {
    return 0.5 - Math.random();
  });

  shuffled.forEach((el) => {
    let item = document.createElement('p');
    item.classList.add('word');
    item.innerHTML = el;

    wordsField.appendChild(item);

  });

  checkButton.classList.add('disabled');
  input.classList.remove('disabled');
  input.focus();
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
