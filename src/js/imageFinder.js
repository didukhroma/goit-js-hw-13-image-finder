import _ from 'lodash';
import createBaseMarkup from './markup/baseMarkup';
import ApiService from './api/apiService';
//--------------------------------------------------------------
createBaseMarkup();
//--------------------------------------------------------------
const refs = {
  inputRef: document.querySelector('input'),
  galleryRef: document.querySelector('.gallery'),
  buttonRef: document.querySelector('.js-load-more'),
};
const { inputRef, galleryRef, buttonRef } = refs;
const apiService = new ApiService();
//--------------------------------------------------------------
inputRef.addEventListener('input', _.debounce(onInputChange, 1000));
// inputRef.addEventListener('input', onInputChange);
function onInputChange(event) {
  apiService.query = event.target.value;
  apiService.newPage();
  buttonRef.addEventListener('click', () => apiService.nextPage());
}
