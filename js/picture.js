const renderPhotos = (photos) => {
  const pictureTemplate = document.querySelector('#picture')
    .content.
    querySelector('.picture');
  const picturesContainerElement = document.querySelector('.pictures');

  const picturesFragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.append(picture);
  });

  picturesContainerElement.append(picturesFragment);
};

export {renderPhotos};
