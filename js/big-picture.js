import { clearElement } from './util';
import { renderCommentsList } from './comments-list';

const COMMENTS_SHOWN_COUNTER = 5;


const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');

const loadComments = (comments) => {
  clearElement(commentsListElement);
  renderCommentsList(commentsListElement, comments);
  commentShownCountElement.textContent = comments.length;
};

const fillBigPictureWithData = ({url, description, likes, comments}) => {
  const shownComments =
  comments.length > COMMENTS_SHOWN_COUNTER ?
    comments.slice(0, COMMENTS_SHOWN_COUNTER) :
    comments;
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  commentsCountElement.textContent = comments.length;

  commentsCountElement.textContent = comments.length;
  loadComments(shownComments);

  commentsLoaderButtonElement.addEventListener('click', () => {
    if (comments.length > shownComments.length) {
      loadComments(comments);
    }
  });
};

export { fillBigPictureWithData };
