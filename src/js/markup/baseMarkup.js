import baseMarkupTemplate from '../../templates/baseMarkup.hbs';
const bodyRef = document.querySelector('body');
const createBaseMarkup = () => {
  bodyRef.insertAdjacentHTML('beforeend', baseMarkupTemplate());
};
export default createBaseMarkup;
