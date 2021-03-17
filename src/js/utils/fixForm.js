const { height: boxHeight } = document
  .querySelector('.box')
  .getBoundingClientRect();
document.body.style.paddingTop = `${boxHeight}px`;
document.querySelector('.box').style.marginTop = `${-boxHeight}px`;
