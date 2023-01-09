import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css";

const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')
const dateTimeEl = document.querySelector('input#datetime-picker')
const startEl = document.querySelector('button[data-start]')

startEl.disabled = true

let deadline = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future')
      startEl.disabled = true
      return;
    }
    
    deadline = new Date(selectedDates[0])
    console.log(dateStr);
    startEl.disabled = false
  },
};

function onStartClick(e) {
  startEl.disabled = true
  dateTimeEl.disabled = true

  intervalId = setInterval(() => {
    if (deadline - Date.now() <= 0) {
      clearInterval(intervalId);
      Notify.success("Time is up :)")
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deadline - Date.now())

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(num) {
  return num.toString().padStart(2, 0); 
}

flatpickr('#datetime-picker', options)

startEl.addEventListener('click', onStartClick)
