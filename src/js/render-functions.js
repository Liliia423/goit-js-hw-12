import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function markupSearchForm() {
  const tegMain = document.querySelector('main');

  const tegForm = document.createElement('form');
  tegForm.className = 'search-image-form';

  const tegInput = document.createElement('input');
  tegInput.type = 'text';
  tegInput.name = 'field';
  tegInput.className = 'search-field';
  tegInput.placeholder = 'Search images...';
  tegForm.appendChild(tegInput);

  const tegButton = document.createElement('button');
  tegButton.textContent = 'Search';
  tegButton.type = 'submit';
  tegButton.className = 'submit-button';
  tegForm.appendChild(tegButton);

  tegMain.prepend(tegForm);
}

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => 
    `
    <li>
    
      <a href="${image.largeImageURL}" title="${image.tags}">
        <img src="${image.webformatURL}" alt="${image.tags}" />  
      </a>
       <div class="gallery-info">
        <p class="gallery-info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="gallery-info-item"><b>Views:</b> ${image.views}</p>
        <p class="gallery-info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="gallery-info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </li>
  `
).join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.refresh();
}

export function markupLoadButton() {
  const gallery = document.querySelector('.gallery');

  const loadMoreButton = document.createElement('button');
  loadMoreButton.textContent = 'Load more';
  loadMoreButton.type = 'button'; 
  loadMoreButton.className = 'submit-button load-more-button';
  loadMoreButton.style.display = 'none'; 

  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.style.display = 'none'; 

  gallery.insertAdjacentElement('afterend', loadMoreButton);
  
  loadMoreButton.insertAdjacentElement('afterend', loader);
}

 
 