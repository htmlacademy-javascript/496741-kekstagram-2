import { isEscapeKey } from './util';

const getTemplateMessage = (id) => {
  const bodyElement = document.querySelector('body');
  const template = document.querySelector(`#${id}`)
    .content
    .querySelector(`.${id}`);
  const closeButtonElement = template.querySelector('button');
  const templateMessage = template.cloneNode(true);
  bodyElement.append(templateMessage);

  const onCloseButtonElementClick = () => {
    templateMessage.remove();
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      templateMessage.remove();
    }
  };

  const onDocumentClick = () => {
    if (!template.closest(`.${id}__inner`)) {
      templateMessage.remove();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  closeButtonElement.addEventListener('click', onCloseButtonElementClick);
};

export { getTemplateMessage };
