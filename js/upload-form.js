'use strict';

(function () {
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
    });
  }

  window.uploadForm = {
    setupUploadFormShowing,
    setupUploadFormHiding
  };
})();
