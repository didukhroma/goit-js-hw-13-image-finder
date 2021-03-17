export default function windowScroll(event, counter) {
  if (event.type === 'click') {
    const heigth = document.documentElement.clientHeight;
    let coordByY = heigth * counter;
    window.scrollTo(0, coordByY, {
      behavior: 'smooth',
    });
  }
}
