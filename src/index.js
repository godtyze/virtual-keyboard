import './styles/style.scss';
import createKeys from './utils/createKeys.js';

let lang = localStorage.getItem('lang') || 'en';
const keysArr = createKeys(lang);
let capsState = false;
let shiftState = false;

// localStorage.clear()

const pressHandler = (event) => {
  event.preventDefault();
  const textArea = document.getElementById('textarea');
  if (event.code === 'CapsLock' && event.type === 'keydown') capsState = !capsState;
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && event.type === 'keydown') shiftState = true;
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && event.type === 'keyup') shiftState = false;
  if (event.ctrlKey && event.altKey && event.type === 'keydown') {
    if (lang === 'en') {
      lang = 'ru';
    } else {
      lang = 'en';
    }
  }
  keysArr.forEach(el => {
    const arr = Array.from(el.children);
    const filteredArr = arr.filter(elem => !elem.classList.contains('hidden'))[0].children;

    if (event.type === 'keydown' && !el.classList.contains('CapsLock')) {
      if (el.classList.contains(event.code)) el.classList.add('active');
    }
    if (event.type === 'keyup' && !el.classList.contains('CapsLock')) {
      if (el.classList.contains(event.code)) el.classList.remove('active');
    }
    if (event.code === 'CapsLock' && el.classList.contains('CapsLock') && event.type !== 'keyup') el.classList.toggle('active');
    if (event.code === 'CapsLock' && event.type === 'keydown') {
      if (capsState && !shiftState) {
        Array.from(filteredArr).filter(elem => elem.classList.contains('caseDown'))[0].classList.add('hidden');
        Array.from(filteredArr).filter(elem => elem.classList.contains('caps'))[0].classList.remove('hidden');
      }
      if (!capsState && shiftState) {
        Array.from(filteredArr).filter(elem => elem.classList.contains('caseUp'))[0].classList.remove('hidden');
        Array.from(filteredArr).filter(elem => elem.classList.contains('shiftCaps'))[0].classList.add('hidden');
      }
      if (!capsState && !shiftState) {
        Array.from(filteredArr).filter(elem => elem.classList.contains('caseDown'))[0].classList.remove('hidden');
        Array.from(filteredArr).filter(elem => elem.classList.contains('caps'))[0].classList.add('hidden');
      }
      if (capsState && shiftState) {
        Array.from(filteredArr).filter(elem => elem.classList.contains('caseUp'))[0].classList.add('hidden');
        Array.from(filteredArr).filter(elem => elem.classList.contains('caps'))[0].classList.add('hidden');
        Array.from(filteredArr).filter(elem => elem.classList.contains('shiftCaps'))[0].classList.remove('hidden');
      }
    }
    if (event.shiftKey && !capsState) {
      Array.from(filteredArr).filter(elem => elem.classList.contains('caseDown'))[0].classList.add('hidden');
      Array.from(filteredArr).filter(elem => elem.classList.contains('caseUp'))[0].classList.remove('hidden');
      Array.from(filteredArr).filter(elem => elem.classList.contains('caps'))[0].classList.add('hidden');
      Array.from(filteredArr).filter(elem => elem.classList.contains('shiftCaps'))[0].classList.add('hidden');
    }
    if (!event.shiftKey && !capsState && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
      Array.from(filteredArr).filter(elem => elem.classList.contains('caseDown'))[0].classList.remove('hidden');
      Array.from(filteredArr).filter(elem => elem.classList.contains('caseUp'))[0].classList.add('hidden');
    }
    if (event.shiftKey && capsState) {
      Array.from(filteredArr).filter(elem => elem.classList.contains('caps'))[0].classList.add('hidden');
      Array.from(filteredArr).filter(elem => elem.classList.contains('shiftCaps'))[0].classList.remove('hidden');
      Array.from(filteredArr).filter(elem => elem.classList.contains('caseDown'))[0].classList.add('hidden');
      Array.from(filteredArr).filter(elem => elem.classList.contains('caseUp'))[0].classList.add('hidden');
    }
    if (!event.shiftKey && capsState && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
      Array.from(filteredArr).filter(elem => elem.classList.contains('caps'))[0].classList.remove('hidden');
      Array.from(filteredArr).filter(elem => elem.classList.contains('shiftCaps'))[0].classList.add('hidden');
    }
    if (!el.classList.contains('Tab')
        && !el.classList.contains('CapsLock')
        && !el.classList.contains('ShiftLeft')
        && !el.classList.contains('ControlLeft')
        && !el.classList.contains('MetaLeft')
        && !el.classList.contains('AltLeft')
        && !el.classList.contains('AltRight')
        && !el.classList.contains('ControlRight')
        && !el.classList.contains('Backspace')
        && !el.classList.contains('Enter')
        && !el.classList.contains('ShiftRight')
        && el.classList.contains(event.code)
        && event.type !== 'keyup') {
      const textContent = Array.from(filteredArr).filter(elem => !elem.classList.contains('hidden'))[0].textContent;
      textArea.value += textContent;
    }
    if (event.ctrlKey && event.altKey && event.type === 'keydown') {
      const activeLang = arr.filter(elem => !elem.classList.contains('hidden'))[0];
      const activeLangArr = Array.from(activeLang.children);
      const hiddenLang = arr.filter(elem => elem.classList.contains('hidden'))[0];
      const hiddenLangArr = Array.from(hiddenLang.children);
      activeLang.classList.add('hidden');
      activeLangArr.forEach(elem => elem.classList.add('hidden'));
      hiddenLang.classList.remove('hidden');
      hiddenLangArr.forEach(elem => {
        if (!shiftState && !capsState) {
          if (elem.classList.contains('caseDown')) elem.classList.remove('hidden');
        }
        if (shiftState && !capsState) {
          if (elem.classList.contains('caseUp')) elem.classList.remove('hidden');
        }
        if (!shiftState && capsState) {
          if (elem.classList.contains('caps')) elem.classList.remove('hidden');
        }
        if (shiftState && capsState) {
          if (elem.classList.contains('shiftCaps')) elem.classList.remove('hidden');
        }
      });
    }
  });
  if (event.code === 'Enter' && event.type === 'keydown') textArea.value += '\n';
  if (event.code === 'Tab' && event.type === 'keydown') textArea.value += '\t';
};

