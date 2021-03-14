// import _debounce from 'lodash';
import createBaseMarkup from './markup/baseMarkup';
import ApiService from './api/apiService';
import createMarkupCard from './markup/createCardMarkup';
import openModal from './utils/modalPic';
//--------------------------------------------------------------
createBaseMarkup();
//--------------------------------------------------------------
const refs = {
  formRef: document.querySelector('#search-form'),
  inputRef: document.querySelector('input'),
  galleryRef: document.querySelector('.gallery'),
  buttonSearchRef: document.querySelector('.js-search'),
  buttonRef: document.querySelector('.js-load-more'),
  observeBoxRef: document.querySelector('.observeBox'),
};
const {
  formRef,
  inputRef,
  galleryRef,
  buttonRef,
  buttonSearchRef,
  observeBoxRef,
} = refs;
const apiService = new ApiService();

buttonRef.disabled = true;
//--------------------------------------------------------------
function onInputChange(event) {
  event.preventDefault();
  buttonRef.disabled = false;
  buttonSearchRef.textContent = 'Search';
  galleryRef.innerHTML = '';
  apiService.query = inputRef.value;
  apiService.newPage().then(({ hits }) => {
    renderCard(hits, galleryRef);
    buttonSearchRef.textContent = 'New search';
  });

  buttonRef.addEventListener('click', () =>
    apiService.nextPage().then(({ hits }) => {
      renderCard(hits, galleryRef);
    }),
  );
  galleryRef.addEventListener('click', event => {
    if (event.target.nodeName !== 'IMG') return;
    openModal(event.target.dataset.big);
  });

  const observer = new IntersectionObserver(() =>
    apiService.nextPage().then(({ hits }) => {
      renderCard(hits, galleryRef);
    }),
  );
  observer.observe(observeBoxRef);
}
//--------------------------------------------------------------
function renderCard(arr, selector) {
  return selector.insertAdjacentHTML('beforeend', createMarkupCard(arr));
}
//--------------------------------------------------------------
formRef.addEventListener('submit', onInputChange);
