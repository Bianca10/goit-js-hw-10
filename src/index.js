import { fetchBreeds, fetchCatByBreed } from './api.js';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_Mu9tKOkWLHDf5fGNucoTmEq360gLatfP1tsVc0MqGSTxXhbPzUgb0G8fwGTWqo99';

const selectedBreed = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.add('is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let arrayBreedsId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrayBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selectedBreed,
      data: arrayBreedsId,
    });
  })
  .catch(onError);

selectedBreed.addEventListener('change', onSelectedBreed);

function onSelectedBreed(event) {
  event.preventDefault();

  loader.classList.replace('is-hidden', 'loader');
  selectedBreed.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      selectedBreed.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class="cat-image">
                                 <img src="${url}" alt="${breeds[0].name}" width="400"/>
                            </div>
                            <div class="cat-about">
                                <h1>${breeds[0].name}</h1>
                                <p>${breeds[0].description}</p>
                                <p><b>Temperament:</b> ${breeds[0].temperament}</p>
                            </div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
}

function onError(error) {
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-center',
  });
}

selectedBreed.style.width = '250px';
