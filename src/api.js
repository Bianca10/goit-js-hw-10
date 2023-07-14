const url = 'https://api.thecatapi.com/v1';
const api_key =
  'live_Mu9tKOkWLHDf5fGNucoTmEq360gLatfP1tsVc0MqGSTxXhbPzUgb0G8fwGTWqo99';

export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${api_key}`).then(response =>
    response.json()
  );
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`
  ).then(response => response.json());
}
