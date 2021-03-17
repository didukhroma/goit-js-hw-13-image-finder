import createBaseMarkup from './markup/baseMarkup';
import ApiService from './api/apiService';
import createMarkupCard from './markup/createCardMarkup';
import openModal from './utils/modalPic';
import btnActiveAndChangeText from './utils/btnActice';
import btnDisabled from './utils/btnDisabled';
import newSearch from './utils/newSearch';
// import pnotify from './utils/pnotify';
import windowScroll from './utils/scroll';
//--------------------------------------------------------------
function onInputSearch(event) {
  event.preventDefault();
  observer.unobserve(observeBoxRef);

  // buttonRef.removeEventListener('click', renderNextCardsList);
  galleryRef.removeEventListener('click', showModal);
  btnActiveAndChangeText(buttonRef, buttonSearchRef);
  newSearch(galleryRef, apiService, inputRef);
  buttonSearchRef.textContent = 'New search';
  renderNewCardsList();
}
//--------------------------------------------------------------
function renderCard(arr, selector) {
  return selector.insertAdjacentHTML('beforeend', createMarkupCard(arr));
}
//--------------------------------------------------------------
function renderNextCardsList() {
  observer.unobserve(observeBoxRef);
  // pnotify.closeAllNotice();
  try {
    windowScroll(event, counter);
  } catch (err) {
    // console.log(err);
  }

  apiService
    .nextPage()
    .then(({ hits }) => {
      buttonRef.removeEventListener('click', renderNextCardsList);
      renderCard(hits, galleryRef);
      counter = counter + 1;
      // pnotify.pnotifySuccess();
      buttonRef.addEventListener('click', renderNextCardsList);
      observer.observe(observeBoxRef);
    })
    .catch(err => console.log(err));
}
//--------------------------------------------------------------
function renderNewCardsList() {
  apiService
    .newPage()
    .then(({ hits, total }) => {
      // pnotify.closeAllNotice();
      if (total === 0) {
        throw 'We find 0 results';
      }
      renderCard(hits, galleryRef);
      // pnotify.pnotifySuccess();
      buttonRef.addEventListener('click', renderNextCardsList);
      galleryRef.addEventListener('click', showModal);

      observer.observe(observeBoxRef);
    })
    .catch(err => console.log(err));
}
//--------------------------------------------------------------
function showModal(event) {
  if (event.target.nodeName !== 'IMG') return;
  openModal(event.target.dataset.big);
}
//--------------------------------------------------------------
function initAction() {
  formRef.addEventListener('submit', onInputSearch);
}
//--------------------------------------------------------------
//--------------------------------------------------------------
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

let counter = 1;

const observerCallback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      renderNextCardsList();
    }
  });
};

const options = {
  rootMargin: '100px',
  threshold: 0.5,
};

const observer = new IntersectionObserver(observerCallback, options);
//--------------------------------------------------------------
btnDisabled(buttonRef);
initAction();
