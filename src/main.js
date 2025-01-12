import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { requestSending } from './js/pixabay-api';
import { markupSearchForm, renderGallery, markupLoadButton } from './js/render-functions';

markupSearchForm();
markupLoadButton();

const searchForm = document.querySelector('.search-image-form');
const searchField = document.querySelector('.search-field');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const maxPages = 2; 

let page = 1; 
let currentQuery = ''; 

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more-button');
  if (loadMoreButton) {
    loadMoreButton.style.display = 'block';
  }
}

function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more-button');
  if (loadMoreButton) {
    loadMoreButton.style.display = 'none';
  }
}

/*======================================================
========================================================*/

/*searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = searchField.value.trim();

  if (!query) {
    return;
  }

  currentQuery = query; 
  page = 1; 
  gallery.innerHTML = ''; 
  hideLoadMoreButton(); 

  try {
    const data = await requestSending(query, page); 
    if (data.hits.length === 0) {
      throw new Error('No results found');
    }

    renderGallery(data.hits);
    if (data.totalHits > 15) {
      showLoadMoreButton(); 
    }
  } catch (error) {
    console.error(error.message);
    iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again.',
      position: 'topRight',
      class: 'error-toast',
      timeout: 4000,
    });
  } finally {
    hideLoader();
    searchField.value = '';
  }
});

const loadMoreButton = document.querySelector('.load-more-button');

loadMoreButton.addEventListener('click', async () => {
  page += 1; 
  showLoader();

  try {
    const data = await requestSending(currentQuery, page);
    renderGallery(data.hits); 
    if (page * 15 >= data.totalHits) {
      hideLoadMoreButton(); 
    }
  } catch (error) {
    console.error(error.message);
    iziToast.error({
      message: 'Failed to load more images. Please try again.',
      position: 'topRight',
      class: 'error-toast',
      timeout: 4000,
    });
  } finally {
    hideLoader();
  }
});*/

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = searchField.value.trim();

  if (!query) {
    return;
  }

  currentQuery = query;
  page = 1; 
  gallery.innerHTML = '';
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await requestSending(query, page);
    if (data.hits.length === 0) {
      throw new Error('No results found');
    }

    renderGallery(data.hits);

    if (data.totalHits > page * 15) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        class: 'info-toast',
        timeout: 4000,
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again.',
      position: 'topRight',
      class: 'error-toast',
      timeout: 4000,
    });
  } finally {
    hideLoader();
  }

  searchField.value = '';
});

const loadMoreButton = document.querySelector('.load-more-button');
loadMoreButton.addEventListener('click', async () => {
  if (page >= maxPages) {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results (test mode).",
      position: 'topRight',
      class: 'info-toast',
      timeout: 4000,
    });
    return;
  }

  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await requestSending(currentQuery, page);
    renderGallery(data.hits);

    if (data.totalHits <= page * 15 || page >= maxPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        class: 'info-toast',
        timeout: 4000,
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while loading more images. Please try again.',
      position: 'topRight',
      class: 'error-toast',
      timeout: 4000,
    });
  } finally {
    hideLoader();
  }
});

/*loadMoreButton.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await requestSending(currentQuery, page);
    renderGallery(data.hits);

    // Перевірка на кінець колекції
    if (data.totalHits <= page * 15) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        class: 'info-toast',
        timeout: 4000,
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while loading more images. Please try again.',
      position: 'topRight',
      class: 'error-toast',
      timeout: 4000,
    });
  } finally {
    hideLoader();
  }
});*/
