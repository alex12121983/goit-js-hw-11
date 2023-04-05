class Images {
  constructor(url, link, tags, likes, views, comments, downloads) {
    this.url = url;
    this.link = link;
    this.tags = tags;
    this.likes = likes;
    this.views = views;
    this.comments = comments;
    this.downloads = downloads;
  }
}

const createCollection = collection => {
  return collection.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) =>
      new Images(
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
      )
  );
};

const renderImages = collection => {
  const gallery = document.querySelector('.gallery');
  const images = collection
    .map(image => {
      return `<div class="photo-card">
              <img src="${image.url}" alt="${image.tags}" loading="lazy" />
              <div class="info">
                  <p class="info-item">
                    <b>Likes ${image.likes}</b>
                  </p>
                  <p class="info-item">
                    <b>Views ${image.views}</b>
                  </p>
                  <p class="info-item">
                    <b>Comments ${image.comments}</b>
                  </p>
                  <p class="info-item">
                    <b>Downloads ${image.downloads}</b>
                  </p>
              </div>
            </div>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', images);
};

const updateTotal = total => {
  let el = document.querySelector('.total');
  if (!el) {
    el = document.createElement('label');
    el.classList.add('total');
    const container = document.querySelector('.search-form');
    container.append(el);
  }

  el.textContent = `Total images: ${total}`;
};

const deleteTotal = () => {
  let el = document.querySelector('.total');
  if (el) {
    el.remove();
  }
};

const updateLoadButton = (currentPage, finalPage) => {
  const btn = document.querySelector('.load-more');
  btn.style.display = 'block';
  // btn.classList.remove('hidden');
  btn.dataset.page = Number(currentPage) + 1;
  btn.dataset.final = finalPage;
};

const hideLoadButton = evt => {
  const btn = document.querySelector('.load-more');
  // btn.classList.add('hidden');
  btn.style.display = 'none';
};

const clearImages = () => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
};

export {
  createCollection,
  renderImages,
  updateTotal,
  deleteTotal,
  updateLoadButton,
  hideLoadButton,
  clearImages,
};
