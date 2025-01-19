import { getArrayPhotos } from './data';

const pictureTemplate = document.querySelector('#picture')
  .content.
  querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const photos = getArrayPhotos();
const picturesFragment = document.createDocumentFragment();

photos.forEach(({ url, description, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.append(picture);
});

picturesContainer.append(picturesFragment);
