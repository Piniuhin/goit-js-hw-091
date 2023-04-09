import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const input = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

input.addEventListener('focus', flatpickr);
startBtn.disabled = true;
let setIntervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    }
    else {
      startBtn.addEventListener('click', () => {
        startBtn.disabled = true;

        setIntervalId = setInterval(() => {
          const diff = selectedDates[0] - Date.now();
          const time = convertMs(diff);
          updateTimer(time), 1000;

          if (diff < 1000) {
            clearInterval(setIntervalId);
          }
        });
      });

    input.disabled = true;
    startBtn.disabled = false;
    }   
  } 
};

flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, "0")
};

function updateTimer ({ days, hours, minutes, seconds }) {
  daysSpan.textContent = `${days}`;
  hoursSpan.textContent = `${hours}`;
  minutesSpan.textContent = `${minutes}`;
  secondsSpan.textContent = `${seconds}`;
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

