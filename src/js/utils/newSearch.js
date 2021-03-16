export default function newSearch(selectorfirst, obj, selectorSecond) {
  selectorfirst.innerHTML = '';
  obj.query = selectorSecond.value;
}
