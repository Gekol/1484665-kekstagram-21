'use strict';

(function () {
  function generatePictureElem(data) {
    const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
    const newElem = pictureTemplate.cloneNode(true);
    newElem.querySelector(`.picture__img`).src = data.url;
    newElem.querySelector(`.picture__likes`).textContent = data.likes;
    newElem.querySelector(`.picture__comments`).textContent = data.comments.length.toString();
    newElem.addEventListener(`click`, function () {
      window.bigPictureSetup(data);
    });
    newElem.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.bigPictureSetup(data);
      }
    });
    return newElem;
  }

  function generatePictureElems(pictureData) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < pictureData.length; i++) {
      fragment.appendChild(generatePictureElem(pictureData[i]));
    }
    const picturesList = document.querySelector(`.pictures`);
    const pictures = document.querySelectorAll(`.picture`);
    pictures.forEach((picture) => {
      picturesList.removeChild(picture);
    });
    picturesList.appendChild(fragment);
  }

  function makeActive(element, activeButton) {
    activeButton.classList.remove(`img-filters__button--active`);
    element.classList.add(`img-filters__button--active`);
  }

  function addFilters() {
    document.querySelector(`.img-filters`).classList.remove(`img-filters--inactive`);
    const buttons = document.querySelectorAll(`.img-filters__button`);
    let defaultButton = buttons[0];
    let randomButton = buttons[1];
    let discussedButton = buttons[2];
    let activeButton = buttons[0];
    const getDefaultPictures = window.debounce(function () {
      makeActive(defaultButton, activeButton);
      activeButton = defaultButton;
      generatePictureElems(window.pictureData);
    });
    const getRandomPictures = window.debounce(function () {
      makeActive(randomButton, activeButton);
      activeButton = randomButton;
      const pictureData = [];
      for (let i = 0; i < 10; i++) {
        let picture = null;
        while (picture === null || pictureData.includes(picture)) {
          picture = window.pictureData[window.utils.generateRandomInt(0, window.utils.photosCount)];
        }
        pictureData[i] = picture;
      }
      generatePictureElems(pictureData);
    });
    const getDiscussedPictures = window.debounce(function () {
      const pictureData = window.pictureData.sort(function (a, b) {
        return parseInt(b.likes, 10) - parseInt(a.likes, 10);
      });
      makeActive(discussedButton, activeButton);
      activeButton = discussedButton;
      generatePictureElems(pictureData);
    });
    defaultButton.addEventListener(`click`, getDefaultPictures);
    randomButton.addEventListener(`click`, getRandomPictures);
    discussedButton.addEventListener(`click`, getDiscussedPictures);
  }

  function successHandler(pictureData) {
    window.pictureData = pictureData;
    generatePictureElems(pictureData);
    addFilters();
    const pictures = document.querySelectorAll(`.picture`);
    for (let i = 0; i < window.pictureData.length; i++) {
      pictures[i].addEventListener(`click`, function () {
        window.bigPictureSetup(window.pictureData[i]);
      });
      pictures[i].addEventListener(`keydown`, function (evt) {
        if (evt.key === `Enter`) {
          window.bigPictureSetup(window.pictureData[i]);
        }
      });
    }
  }

  window.backend.load(successHandler);

})();
