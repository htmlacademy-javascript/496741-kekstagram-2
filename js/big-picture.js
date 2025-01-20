import { isEscapeKey } from './util';

const picturesContainerElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');
const pictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const fillBigPictureWithData = (evt) => {
  const smallPictureElement = evt.target;

  bigPictureElement.querySelector('.big-picture__img img').src =
  smallPictureElement.querySelector('.picture__img').src;

  bigPictureElement.querySelector('.likes-count').textContent =
  smallPictureElement.querySelector('.picture__likes').textContent;

  bigPictureElement.querySelector('.social__caption').textContent =
  smallPictureElement.querySelector('.picture__img').alt;

  commentsListElement.innerHTML = '';
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

const openBigPicture = (evt) => {
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  fillBigPictureWithData(evt);
  commentsLoaderButtonElement.focus();
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onPictureOpenClick = (evt) => {
  evt.preventDefault();

  if (evt.target.matches('.picture')) {
    openBigPicture(evt);
  }
};

const onPictureCloseClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

picturesContainerElement.addEventListener('click', onPictureOpenClick);
pictureCloseButtonElement.addEventListener('click', onPictureCloseClick);
