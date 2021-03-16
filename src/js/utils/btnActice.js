export default function activBtnAndChangeText(selectorFirst, selectorSecond) {
  selectorFirst.disabled = false;
  selectorSecond.textContent = 'Search';
}
