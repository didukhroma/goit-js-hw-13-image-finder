import createBaseMarkup from './markup/baseMarkup';
import ApiService from './api/apiService';
import createMarkupCard from './markup/createCardMarkup';
import openModal from './utils/modalPic';
import btnActiveAndChangeText from './utils/btnActice';
import btnDisabled from './utils/btnDisabled';
import newSearch from './utils/newSearch';
import observer from './utils/observer';
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

btnDisabled(buttonRef);

//--------------------------------------------------------------
function onInputChange(event) {
  event.preventDefault();
  btnActiveAndChangeText(buttonRef, buttonSearchRef);
  newSearch(galleryRef, apiService, inputRef);
  renderNewCardsList();
  buttonRef.addEventListener('click', renderNextCardsList);
  galleryRef.addEventListener('click', showModal);

  observer(renderNextCardsList, observeBoxRef);
}
//--------------------------------------------------------------
function renderCard(arr, selector) {
  return selector.insertAdjacentHTML('beforeend', createMarkupCard(arr));
}
//--------------------------------------------------------------
async function renderNextCardsList() {
  const result = await apiService.nextPage();
  const { hits } = result;
  renderCard(hits, galleryRef);
}
//--------------------------------------------------------------
async function renderNewCardsList() {
  const result = await apiService.newPage();
  const { hits } = result;
  renderCard(hits, galleryRef);
  buttonSearchRef.textContent = 'New search';
}
//--------------------------------------------------------------
function showModal(event) {
  if (event.target.nodeName !== 'IMG') return;
  openModal(event.target.dataset.big);
}
//--------------------------------------------------------------
formRef.addEventListener('submit', onInputChange);
