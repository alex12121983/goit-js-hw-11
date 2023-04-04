import Notiflix from 'notiflix';
import { getImages } from './js/apiClient';
import {
  renderImages,
  createCollection,
  updateTotal,
  updateLoadButton,
  hideLoadButton,
  clearImages,
} from './js/images';
import './css/styles.css';

const refs = {
  input: document.querySelector('#search-form input[type="text"]'),
  button: document.querySelector('button[type="submit"]'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let searchState = '';
let pageState = 1;

const fetchImages = (search, page) =>
  getImages(search, page)
    .then(response => {
      if (response.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      renderImages(createCollection(response.hits));
      const finalPage = Math.ceil(Number(response.totalHits) / 40);
      updateLoadButton(page, finalPage);
      updateTotal(response.totalHits);
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
  const page = refs.loadMoreBtn.dataset.page; //2
  const final = refs.loadMoreBtn.dataset.final; //2

  if (final >= page) {
    const search = refs.input.value;
    fetchImages(search, page);
  }

  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );

  hideLoadButton();
});
