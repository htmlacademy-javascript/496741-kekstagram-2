import { photos } from './data';

const getPictureData = (pictureId) => photos.find((photo) => photo.id === Number(pictureId));

export { getPictureData };
