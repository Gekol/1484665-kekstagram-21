'use strict';

const NAMES = [`Михаил`, `Георгий`, `Алексей`, `Ольга`, `Ирина`, `Наталья`, `Виктор`, `Юлия`, `Елизавета`, `Светлана`, `Константин`];
const COMMENTS = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const picturesList = document.querySelector(`.pictures`);

function generateRandomInt(maxNum = 1, minNum = 0) {
  return Math.round(Math.random() * (maxNum - minNum)) + minNum;
}

function createComment() {
  let newComment = {
    avatar: `img/avatar-${generateRandomInt(6, 1)}.svg`,
    message: `${COMMENTS[generateRandomInt(COMMENTS.length)]}`,
    name: `${NAMES[generateRandomInt(NAMES.length)]}`
  };
  return newComment;
}

function generatePictureData() {
  let descriptions = [];

  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    let newDescription = {
      url: `photos/${i}.jpg`,
      description: `Photo № ${i}`,
      likes: generateRandomInt(MAX_LIKES, MIN_LIKES),
      comments: []
    };
    const commentsCount = generateRandomInt(10);
    for (let j = 0; j < commentsCount; j++) {
      newDescription.comments[j] = createComment();
    }
    descriptions[i - 1] = newDescription;
  }
  return descriptions;
}

function generatePictureElem(data) {
  const newElem = pictureTemplate.cloneNode(true);
  newElem.querySelector(`.picture__img`).src = data.url;
  newElem.querySelector(`.picture__likes`).textContent = data.likes;
  newElem.querySelector(`.picture__comments`).textContent = data.comments.length;
  return newElem;
}

function generatePictureElems() {
  const fragment = document.createDocumentFragment();
  const pictureData = generatePictureData();
  for (let data of pictureData) {
    fragment.appendChild(generatePictureElem(data));
  }
  picturesList.appendChild(fragment);
}

function main() {
  generatePictureElems();
}

main();
