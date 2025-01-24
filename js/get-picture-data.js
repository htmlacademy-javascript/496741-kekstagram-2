import { photos } from './data';

const getPictureData = (pictureId) => {
  const picture = photos.find((photo) => photo.id === Number(pictureId));

  return {
    id: picture.id,
    url: picture.url,
    description: picture.description,
    likes: picture.likes,
    comments: picture.comments,
  };
};

export { getPictureData };
