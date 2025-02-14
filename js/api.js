import { getTemplateMessage } from './template-message';

const SEND_ERROR_MESSAGE = 'Данные не валидны';
const MessageTemplateId = {
  SUCCESS: 'success',
  FAIL: 'error'
};

const getData = (onSuccess, onFail) => {

  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((err) => {
      onFail(err.message);
    });
};
const sendData = (onSuccess, onFail, body) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if(response.ok) {
      onSuccess();
      getTemplateMessage(MessageTemplateId.SUCCESS);
    } else {
      throw new Error(SEND_ERROR_MESSAGE);
    }
  })
    .catch(() => {
      getTemplateMessage(MessageTemplateId.FAIL);
    });
};

export { getData, sendData };
