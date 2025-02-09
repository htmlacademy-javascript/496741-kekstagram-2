import { photos } from './data';
import { renderPhotos } from './picture';
import { generateBigPictureModal } from './gallery';
import { uploadImg } from './img-upload-form';
import { configureImgResizing } from './img-resizing';
import { getImgEffect } from './img-effect';

renderPhotos(photos);
generateBigPictureModal();
uploadImg();
configureImgResizing();
getImgEffect();
