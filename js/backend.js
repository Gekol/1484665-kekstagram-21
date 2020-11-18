'use strict';

(function () {
  const StatusCode = {
    OK: 200
  };

  window.backend = {
    load(successHandler, errorHandler) {
      const URL = `https://21.javascript.pages.academy/kekstagram/data`;

      const TIMEOUT_IN_MS = 10000;
      const xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          successHandler(xhr.response);
        } else {
          errorHandler(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
        }
      });
      xhr.addEventListener(`error`, function () {
        errorHandler(`Произошла ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, function () {
        errorHandler(`Запрос не успел выполниться за ${xhr.timeout}мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(`GET`, URL);
      xhr.send();
    },
    save(data, successHandler, errorHandler) {
      const URL = `https://21.javascript.pages.academy/kekstagram`;
      const xhr = new XMLHttpRequest();

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          successHandler();
        } else {
          errorHandler();
        }
      });
      xhr.addEventListener(`error`, function () {
        errorHandler();
      });

      xhr.open(`POST`, URL);
      xhr.send(data);
    }
  };
})();
