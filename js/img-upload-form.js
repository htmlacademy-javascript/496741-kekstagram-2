import { isEscapeKey, numDecline } from './util';
import { removeImgEffect } from './img-effect';
import { sendData } from './api';
import { getTemplateMessage } from './template-message';
import { redrawPicture } from './upload-file';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;

const MessageTemplateId = {
  SUCCESS: 'success',
  FAIL: 'error'
};
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const hashtagRegularExpression = /^#[a-zа-яё0-9]{1,19}$/i;

const errorMessage = {
  hashtagDuplication: 'один и тот же хэштег не может быть использован дважды',
  maxHashtagCount: `нельзя указать больше ${numDecline(MAX_HASHTAGS_COUNT, 'хэштега', 'хэштегов', 'хэштегов')}`,
  maxHashtagLength: `максимальная длина одного хэштега ${numDecline(MAX_HASHTAG_LENGTH, 'символа', 'символов', 'символов')}, включая решётку`,
  maxCommentLength: `длина комментария не может составлять больше ${numDecline(MAX_COMMENT_LENGTH, 'символа', 'символов', 'символов')}`,
  allRulesForHashtag: 'хэштег начинается с символа #, может содержать только буквы и цифры, длина от 2 до 20 симоволов'
};

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = uploadFormElement.querySelector('#upload-file');
const imgUploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = uploadFormElement.querySelector('#upload-cancel');
const textHashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const textDescriptionTextareaElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadFormElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error'
  }
);

const validatePristine = () => {
  const getHashtagArray = (string) => string.toLowerCase().trim().split(/\s+/);

  const validateHashtagsCount = (value) => {
    const hashtags = getHashtagArray(value);
    return hashtags.length <= MAX_HASHTAGS_COUNT;
  };

  const validateHashtagsDublicat = (value) => {
    const hashtags = getHashtagArray(value);
    const hashtagsSet = [...new Set(hashtags)];

    return hashtagsSet.length === hashtags.length;
  };

  const validateHashtagsSpelling = (value) => {
    const hashtags = getHashtagArray(value);
    return hashtags.every((hashtag) => hashtagRegularExpression.test(hashtag) || hashtag === '');
  };

  const validateCommentsField = (value) => value.length <= MAX_COMMENT_LENGTH;

  pristine.addValidator(
    textHashtagsInputElement,
    validateHashtagsSpelling,
    errorMessage.allRulesForHashtag
  );

  pristine.addValidator(
    textHashtagsInputElement,
    validateHashtagsCount,
    errorMessage.maxHashtagCount
  );

  pristine.addValidator(
    textHashtagsInputElement,
    validateHashtagsDublicat,
    errorMessage.hashtagDuplication
  );

  pristine.addValidator(
    textDescriptionTextareaElement,
    validateCommentsField,
    errorMessage.maxCommentLength
  );

};

validatePristine();

const addFormOverlay = () => imgUploadOverlayElement.classList.remove('hidden');
const removeFormOverlay = () => imgUploadOverlayElement.classList.add('hidden');

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const onUploadCancelButtonElementClick = () => closePhotoEditor();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === textHashtagsInputElement ||
        document.activeElement === textDescriptionTextareaElement) {
      evt.stopPropagation();
    } else {
      uploadFormElement.reset();
      closePhotoEditor();
    }
  }
};

const setDocumentKeydown = () => document.addEventListener('keydown', onDocumentKeydown);
const removeDocumentKeydown = () => document.removeEventListener('keydown', onDocumentKeydown);

const setUserFormSubmit = () => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(() => {
          closePhotoEditor();
          getTemplateMessage(MessageTemplateId.SUCCESS);
        })
        .catch(() => {
          removeDocumentKeydown();
          getTemplateMessage(MessageTemplateId.FAIL);
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};

const openPhotoEditor = () => {
  imgUploadInputElement.addEventListener('change', () => {
    addFormOverlay();
    bodyElement.classList.add('modal-open');
    setDocumentKeydown();
    uploadCancelButtonElement.addEventListener('click', onUploadCancelButtonElementClick);
  });
};

const clearForm = () => {
  imgUploadInputElement.value = '';
  textHashtagsInputElement.value = '';
  textDescriptionTextareaElement.value = '';
  removeImgEffect();
  redrawPicture('');
  pristine.reset();
  removeFormOverlay();
};

//Здесь функция объявлена декларативно так как к ней есть обращение до объявления
function closePhotoEditor () {
  bodyElement.classList.remove('modal-open');
  clearForm();
  removeDocumentKeydown();
  uploadCancelButtonElement.removeEventListener('click', onUploadCancelButtonElementClick);
}

export { openPhotoEditor, setUserFormSubmit, setDocumentKeydown };
