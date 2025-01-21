const renderCommentsList = (parrentElement, comments) => {
  comments.forEach(({avatar, message, name}) => {
    parrentElement.insertAdjacentHTML('beforeend',
      `<li class="social__comment">
        <img class="social__picture"
          src=${avatar}
          alt=${name}
          width="35" height="35">
        <p class="social__text">${message}</p>
      </li>`);
  });
};

export {renderCommentsList};
