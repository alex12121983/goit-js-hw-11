import Notiflix from 'notiflix';
import { getImages } from './js/apiClient';
import {
  renderImages,
  createCollection,
  updateTotal,
  updateLoadButton,
  clearImages,
} from './js/images';
import './css/styles.css';

const refs = {
  input: document.querySelector('#search-form'),
  button: document.querySelector('button[type="submit"]'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let searchState = '';
let pageState = 1;

const fetchImages = (search, page) =>
  getImages(search, page)
    .then(response => {
      renderImages(createCollection(response.data.hits));
      const finalPage = Math.ceil(Number(response.data.totalHits) / 10);
      updateLoadButton(page, finalPage);
      updateTotal(response.data.totalHits);
    })
    .catch(error => console.error(error));

refs.button.addEventListener('click', evt => {
  evt.preventDefault();

  const search = refs.input.value;

  if (search !== searchState) {
    searchState = search;
    pageState = 1;
    clearImages();
    fetchImages(search, 1);
  }
});

refs.loadMoreBtn.addEventListener('click', evt => {
  const page = refs.loadMoreBtn.dataset.page;
  const final = refs.loadMoreBtn.dataset.final;

  if (final !== page) {
    const search = refs.input.value;
    fetchImages(search, page);
  }
});
