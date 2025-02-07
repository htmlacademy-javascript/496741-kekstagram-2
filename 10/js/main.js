import { photos } from './data';
import { renderPhotos } from './picture';
import { generateBigPictureModal } from './gallery';
import { uploadImg } from './img-upload-form';
import './img-editing';
import './img-effect';

renderPhotos(photos);
generateBigPictureModal();
uploadImg();
