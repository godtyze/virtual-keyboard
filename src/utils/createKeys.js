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

export default createKeys;
