import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form.form')

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
}

function onFormSubmit(e) {
  e.preventDefault()

  const delay = Number(formEl.elements.delay.value)
  const step = Number(formEl.elements.step.value)
  const amount = Number(formEl.elements.amount.value);
  
  for (let i = 0; i < amount; i += 1){
    let position = i + 1
    let currentDelay = delay + step * i

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}

formEl.addEventListener('submit', onFormSubmit)