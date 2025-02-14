import { isEscapeKey } from './util';

const getTemplateMessage = (id) => {
  const bodyElement = document.querySelector('body');
  const template = document.querySelector(`#${id}`)
    .content
    .querySelector(`.${id}`);
  const closeButtonElement = template.querySelector('button');

  bodyElement.append(template);

  const onCloseButtonElementClick = () => {
    template.remove();
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      template.remove();
    }
  };

  const onDocumentClick = () => {
    if (!template.closest(`.${id}__inner`)) {
      template.remove();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  closeButtonElement.addEventListener('click', onCloseButtonElementClick);
};



export { getTemplateMessage };
