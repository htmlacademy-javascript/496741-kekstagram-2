import { isEscapeKey, numDecline } from './util';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;

const errorMessage = {
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
    errorText: errorMessage.HASH_SYMBOL,
  },
  {
    regularExpression: /^.{2,}$/,
    errorText: errorMessage.ONLY_HASH_SYMBOL,
  },
  {
    regularExpression: /^#([a-zа-яё0-9]+)$/i,
    errorText: errorMessage.SPECIAL_CHARACTER,
  },
  {
    regularExpression: /^#([a-zа-яё0-9]+)$/i,
    errorText: errorMessage.PUNCTUATION_CHARACTER,
  },
  {
    regularExpression: /^#([a-zа-яё0-9]+)$/i,
    errorText: errorMessage.EMOJI,
  },
  // {
  //   regularExpression: /^#/,
  //   errorText: errorMessage.HASH_SYMBOL,
  // },
  // {
  //   regularExpression: /^#/,
  //   errorText: errorMessage.HASH_SYMBOL,
  // },
  // {
  //   regularExpression: /^#/,
  //   errorText: errorMessage.HASH_SYMBOL,
  // }
];

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = uploadFormElement.querySelector('#upload-file');
//const imgUploadControlElement = uploadFormElement.querySelector('.img-upload__control');
const imgUploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = uploadFormElement.querySelector('#upload-cancel');
const textHashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const textDescriptionTextareaElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement,
  {
    classTo: 'img-upload__form', // Элемент, на который будут добавляться классы
    // errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
    // successClass: 'form__item--valid', // Класс, обозначающий валидное поле
    errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
    errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
    errorTextClass: 'img-upload__field-wrapper--error' // Класс для элемента с текстом ошибки
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

    const validateHashtagsField = (value) => {

      const hashtags = value.split(/\s+/);
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
      validateHashtagsField,
      hashtagRestrictions[i].errorText
    );
  }
};

const validateCommentssField = (value) => value.length <= MAX_COMMENT_LENGTH;

createHashtagValidators();

pristine.addValidator(
  textDescriptionTextareaElement,
  validateCommentssField,
  errorMessage.MAX_COMMENT_LENGTH
);

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { uploadImg };
