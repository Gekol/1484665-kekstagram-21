'use strict';

const NAMES = [`Михаил`, `Георгий`, `Алексей`, `Ольга`, `Ирина`, `Наталья`, `Виктор`, `Даниил`, `Юлия`, `Елизавета`, `Светлана`, `Константин`];
const COMMENTS = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

function generateRandomInt(minNum = 0, maxNum = 1) {
  return Math.round(Math.random() * (maxNum - minNum)) + minNum;
}

function makeElement(tagName, className, text) {
  const newElem = document.createElement(tagName);
  if (text !== undefined) {
    newElem.textContent = text;
  }
  newElem.classList.add(className);
  return newElem;
}

function createComments(commentsCount) {
  let comments = [];
  for (let j = 0; j < commentsCount; j++) {
    comments.push({
      avatar: `img/avatar-${generateRandomInt(1, 6)}.svg`,
      message: `${COMMENTS[generateRandomInt(0, COMMENTS.length - 1)]}`,
      name: `${NAMES[generateRandomInt(0, NAMES.length - 1)]}`
    });
  }
  return comments;
}

function generatePictureData() {
  let descriptions = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    descriptions.push({
      url: `photos/${i}.jpg`,
      description: `Photo № ${i}`,
      likes: generateRandomInt(MIN_LIKES, MAX_LIKES),
      comments: createComments(generateRandomInt(0, 10))
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

function createCommentElem(commentData) {
  const newComment = makeElement(`li`, `social__comment`);
  const commentImage = makeElement(`img`, `social__picture`);
  commentImage.src = commentData.avatar;
  commentImage.alt = commentData.name;
  commentImage.width = `35`;
  commentImage.height = `35`;
  newComment.appendChild(commentImage);
  const commentText = makeElement(`p`, `social__text`, commentData.message);
  newComment.appendChild(commentText);
  return newComment;
}

function bigPictureSetup(pictureData) {
  const bigPicture = document.querySelector(`.big-picture`);
  bigPicture.classList.remove(`hidden`);
  bigPicture.querySelector(`.big-picture__img img`).src = pictureData.url;
  bigPicture.querySelector(`.likes-count`).textContent = pictureData.likes;
  bigPicture.querySelector(`.comments-count`).textContent = pictureData.comments.length;
  bigPicture.querySelector(`.social__caption`).textContent = pictureData.description;
  const commentsBlock = bigPicture.querySelector(`.social__comments`);
  commentsBlock.innerHTML = ``;
  const comments = document.createDocumentFragment();
  for (const comment of pictureData.comments) {
    comments.appendChild(createCommentElem(comment));
  }
  commentsBlock.appendChild(comments);
}

function main() {
  const pictureData = generatePictureData();
  generatePictureElems(pictureData);
  bigPictureSetup(pictureData[0]);
  document.querySelector(`.social__comment-count`).classList.add(`hidden`);
  document.querySelector(`.comments-loader`).classList.add(`hidden`);
  document.body.classList.add(`modal-open`);
}

main();
