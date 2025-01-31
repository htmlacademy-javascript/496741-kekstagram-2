import { photos } from './data';
import { renderPhotos } from './picture';
import { generateBigPictureModal } from './gallery';
import { uploadImg } from './img-upload-form';

renderPhotos(photos);
generateBigPictureModal();
uploadImg();
