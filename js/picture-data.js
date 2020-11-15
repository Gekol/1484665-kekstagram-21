'use strict';

(function () {

  function successHandler(pictureData) {
    window.pictureData = pictureData;
    generatePictureElems(pictureData);
  }

  function generatePictureData() {
    window.backend.load(successHandler);
  }

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

  generatePictureData();

})();
