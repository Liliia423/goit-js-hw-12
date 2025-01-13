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

/*========page-scrolling-start========*/

function getCardHeight() {
  const galleryItem = document.querySelector('.gallery li'); 
  if (galleryItem) {
    return galleryItem.getBoundingClientRect().height; 
  }
  console.warn('No gallery items found!');
  return 0; 
}

function scrollToNextPage() {
  const galleryItem = document.querySelector('.gallery li');
  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height; 
    /*console.log('Item height:', itemHeight);*/
    
    setTimeout(() => {
      window.scrollBy({
        top: 2 * itemHeight,
        behavior: 'smooth',
      });
    }, 100); 
  } else {
    console.warn('No gallery items found for scrolling.');
  }
}



/*========page-scrolling-end========*/


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
    getCardHeight()
    setTimeout(() => {
      /*console.log('Calling scrollToNextPage...');*/
      scrollToNextPage(); 
}, 100); 

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

/*========load-more-button========*/
const loadMoreButton = document.querySelector('.load-more-button');

loadMoreButton.addEventListener('click', async () => {
  page += 1; 
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await requestSending(currentQuery, page);
    renderGallery(data.hits);

    setTimeout(() => {
      scrollToNextPage(); 
    }, 300);

    const loadedImages = page * 15; 
    if (loadedImages >= data.totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        class: 'info-toast',
        timeout: 4000,
      });
      hideLoadMoreButton(); 
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


//loader check
    /*const data = await new Promise((resolve) => {
      setTimeout(async () => {
        const result = await requestSending(currentQuery, page);
        resolve(result);
      }, 3000); 
    });
    renderGallery(data.hits);*/

