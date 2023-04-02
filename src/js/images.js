class Images {
  constructor(url, link, alt, likes, views, comments, downloads) {
    this.url = url;
    this.link = link;
    this.alt = alt;
    this.likes = likes;
    this.views = views;
    this.comments = comments;
    this.downloads = downloads;
  }
}

const createCollection = collection => {
  // const collection = hits.slice(0, count);
  // console.log(collection);
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
  //   const li = document.createElement('li');
  //   li.classList.add('news-item');

  //   const title = document.createElement('h2');
  //   title.classList.add('news-title');
  //   title.textContent = article.title;
  //   li.append(title);

  //   const desc = document.createElement('p');
  //   desc.classList.add('news-content');
  //   desc.textContent = article.description;
  //   li.append(desc);

  //   const date = document.createElement('span');
  //   date.classList.add('news-date');
  //   date.textContent = article.publishedAt;
  //   li.append(date);

  //   return li;
  // });
  gallery.insertAdjacentHTML('beforeend', images);
  // newsContainer.append(...news);
};

const updateTotal = total => {
  let el = document.querySelector('.total');
  if (!el) {
    el = document.createElement('label');
    el.classList.add('total');
    const container = document.querySelector('.search-form');
    container.append(el);
  }

  el.textContent = `Total articles: ${total}`;
};

const updateLoadButton = (currentPage, finalPage) => {
  const btn = document.querySelector('.load-more hidden');
  btn.style.display = 'block';
  btn.dataset.page = Number(currentPage) + 1;
  btn.dataset.final = finalPage;
};

const clearImages = () => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
};

export {
  createCollection,
  renderImages,
  updateTotal,
  updateLoadButton,
  clearImages,
};
