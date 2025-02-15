import { openPhotoEditor, setUserFormSubmit } from './img-upload-form';
import { configureImgResizing } from './img-resizing';
import { getImgEffect } from './img-effect';
import { getData } from './api';
import { clearPhotos, renderPhotos } from './picture';
import { generateBigPictureModal } from './gallery';
import { getTemplateMessage } from './template-message';
import { getFilters, setFilterClick } from './filter';
import { debounce } from './util';

const MESSAGE_TEMPLATE_ID = 'data-error';

getData()
  .then((photos) => {
    renderPhotos(photos);
    generateBigPictureModal(photos);
    getFilters(photos);
    setFilterClick(photos, debounce(
      (filteredPhotos) => {
        clearPhotos();
        renderPhotos(filteredPhotos);
      }
    ));
  })
  .catch(() => {
    getTemplateMessage(MESSAGE_TEMPLATE_ID);
  });
openPhotoEditor();
setUserFormSubmit();
configureImgResizing();
getImgEffect();
