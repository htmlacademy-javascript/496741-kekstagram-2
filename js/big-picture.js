import { clearElement } from './util';
import { renderCommentsList } from './comments-list';

const COMMENTS_SHOWN_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');
const pictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const loadComments = (comments) => {
  let commentsShownCounter = 5;

  const shownComments =
  comments.length > commentsShownCounter ?
    comments.slice(0, commentsShownCounter) :
    comments;

  commentsCountElement.textContent = comments.length;
  commentShownCountElement.textContent = shownComments.length;
  clearElement(commentsListElement);
  renderCommentsList(shownComments);

  const onCommentsLoaderButtonClick = (evt) => {
    evt.preventDefault();
    if (comments.length > commentsShownCounter) {
      renderCommentsList(comments.slice(commentsShownCounter, commentsShownCounter + COMMENTS_SHOWN_STEP));
      commentsShownCounter = Math.min(comments.length, commentsShownCounter + COMMENTS_SHOWN_STEP);
      commentShownCountElement.textContent = commentsShownCounter;
    }
    if (commentsShownCounter >= comments.length) {
      commentsLoaderButtonElement.classList.add('hidden');
      commentsLoaderButtonElement.removeEventListener('click', onCommentsLoaderButtonClick);
    }
  };

  if (comments.length <= shownComments.length) {
    commentsLoaderButtonElement.classList.add('hidden');
  } else {
    commentsLoaderButtonElement.classList.remove('hidden');
    commentsLoaderButtonElement.addEventListener('click', onCommentsLoaderButtonClick);
  }

  pictureCloseButtonElement.addEventListener('click', () => {
    commentsLoaderButtonElement.removeEventListener('click', onCommentsLoaderButtonClick);
  }, {once: true});
};

const fillBigPictureWithData = ({url, description, likes, comments}) => {

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  loadComments(comments);
};

export { fillBigPictureWithData };
