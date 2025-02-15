import { openPhotoEditor, setUserFormSubmit } from './img-upload-form';
import { configureImgResizing } from './img-resizing';
import { getImgEffect } from './img-effect';
import { getData } from './api';
import { renderPhotos } from './picture';
import { generateBigPictureModal } from './gallery';
import { getTemplateMessage } from './template-message';

const MESSAGE_TEMPLATE_ID = 'data-error';

getData()
  .then((photos) => {
    renderPhotos(photos);
    generateBigPictureModal(photos);
  })
  .catch(() => {
    getTemplateMessage(MESSAGE_TEMPLATE_ID);
  });
openPhotoEditor();
setUserFormSubmit();
configureImgResizing();
getImgEffect();
