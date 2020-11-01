'use strict';

function main() {
  const pictures = document.querySelectorAll(`.picture`);
  for (let i = 0; i < window.pictureData.length; i++) {
    pictures[i].addEventListener(`click`, function () {
      window.bigPictureSetup(window.pictureData[i]);
    });
    pictures[i].addEventListener(`mousedown`, function (evt) {
      if (evt.key === `Enter`) {
        window.bigPictureSetup(window.pictureData[i]);
      }
    });
  }
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
  window.newPictureSetup.setupSizeChanging(imageUploadPreview);
  window.newPictureSetup.setupEffectChanging(imageUploadPreview);
  window.newPictureSetup.setupEffectIntensityChanging(imageUploadPreview);
  document.querySelector(`.social__comment-count`).classList.add(`hidden`);
  document.querySelector(`.comments-loader`).classList.add(`hidden`);
}

main();
