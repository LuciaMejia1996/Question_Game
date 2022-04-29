'use strict';
const pre = document.querySelector('.question > p');
const skip_button = document.querySelector('.part2 > .skip > button');
let Question = document.querySelector('.part2 > .point > .circulo > p');
const correctas = document.querySelector('.part2 > .respuesta > p.acertadas');
const falla = document.querySelector('.part2 > .respuesta > p.fallos');

const pre_red = document.querySelector('.res > .res1 > p');
const pre_blue = document.querySelector('.res > .res2 > p');
const pre_yellow = document.querySelector('.res > .res3 > p');
const pre_green = document.querySelector('.res > .res4 > p');

//elegir cuadros aleatorios para las preguntas
const res_aleatoria = [pre_red, pre_blue, pre_yellow, pre_green];

//puntos negativos
let number_question = 1;
let negative_points = 0;
let pointe = 0;
let numero = 0;

const getCuestions = async () => {
  try {
    const response = await fetch(`./json/quiz.json`);

    const data = await response.json();

    for (const key of CuestionsRandom(data)) {
      EscribirPreguntas(key);
    }
  } catch (error) {
    console.error(error);
  }
};

getCuestions();

function CuestionsRandom(datea) {
  let array_pregunt = [];

  //const num_random = Math.floor(Math.random() * datea.length);
  array_pregunt.push(datea[numero++]);

  return array_pregunt;
}

function EscribirPreguntas({ question, correct, answers }) {
  pre.textContent = question;

  for (let i = 0; i < answers.length; i++) {
    if (correct === answers[i]) {
      const co = res_aleatoria[i];
      co.textContent = correct;
      co.classList = 'correct';
    } else {
      const co = res_aleatoria[i];
      co.textContent = answers[i];
      co.classList = 'incorrect';
    }
  }
}

function IsCorrect(e) {
  //console.log(e.target.classList[0]);
  const p = e.target;
  const x = p.querySelector('p');
  if (x !== null && p !== null) {
    if (e.target.classList[0] === 'correct' || x.classList[0] === 'correct') {
      pointe++;
      number_question++;
      correctas.textContent = pointe;
      Question.textContent = number_question;

      if (number_question >= 50) {
        alert('Juego Finalizado. Puntos: ' + pointe);
        EndGame();
      } else {
        getCuestions();
      }
    } else {
      number_question++;
      Question.textContent = number_question;
      if (number_question >= 51) {
        alert('Juego Finalizado. Puntos: ' + pointe);
        EndGame();
      } else {
        getCuestions();
      }
    }
  }
}

function EndGame() {
  numero = 0;
  correctas.textContent = 0;
  negative_points = 0;
  pointe = 0;
  number_question = 1;
  Question.textContent = number_question;
  getCuestions();
}

function skip() {
  const coso = confirm('¿Desea saltarse esta pregunta?');
  if (coso) {
    if (number_question >= 50) {
      EndGame();
    } else {
      number_question++;
      Question.textContent = number_question;
      getCuestions();
    }
  }
}

const div = document.querySelectorAll('div.res > div');
for (const key of div) {
  key.addEventListener('click', IsCorrect);
}

skip_button.addEventListener('click', skip);
