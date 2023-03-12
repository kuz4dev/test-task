const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
let timer;

// Форматирование времени
const formattingTime = function (number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    timer = setInterval(function () {
      const second = formattingTime(seconds % 60);
      let minute = formattingTime(Math.trunc(seconds / 60 % 60));
      let hour = formattingTime(Math.trunc(seconds / 60 / 60 % 60));

      if (seconds < 0) {
        clearInterval(timer);
      } else {
        --seconds;
        timerEl.innerHTML = `${hour}:${minute}:${second}`;
      }
    }, 1000)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  if (e.target.value.match(/[^0-9]/g))
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  clearInterval(timer); // остановка предыдущего таймера при запуске нового
  animateTimer(seconds);

  inputEl.value = '';
});
