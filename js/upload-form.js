'use strict';

(function () {
  const uploadForm = document.querySelector(`.img-upload__form`);

  function hideUploadFormByEsc(evt) {
    if (evt.key === `Escape` && document.activeElement !== document.querySelector(`.text__description`) && document.activeElement !== document.querySelector(`.text__hashtags`)) {
      window.utils.hideBlock(`.img-upload__overlay`);
      document.body.classList.remove(`modal-open`);
      document.querySelector(`.img-upload__overlay`).removeEventListener(`keydown`, hideUploadFormByEsc);
    }
  }

  function setupUploadFormShowing() {
    const uploadFileButton = document.querySelector(`#upload-file`);
    uploadFileButton.addEventListener(`click`, function () {
      window.utils.showBlock(`.img-upload__overlay`);
      document.body.classList.add(`modal-open`);
      document.body.addEventListener(`keydown`, hideUploadFormByEsc);
    });
  }

  function setupUploadFormHiding() {
    const uploadFileCancelButton = document.querySelector(`#upload-cancel`);
    uploadFileCancelButton.addEventListener(`click`, function () {
      window.utils.hideBlock(`.img-upload__overlay`);
      document.body.classList.remove(`modal-open`);
      document.body.removeEventListener(`keydown`, hideUploadFormByEsc);
      uploadForm.reset();
    });
  }

  function hideWindow(window) {
    document.querySelector(`main`).removeChild(window);
  }

  function successHandler() {
    uploadForm.querySelector(`.img-upload__overlay`).classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    const pictureTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successWindow = pictureTemplate.cloneNode(true);
    document.querySelector(`main`).appendChild(successWindow);
    const successButton = document.querySelector(`.success__button`);
    successButton.addEventListener(`click`, function () {
      hideWindow(successWindow);
    });
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        hideWindow(successWindow);
      }
    });
    document.addEventListener(`click`, function (evt) {
      let inner = window.children[0];
      if (evt.target !== inner && !(new Array(inner.children)).includes(evt.target)) {
        hideWindow(successWindow);
      }
    });
    uploadForm.reset();
  }

  function errorHandler() {
    uploadForm.querySelector(`.img-upload__overlay`).classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    const pictureTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorWindow = pictureTemplate.cloneNode(true);
    document.querySelector(`main`).appendChild(errorWindow);
    const errorButton = document.querySelector(`.error__button`);
    errorButton.addEventListener(`click`, function () {
      hideWindow(errorWindow);
    });
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        hideWindow(errorWindow);
      }
    });
    document.addEventListener(`click`, function (evt) {
      let inner = window.children[0];
      if (evt.target !== inner && !(new Array(inner.children)).includes(evt.target)) {
        hideWindow(errorWindow);
      }
    });
    uploadForm.reset();
  }

  uploadForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), successHandler, errorHandler);
  });

  window.uploadForm = {
    setupUploadFormShowing,
    setupUploadFormHiding
  };
})();
