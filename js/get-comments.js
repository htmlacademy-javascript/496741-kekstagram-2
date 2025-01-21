import { photos } from './data';

const getIdFromImg = (img) => Number(img.match(/(\w+).jpg/)[1]);

const getComments = (element) => {
  const id = getIdFromImg(element.querySelector('.picture__img').src);
  const comments = photos.find((photo) => photo.id === id).comments.slice();

  return comments;
};

export {getComments};
