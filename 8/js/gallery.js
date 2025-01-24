import { isEscapeKey } from './util';
import { getCommentsById } from './get-comments';
import { fillBigPictureWithData } from './big-picture';

const generateBigPictureModal = () => {

  const bodyElement = document.querySelector('body');
  const picturesContainerElement = document.querySelector('.pictures');
  const bigPictureElement = document.querySelector('.big-picture');
  const commentsLoaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');
  const pictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

  const getPictureData = (pictureElement) => {
    const imgElement = pictureElement.querySelector('.picture__img');
    return {
      id: imgElement.id,
      url: imgElement.src,
      description: imgElement.alt,
      likes: pictureElement.querySelector('.picture__likes').textContent,
      comments: getCommentsById(imgElement.id),
    };
  };


  const openBigPicture = (evt) => {
    const pictureData = getPictureData(evt.target);

    bodyElement.classList.add('modal-open');
    bigPictureElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    fillBigPictureWithData(pictureData);
    commentsLoaderButtonElement.focus();
  };

  const closeBigPicture = () => {
    bodyElement.classList.remove('modal-open');
    bigPictureElement.classList.add('hidden');
    commentsLoaderButtonElement.classList.remove('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  //Здесь функция объявлена декларативно так как к ней есть обращение до объявления
  function onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  }

  const onPictureOpenClick = (evt) => {
    if (evt.target.matches('.picture')) {
      evt.preventDefault();
      openBigPicture(evt);
    }
  };

  const onPictureCloseClick = (evt) => {
    evt.preventDefault();
    closeBigPicture();
  };

  picturesContainerElement.addEventListener('click', onPictureOpenClick);
  pictureCloseButtonElement.addEventListener('click', onPictureCloseClick);
};

export {generateBigPictureModal};
