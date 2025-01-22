import { clearElement } from './util';
import { renderCommentsList } from './comments-list';

const COMMENTS_SHOWN_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');

const loadComments = (comments) => {
  renderCommentsList(commentsListElement, comments);
};

const fillBigPictureWithData = ({url, description, likes, comments}) => {

  let commentsShownCounter = 5;

  const shownComments =
  comments.length > commentsShownCounter ?
    comments.slice(0, commentsShownCounter) :
    comments;

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  commentsCountElement.textContent = comments.length;
  commentShownCountElement.textContent = shownComments.length;
  clearElement(commentsListElement);
  loadComments(shownComments);

  const onCommentsLoaderButtonClick = (evt) => {
    evt.preventDefault();
    if (comments.length > commentsShownCounter) {
      loadComments(comments.slice(commentsShownCounter, commentsShownCounter + COMMENTS_SHOWN_STEP));
      commentsShownCounter += COMMENTS_SHOWN_STEP;
    }

    if (commentsShownCounter >= comments.length) {
      commentShownCountElement.textContent = comments.length;
      commentsLoaderButtonElement.classList.add('hidden');
      commentsLoaderButtonElement.removeEventListener('click', onCommentsLoaderButtonClick);
    } else {
      commentShownCountElement.textContent = commentsShownCounter;
    }
  };

  if (comments.length <= shownComments.length) {
    commentsLoaderButtonElement.classList.add('hidden');

  } else {
    commentsLoaderButtonElement.classList.remove('hidden');
    commentsLoaderButtonElement.addEventListener('click', onCommentsLoaderButtonClick);
  }
};

export { fillBigPictureWithData };
