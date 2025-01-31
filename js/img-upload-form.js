import { isEscapeKey, numDecline } from './util';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;

const ErrorMessage = {
  HASH_SYMBOL: 'хэштег начинается с символа # (решётка)',
  ONLY_HASH_SYMBOL: 'хеш-тег не может состоять только из одной решётки',
  SPECIAL_CHARACTER:  'строка после решётки не может содержать спецсимволы (#, @, $ и т. п.)',
  PUNCTUATION_CHARACTER: 'хэштег не может содержать символы пунктуации (тире, дефис, запятая и т. п.)',
  EMOJI: 'хэштег не может содержать эмодзи',
  HASHTAG_DUPLICATION: 'один и тот же хэштег не может быть использован дважды',
  MAX_HASHTAGS_COUNT: `нельзя указать больше ${numDecline(MAX_HASHTAGS_COUNT, 'хэштега', 'хэштегов', 'хэштегов')}`,
  MAX_HASHTAG_LENGTH: `максимальная длина одного хэштега ${numDecline(MAX_HASHTAG_LENGTH, 'символа', 'символов', 'символов')}, включая решётку`,
  MAX_COMMENT_LENGTH: `длина комментария не может составлять больше ${numDecline(MAX_COMMENT_LENGTH, 'символа', 'символов', 'символов')}`,
};

const hashtagRestrictions = [
  {
    regularExpression: /^#/,
    errorText: ErrorMessage.HASH_SYMBOL,
  },
  {
    regularExpression: /^.{2,}$/,
    errorText: ErrorMessage.ONLY_HASH_SYMBOL,
  },
  {
    regularExpression: /^#([a-zа-яё0-9]+)$/i,
    errorText: ErrorMessage.SPECIAL_CHARACTER,
  },
  {
    regularExpression: /^#([a-zа-яё0-9]+)$/i,
    errorText: ErrorMessage.PUNCTUATION_CHARACTER,
  },
  {
    regularExpression: /^#([a-zа-яё0-9]+)$/i,
    errorText: ErrorMessage.EMOJI,
  },
  {
    regularExpression: /^.{1,20}$/,
    errorText: ErrorMessage.MAX_HASHTAG_LENGTH,
  }
];

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = uploadFormElement.querySelector('#upload-file');
const imgUploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = uploadFormElement.querySelector('#upload-cancel');
const textHashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const textDescriptionTextareaElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement,
  {
    classTo: 'img-upload__form',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error'
  }
);

const onUploadCancelButtonElementClick = () => closePhotoEditor();

function onDocumentKeydown (evt) {
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
}
//Здесь функция объявлена декларативно так как к ней есть обращение до объявления
function closePhotoEditor () {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancelButtonElement.removeEventListener('click', onUploadCancelButtonElementClick);
  imgUploadInputElement.value = '';
}

const uploadImg = () => {
  imgUploadInputElement.addEventListener('change', () => {
    imgUploadOverlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    uploadCancelButtonElement.addEventListener('click', onUploadCancelButtonElementClick);
  });
};

const createHashtagValidators = () => {
  for (let i = 0; i < hashtagRestrictions.length; i++) {

    const validateHashtag = (value) => {

      const hashtags = value.trim().split(/\s+/);
      let result = true;

      hashtags.forEach((element) => {
        if (element) {
          result = hashtagRestrictions[i].regularExpression.test(element);
          return result;
        }
      });

      return result;
    };

    pristine.addValidator(
      textHashtagsInputElement,
      validateHashtag,
      hashtagRestrictions[i].errorText
    );
  }
};

const validateHashtagsCount = (value) => {
  const hashtags = value.trim().split(/\s+/);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const validateCommentsField = (value) => value.length <= MAX_COMMENT_LENGTH;

createHashtagValidators();

const validateHashtagsDublicat = (value) => {
  const hashtags = value.trim().split(/\s+/);
  return !hashtags.some((hashtag, index) => hashtags.indexOf(hashtag) !== index);
};

pristine.addValidator(
  textHashtagsInputElement,
  validateHashtagsCount,
  ErrorMessage.MAX_HASHTAGS_COUNT
);

pristine.addValidator(
  textHashtagsInputElement,
  validateHashtagsDublicat,
  ErrorMessage.HASHTAG_DUPLICATION
);

pristine.addValidator(
  textDescriptionTextareaElement,
  validateCommentsField,
  ErrorMessage.MAX_COMMENT_LENGTH
);

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { uploadImg };
