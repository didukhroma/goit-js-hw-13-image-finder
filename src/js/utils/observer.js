export default function observe(callback, selector) {
  const observer = new IntersectionObserver(callback);
  observer.observe(selector);
}
