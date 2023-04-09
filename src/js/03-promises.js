import Notiflix from 'notiflix'; 

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault()

  const delay = Number(this.delay.value);
  const stepDelay = Number(this.step.value);
  const amount = Number(this.amount.value);
  let diffDelay = delay - stepDelay;

for (let position = 1; position <= amount; position += 1) {
  diffDelay += stepDelay;
  createPromise(position, diffDelay).then(onResolve).catch(onReject);
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      else reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay)
  })
}

function onResolve(value) {
  Notiflix.Notify.success(value);
}

function onReject(error) {
  Notiflix.Notify.failure(error);
} 