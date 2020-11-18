'use strict';

(function () {
  function generatePictureElem(data) {
    const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
    const newElem = pictureTemplate.cloneNode(true);
    newElem.querySelector(`.picture__img`).src = data.url;
    newElem.querySelector(`.picture__likes`).textContent = data.likes;
    newElem.querySelector(`.picture__comments`).textContent = data.comments.length.toString();
    return newElem;
  }

  function generatePictureElems(pictureData) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < pictureData.length; i++) {
      fragment.appendChild(generatePictureElem(pictureData[i]));
    }
    const picturesList = document.querySelector(`.pictures`);
    picturesList.appendChild(fragment);
  }

  function successHandler(pictureData) {
    window.pictureData = pictureData;
    generatePictureElems(pictureData);
    document.querySelector(`.img-filters`).classList.remove(`img-filters--inactive`);
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
  }

  window.backend.load(successHandler);

})();
