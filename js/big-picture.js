import { clearElement, isEscapeKey } from './util';
import { getComments } from './get-comments';
import { renderCommentsList } from './comments-list';

const generateBigPictureModal = () => {
  const COMMENTS_SHOWN_COUNTER = 5;

  const bodyElement = document.querySelector('body');
  const picturesContainerElement = document.querySelector('.pictures');
  const bigPictureElement = document.querySelector('.big-picture');
  const commentsListElement = bigPictureElement.querySelector('.social__comments');
  const commentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
  const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
  const commentsLoaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');
  const pictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

  const loadComments = (comments) => {
    clearElement(commentsListElement);
    renderCommentsList(commentsListElement, comments);
    commentShownCountElement.textContent = comments.length;
  };

  const fillBigPictureWithData = (evt) => {
    const smallPictureElement = evt.target;
    const comments = getComments(evt.target);
    const shownComments =
    comments.length > COMMENTS_SHOWN_COUNTER ?
      comments.slice(0, COMMENTS_SHOWN_COUNTER) :
      comments;

    bigPictureElement.querySelector('.big-picture__img img').src =
    smallPictureElement.querySelector('.picture__img').src;

    bigPictureElement.querySelector('.likes-count').textContent =
    smallPictureElement.querySelector('.picture__likes').textContent;

    bigPictureElement.querySelector('.social__caption').textContent =
    smallPictureElement.querySelector('.picture__img').alt;

    commentsCountElement.textContent = comments.length;
    loadComments(shownComments);

    commentsLoaderButtonElement.addEventListener('click', () => {
      if (comments.length > shownComments.length) {
        loadComments(comments);
      }
    });
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      // eslint-disable-next-line no-use-before-define
      closeBigPicture();
    }
  };

  const openBigPicture = (evt) => {
    bodyElement.classList.add('modal-open');
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
};

export {generateBigPictureModal};
