'use strict';

(function () {
  function createComments(commentsCount) {
    let comments = [];
    for (let j = 0; j < commentsCount; j++) {
      comments.push({
        avatar: `img/avatar-${window.utils.generateRandomInt(1, 6)}.svg`,
        message: `${window.utils.comments[window.utils.generateRandomInt(0, window.utils.comments.length - 1)]}`,
        name: `${window.utils.names[window.utils.generateRandomInt(0, window.utils.names.length - 1)]}`
      });
    }
    return comments;
  }

  function generatePictureData() {
    let descriptions = [];
    for (let i = 1; i <= window.utils.photosCount; i++) {
      descriptions.push({
        url: `photos/${i}.jpg`,
        description: `Photo № ${i}`,
        likes: window.utils.generateRandomInt(window.utils.minLikes, window.utils.maxLikes),
        comments: createComments(window.utils.generateRandomInt(0, 10))
      });
    }
    return descriptions;
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
    for (const data of pictureData) {
      fragment.appendChild(generatePictureElem(data));
    }
    const picturesList = document.querySelector(`.pictures`);
    picturesList.appendChild(fragment);
  }

  const pictureData = generatePictureData();

  generatePictureElems(pictureData);

  window.pictureData = pictureData;

})();
