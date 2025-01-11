import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { requestSending } from './js/pixabay-api';
import { markupSearchForm, renderGallery, markupLoadButton } from './js/render-functions';
import axios from 'axios';

markupSearchForm();
markupLoadButton();

const searchForm = document.querySelector('.search-image-form');
const searchField = document.querySelector('.search-field');
const gallery = document.querySelector('.gallery');

const loader = document.querySelector('.loader');

  /*======== http request version 1  ========*/
/*searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 
  const query = searchField.value.trim();

  if (!query) {
    return;
  }

  showLoader();

  try {
    const data = await requestSending(query); 
    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
        class: 'error-toast',
        timeout: 4000,
      });
      return;
    }
    
   gallery.innerHTML = ''; 
   
  renderGallery(data.hits);
  hideLoader()
  } catch (error) {  
  }
  finally {
  }

  searchField.value = ''; 
});*/

/*======== http request version 2 ========*/
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const query = searchField.value.trim();

  if (!query) {
    return;
  }

  showLoader();
  requestSending(query)
  .then((data) => {
    if (data.hits.length === 0) {
      gallery.innerHTML = '';  
      throw new Error('No results found'); 
    }

    gallery.innerHTML = '';
    renderGallery(data.hits);
    hideLoader();
  })
  .catch((error) => {
    console.log(error.message); 

    iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again.',
      position: 'topRight',
      class: 'error-toast',
      timeout: 4000,
    });

    hideLoader(); // 
  })
  .finally(() => {
    searchField.value = ''; 
  });

  /*======== http request version 3 ========*/
  /*requestSending(query)
    .then((data) => {
      if (data.hits.length === 0) {
        gallery.innerHTML = '';       
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again.',
          position: 'topRight',
          class: 'error-toast',
          timeout: 4000,
        });
        hideLoader(); 
        return;
      }
      gallery.innerHTML = ''; 
      renderGallery(data.hits); 
      hideLoader();
    })

    .catch((error) => {
      console.log('Error. Try entering the correct word!');  
      hideLoader(); 
    })
    .finally(() => {
      searchField.value = ''; 
    });*/
});



function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}