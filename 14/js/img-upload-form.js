import { isEscapeKey, numDecline } from './util';
import { removeImgEffect } from './img-effect';
import { sendData } from './api';
import { getTemplateMessage } from './template-message';

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


const getHashtagArray = (string) => string.trim().split(/\s+/);

const pristine = new Pristine(uploadFormElement,
  {
    classTo: 'img-upload__form',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error'
  }
);

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

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

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
          getTemplateMessage(MessageTemplateId.FAIL);
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
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

const openPhotoEditor = () => {
  imgUploadInputElement.addEventListener('change', () => {
    imgUploadOverlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    uploadCancelButtonElement.addEventListener('click', onUploadCancelButtonElementClick);
  });
};

const clearInputValues = () => {
  imgUploadInputElement.value = '';
  textHashtagsInputElement.value = '';
  textDescriptionTextareaElement.value = '';
  removeImgEffect();
};
//Здесь функция объявлена декларативно так как к ней есть обращение до объявления
function closePhotoEditor () {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancelButtonElement.removeEventListener('click', onUploadCancelButtonElementClick);
  clearInputValues();
}

export { openPhotoEditor, setUserFormSubmit };
