'use strict';

(function () {
  window.addEventListener(`load`, function () {
    const hashtagInput = document.querySelector(`.text__hashtags`);
    hashtagInput.addEventListener(`change`, function () {
      window.checkHashTag(hashtagInput);
    });
    const commentInput = document.querySelector(`.text__description`);
    commentInput.addEventListener(`change`, function () {
      window.checkComment(commentInput);
    });
    window.uploadForm.setupUploadFormShowing();
    window.uploadForm.setupUploadFormHiding();
    const imageUploadPreview = document.querySelector(`.img-upload__preview`);
    window.newPictureProperties.setupSizeChanging(imageUploadPreview);
    window.newPictureProperties.setupEffectChanging(imageUploadPreview);
    window.newPictureProperties.setupEffectIntensityChanging(imageUploadPreview);
    document.querySelector(`.social__comment-count`).classList.add(`hidden`);
    document.querySelector(`.comments-loader`).classList.add(`hidden`);
  });
})();
