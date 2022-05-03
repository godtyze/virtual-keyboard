import './styles/style.scss';
import keys from './keysMap.js';

const createKeys = () => {
  const keyWrapperArr = [];

  Object.entries(keys).forEach(key => {
    const keyWrapper = document.createElement('div');
    keyWrapper.classList.add('key', `${key[0]}`);

    const langWrapperRu = document.createElement('span');
    langWrapperRu.classList.add('ru', 'hidden');

    const langWrapperEn = document.createElement('span');
    langWrapperEn.classList.add('en');

    Object.entries(key[1]).forEach(el => {
      Object.entries(el[1]).forEach(prop => {
        const span = document.createElement('span');
        span.textContent = prop[1];
        if (prop[0] === 'caseDown') {
          span.classList.add(`${prop[0]}`);
        } else {
          span.classList.add(`${prop[0]}`, 'hidden');
        }
        if (el[0] === 'ru') {
          langWrapperRu.append(span);
        } else {
          langWrapperEn.append(span);
        }
      });
    });

    langWrapperRu.childNodes.forEach(el => el.classList.add('hidden'));

    keyWrapper.append(langWrapperRu, langWrapperEn);
    keyWrapperArr.push(keyWrapper);
  });

  return keyWrapperArr;
};

const init = () => {
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('container');

  const keysArr = createKeys();
  const row1 = document.createElement('div');
  const row2 = document.createElement('div');
  const row3 = document.createElement('div');
  const row4 = document.createElement('div');
  const row5 = document.createElement('div');
  const rowArr = [row1, row2, row3, row4, row5];
  rowArr.forEach(el => el.classList.add('row'));

  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard-wrapper');

  for (let i = 0; i < keysArr.length; i += 1) {
    if (i < 14) row1.append(keysArr[i]);
    if (i >= 14 && i < 29) row2.append(keysArr[i]);
    if (i >= 29 && i < 42) row3.append(keysArr[i]);
    if (i >= 42 && i < 55) row4.append(keysArr[i]);
    if (i >= 55) row5.append(keysArr[i]);
  }

  const textArea = document.createElement('textarea');
  textArea.classList.add('textarea');

  keyboardWrapper.append(...rowArr);
  contentContainer.append(textArea, keyboardWrapper);
  document.body.prepend(contentContainer);
};

window.addEventListener('DOMContentLoaded', init);
