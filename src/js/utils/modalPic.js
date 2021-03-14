import * as basicLightbox from 'basiclightbox';
function modal(url) {
  const instance = basicLightbox.create(`
    <img src="${url}" width="800" height="600">
`);
  instance.show();
}
export default modal;
