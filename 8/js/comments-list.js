const commentsListElement = document.querySelector('.social__comments');

const renderCommentsList = (comments) => {
  comments.forEach(({avatar, message, name}) => {
    commentsListElement.insertAdjacentHTML('beforeend',
      `<li class="social__comment">
        <img class="social__picture"
          src=${avatar}
          alt=${name}
          width="35" height="35">
        <p class="social__text">${message}</p>
      </li>`);
  });
};

export { renderCommentsList };
