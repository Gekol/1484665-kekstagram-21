'use strict';

(function () {
  const RANDOM_ELEMENTS_COUNT = 10;

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

  function addFilters() {
    document.querySelector(`.img-filters`).classList.remove(`img-filters--inactive`);
    const defaultButton = document.querySelector(`#filter-default`);
    const randomButton = document.querySelector(`#filter-random`);
    const discussedButton = document.querySelector(`#filter-discussed`);
    let activeButton = document.querySelector(`#filter-default`);
    const defaultButtonClickHandler = window.debounce(function () {
      activeButton.classList.remove(`img-filters__button--active`);
      defaultButton.classList.add(`img-filters__button--active`);
      activeButton = defaultButton;
      generatePictureElems(window.pictureData);
    });
    const randomButtonClickHandler = window.debounce(function () {
      activeButton.classList.remove(`img-filters__button--active`);
      randomButton.classList.add(`img-filters__button--active`);
      activeButton = randomButton;
      const pictureData = [...window.pictureData];
      const shuffled = pictureData.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, RANDOM_ELEMENTS_COUNT);
      generatePictureElems(selected);
    });
    const discussedButtonClickHandler = window.debounce(function () {
      let pictureData = [...window.pictureData];
      pictureData = pictureData.sort(function (a, b) {
        return parseInt(b.comments.length, 10) - parseInt(a.comments.length, 10);
      });
      activeButton.classList.remove(`img-filters__button--active`);
      discussedButton.classList.add(`img-filters__button--active`);
      activeButton = discussedButton;
      generatePictureElems(pictureData);
    });
    defaultButton.addEventListener(`click`, defaultButtonClickHandler);
    randomButton.addEventListener(`click`, randomButtonClickHandler);
    discussedButton.addEventListener(`click`, discussedButtonClickHandler);
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
