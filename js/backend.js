'use strict';

(function () {
  const StatusCode = {
    OK: 200
  };

  window.backend = {
    load(onSuccess, onError) {
      const URL = `https://21.javascript.pages.academy/kekstagram/data`;

      const TIMEOUT_IN_MS = 10000;
      const xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
        }
      });
      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(`GET`, URL);
      xhr.send();
    },
    save(data, onSuccess, onError) {
      const URL = `https://21.javascript.pages.academy/kekstagram`;
      const xhr = new XMLHttpRequest();

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess();
        } else {
          onError();
        }
      });
      xhr.addEventListener(`error`, function () {
        onError();
      });

      xhr.open(`POST`, URL);
      xhr.send(data);
    }
  };
})();
