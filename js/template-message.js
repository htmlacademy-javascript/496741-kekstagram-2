import { setDocumentKeydown } from './img-upload-form';
import { isEscapeKey } from './util';

const TIMEOUT_DEFAULT_DELAY = 2000;

const getTemplateMessage = (id) => {
  const bodyElement = document.querySelector('body');
  const template = document.querySelector(`#${id}`)
    .content
    .querySelector(`.${id}`);
  const closeButtonElement = template.querySelector('button');
  const templateMessage = template.cloneNode(true);
  bodyElement.append(templateMessage);

  const removeTemplateMessage = () => {
    templateMessage.remove();
    setDocumentKeydown();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  //Здесь функция объявлена декларативно так как к ней есть обращение до объявления
  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeTemplateMessage();
    }
  }

  //Здесь функция объявлена декларативно так как к ней есть обращение до объявления
  function onDocumentClick(evt) {
    if (!evt.target.closest(`.${id}__inner`) || (evt.target.closest(`.${id}__button`))) {
      removeTemplateMessage();
    }
  }

  if (!closeButtonElement) {
    setTimeout(() => removeTemplateMessage(), TIMEOUT_DEFAULT_DELAY);
  }

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export { getTemplateMessage };
