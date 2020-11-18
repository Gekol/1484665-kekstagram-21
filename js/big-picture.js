'use strict';

(function () {
  function createCommentElem(commentData) {
    const newComment = window.utils.makeElement(`li`, `social__comment`);
    const commentImage = window.utils.makeElement(`img`, `social__picture`);
    commentImage.src = commentData.avatar;
    commentImage.alt = commentData.name;
    commentImage.width = `35`;
    commentImage.height = `35`;
    newComment.appendChild(commentImage);
    const commentText = window.utils.makeElement(`p`, `social__text`, commentData.message);
    newComment.appendChild(commentText);
    return newComment;
  }

  function hideBigPictureByEscHandler(evt) {
    if (evt.key === `Escape` && document.activeElement !== document.querySelector(`.social__footer-text`)) {
      hideBigPictureByClickHandler();
      document.body.classList.remove(`modal-open`);
    }
  }

  function hideBigPictureByClickHandler() {
    const bigPicture = document.querySelector(`.big-picture`);
    bigPicture.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    bigPicture.querySelector(`.big-picture__cancel`).removeEventListener(`click`, hideBigPictureByClickHandler);
    document.body.removeEventListener(`keydown`, hideBigPictureByEscHandler);
  }

  function bigPictureSetup(pictureData) {
    const bigPicture = document.querySelector(`.big-picture`);
    bigPicture.classList.remove(`hidden`);
    bigPicture.querySelector(`.big-picture__img img`).src = pictureData.url;
    bigPicture.querySelector(`.likes-count`).textContent = pictureData.likes;
    bigPicture.querySelector(`.comments-count`).textContent = pictureData.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = pictureData.description;
    bigPicture.querySelector(`.big-picture__cancel`).addEventListener(`click`, hideBigPictureByClickHandler);
    document.body.addEventListener(`keydown`, hideBigPictureByEscHandler);
    document.body.classList.add(`modal-open`);
    const commentsBlock = bigPicture.querySelector(`.social__comments`);
    commentsBlock.innerHTML = ``;
    const comments = document.createDocumentFragment();
    for (const comment of pictureData.comments) {
      comments.appendChild(createCommentElem(comment));
    }
    commentsBlock.appendChild(comments);
  }

  window.bigPictureSetup = bigPictureSetup;
})();
