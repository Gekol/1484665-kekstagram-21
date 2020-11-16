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

  function modalWindowHideByClick(window) {
    return function () {
      document.querySelector(`main`).removeChild(window);
    };
  }

  function modalWindowHideByEsc(window) {
    return function (evt) {
      if (evt.key === `Escape`) {
        document.querySelector(`main`).removeChild(window);
      }
    };
  }

  function successHandler() {
    uploadForm.classList.add(`hidden`);
    const pictureTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successWindow = pictureTemplate.cloneNode(true);
    document.querySelector(`main`).appendChild(successWindow);
    const successButton = document.querySelector(`.success__button`);
    const successWindowHideByClick = modalWindowHideByClick(successWindow);
    const successWindowHideByEsc = modalWindowHideByEsc(successWindow);
    successButton.addEventListener(`click`, successWindowHideByClick);
    successButton.addEventListener(`mousedown`, successWindowHideByEsc);
    uploadForm.reset();
  }

  function errorHandler() {
    uploadForm.classList.add(`hidden`);
    const pictureTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorWindow = pictureTemplate.cloneNode(true);
    document.querySelector(`main`).appendChild(errorWindow);
    const errorButton = document.querySelector(`.error__button`);
    const errorWindowHide = modalWindowHideByClick(errorWindow);
    const errorWindowHideByEsc = modalWindowHideByEsc(errorWindow);
    errorButton.addEventListener(`click`, errorWindowHide);
    errorButton.addEventListener(`mousedown`, errorWindowHideByEsc);
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