const clickHandler = (event) => {
  const textArea = document.getElementById('textarea');
  const arr = Array.from(event.currentTarget.children);
  const filteredArr = arr.filter(elem => !elem.classList.contains('hidden'))[0].children;
  if (event.currentTarget.classList.contains('CapsLock') && event.type !== 'mouseup') capsState = !capsState;
  if ((event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))
    && event.type === 'mousedown') {
    shiftState = true;
  }
  if ((event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))
    && event.type === 'mouseup') {
    shiftState = false;
  }

  if (event.type === 'mousedown' && !event.currentTarget.classList.contains('CapsLock')) {
    event.currentTarget.classList.add('active');
  }
  if (event.type === 'mouseup' && !event.currentTarget.classList.contains('CapsLock')) {
    event.currentTarget.classList.remove('active');
  }
  if (event.currentTarget.classList.contains('CapsLock') && event.type !== 'mouseup') {
    if (event.which === 3) return;
    event.currentTarget.classList.toggle('active');
  }
  if (event.currentTarget.classList.contains('CapsLock') && event.type === 'mousedown') {
    keysArr.forEach(el => {
      const keyArr = Array.from(el.children);
      const filteredKeyArr = keyArr.filter(elem => !elem.classList.contains('hidden'))[0].children;
      Array.from(filteredKeyArr).filter(elem => elem.classList.contains('caseDown'))[0].classList.toggle('hidden');
      Array.from(filteredKeyArr).filter(elem => elem.classList.contains('caps'))[0].classList.toggle('hidden');
    });
  }
  if ((event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))
    && event.type === 'mousedown' && !capsState) {
    keysArr.forEach(el => {
      const keyArr = Array.from(el.children);
      const filteredKeyArr = keyArr.filter(elem => !elem.classList.contains('hidden'))[0].children;
      Array.from(filteredKeyArr).filter(elem => elem.classList.contains('caseDown'))[0].classList.add('hidden');
      Array.from(filteredKeyArr).filter(elem => elem.classList.contains('caseUp'))[0].classList.remove('hidden');
    });
  }
  if ((event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))
    && event.type === 'mouseup' && !capsState) {
    keysArr.forEach(el => {
      const keyArr = Array.from(el.children);
      const filteredKeyArr = keyArr.filter(elem => !elem.classList.contains('hidden'))[0].children;
      Array.from(filteredKeyArr).filter(elem => elem.classList.contains('caseDown'))[0].classList.remove('hidden');
      Array.from(filteredKeyArr).filter(elem => elem.classList.contains('caseUp'))[0].classList.add('hidden');
    });
  }
  if ((event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))
    && event.type === 'mousedown' && capsState) {
    keysArr.forEach(el => {
      const keyArr = Array.from(el.children);
      const filteredKeyArr = keyArr.filter(elem => !elem.classList.contains('hidden'))[0].children;
      Array.from(filteredKeyArr).filter(elem => elem.classList.contains('shiftCaps'))[0].classList.remove('hidden');
      Array.from(filteredKeyArr).filter(elem => elem.classList.contains('caps'))[0].classList.add('hidden');
    });
  }
  if ((event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))
    && event.type === 'mouseup' && capsState) {
    keysArr.forEach(el => {
      const keyArr = Array.from(el.children);
      const filteredKeyArr = keyArr.filter(elem => !elem.classList.contains('hidden'))[0].children;
      Array.from(filteredKeyArr).filter(elem => elem.classList.contains('shiftCaps'))[0].classList.add('hidden');
      Array.from(filteredKeyArr).filter(elem => elem.classList.contains('caps'))[0].classList.remove('hidden');
    });
  }
  if (!event.currentTarget.classList.contains('Tab')
    && !event.currentTarget.classList.contains('CapsLock')
    && !event.currentTarget.classList.contains('ShiftLeft')
    && !event.currentTarget.classList.contains('ControlLeft')
    && !event.currentTarget.classList.contains('MetaLeft')
    && !event.currentTarget.classList.contains('AltLeft')
    && !event.currentTarget.classList.contains('AltRight')
    && !event.currentTarget.classList.contains('ControlRight')
    && !event.currentTarget.classList.contains('Backspace')
    && !event.currentTarget.classList.contains('Enter')
    && !event.currentTarget.classList.contains('ShiftRight')
    && event.type === 'mousedown') {
    const textContent = Array.from(filteredArr).filter(elem => !elem.classList.contains('hidden'))[0].textContent;
    textArea.value += textContent;
  }
  if (event.currentTarget.classList.contains('Enter') && event.type === 'mousedown') textArea.value += '\n';
  if (event.currentTarget.classList.contains('Tab') && event.type === 'mousedown') textArea.value += '\t';
};

const init = () => {
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('container');

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
    keysArr[i].addEventListener('mousedown', clickHandler);
    keysArr[i].addEventListener('mouseup', clickHandler);
    if (i < 14) row1.append(keysArr[i]);
    if (i >= 14 && i < 29) row2.append(keysArr[i]);
    if (i >= 29 && i < 42) row3.append(keysArr[i]);
    if (i >= 42 && i < 55) row4.append(keysArr[i]);
    if (i >= 55) row5.append(keysArr[i]);
  }

  const textArea = document.createElement('textarea');
  textArea.setAttribute('id', 'textarea');
  textArea.setAttribute('rows', '5');
  textArea.setAttribute('cols', '50');
  textArea.classList.add('textarea');

  keyboardWrapper.append(...rowArr);
  contentContainer.append(textArea, keyboardWrapper);
  document.body.prepend(contentContainer);
};

window.addEventListener('beforeunload', () => localStorage.setItem('lang', lang));
window.addEventListener('DOMContentLoaded', init);
window.addEventListener('keydown', pressHandler);
window.addEventListener('keyup', pressHandler);
