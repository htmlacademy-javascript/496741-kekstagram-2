import { photos } from './data';

const getCommentsById = (elementId) => {
  const comments = photos.find((photo) => photo.id === Number(elementId)).comments.slice();

  return comments;
};
export {getCommentsById};
