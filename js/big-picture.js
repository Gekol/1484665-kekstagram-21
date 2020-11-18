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

  function hideBigPictureByEsc(evt) {
    if (evt.key === `Escape` && document.activeElement !== document.querySelector(`.social__footer-text`)) {
      hideBigPictureByClick();
      document.body.classList.remove(`modal-open`);
    }
  }

  function hideBigPictureByClick() {
    const bigPicture = document.querySelector(`.big-picture`);
    bigPicture.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    bigPicture.querySelector(`.big-picture__cancel`).removeEventListener(`click`, hideBigPictureByClick);
    document.body.removeEventListener(`keydown`, hideBigPictureByEsc);
  }

  function addComments(commentsData, bigPicture, commentsNumber) {
    const commentsBlock = bigPicture.querySelector(`.social__comments`);
    commentsBlock.innerHTML = ``;
    const comments = document.createDocumentFragment();
    for (let i = 0; i < commentsNumber; i++) {
      comments.appendChild(createCommentElem(commentsData[i]));
    }
    commentsBlock.appendChild(comments);
  }

  function addCommentseventListener(pictureData, commentsLoader, bigPicture, commentsNumber) {
    function addCommentsByClick() {
      commentsNumber += Math.min(5, pictureData.comments.length - commentsNumber);
      addComments(pictureData.comments, bigPicture, commentsNumber);
      if (commentsNumber === pictureData.comments.length) {
        commentsLoader.classList.add(`hidden`);
        commentsLoader.removeEventListener(`click`, addCommentsByClick);
      }
    }
    commentsLoader.addEventListener(`click`, addCommentsByClick);
  }

  function bigPictureSetup(pictureData) {
    const bigPicture = document.querySelector(`.big-picture`);
    bigPicture.classList.remove(`hidden`);
    bigPicture.querySelector(`.big-picture__img img`).src = pictureData.url;
    bigPicture.querySelector(`.likes-count`).textContent = pictureData.likes;
    bigPicture.querySelector(`.comments-count`).textContent = pictureData.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = pictureData.description;
    bigPicture.querySelector(`.big-picture__cancel`).addEventListener(`click`, hideBigPictureByClick);
    document.body.addEventListener(`keydown`, hideBigPictureByEsc);
    document.body.classList.add(`modal-open`);
    let commentsNumber = Math.min(5, pictureData.comments.length);
    addComments(pictureData.comments, bigPicture, commentsNumber);
    if (pictureData.comments.length > 5) {
      const commentsLoader = document.querySelector(`.comments-loader`);
      commentsLoader.classList.remove(`hidden`);
      addCommentseventListener(pictureData, commentsLoader, bigPicture, commentsNumber);
    }
  }

  window.bigPictureSetup = bigPictureSetup;
})();
