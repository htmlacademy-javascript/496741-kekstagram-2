import { clearElement } from './util';
import { renderCommentsList } from './comments-list';
import { isEscapeKey } from './util';

const COMMENTS_SHOWN_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');
const pictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const loadComments = (comments) => {
  let commentsShownCounter = COMMENTS_SHOWN_STEP;

  const shownComments =
  comments.length > commentsShownCounter ?
    comments.slice(0, commentsShownCounter) :
    comments;

  commentsCountElement.textContent = comments.length;
  commentShownCountElement.textContent = shownComments.length;
  clearElement(commentsListElement);
  renderCommentsList(shownComments);

  const hideCommentsLoaderButton = () => {
    commentsLoaderButtonElement.classList.add('hidden');
  };

  const onCommentsLoaderButtonElementClick = (evt) => {
    evt.preventDefault();
    if (comments.length > commentsShownCounter) {
      renderCommentsList(comments.slice(commentsShownCounter, commentsShownCounter + COMMENTS_SHOWN_STEP));
      commentsShownCounter = Math.min(comments.length, commentsShownCounter + COMMENTS_SHOWN_STEP);
      commentShownCountElement.textContent = commentsShownCounter;
    }
    if (commentsShownCounter === comments.length) {
      hideCommentsLoaderButton();
      commentsLoaderButtonElement.removeEventListener('click', onCommentsLoaderButtonElementClick);
    }
  };

  if (comments.length === shownComments.length) {
    hideCommentsLoaderButton();
  } else {
    commentsLoaderButtonElement.addEventListener('click', onCommentsLoaderButtonElementClick);
  }

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      commentsLoaderButtonElement.removeEventListener('click', onCommentsLoaderButtonElementClick);
    }
  };

  pictureCloseButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    commentsLoaderButtonElement.removeEventListener('click', onCommentsLoaderButtonElementClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }, {once: true});

  document.addEventListener('keydown', onDocumentKeydown, {once: true});
};

const fillBigPictureWithData = ({url, description, likes, comments}) => {

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  loadComments(comments);
};

export { fillBigPictureWithData };
