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
const EFFECTS = {
  chrome: {
    effect: `grayscale`,
    min: 0,
    max: 1,
    unit: ``
  },
  sepia: {
    effect: `sepia`,
    min: 0,
    max: 1,
    unit: ``
  },
  marvin: {
    effect: `invert`,
    min: 0,
    max: 100,
    unit: `%`
  },
  phobos: {
    effect: `blur`,
    min: 0,
    max: 3,
    unit: `px`
  },
  heat: {
    effect: `brightness`,
    min: 1,
    max: 3,
    unit: ``
  }
};
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const SCALE_STEP = 25;

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

function showBlock(selector) {
  let block = document.querySelector(selector);
  if (block !== undefined) {
    block.classList.remove(`hidden`);
  }
}

function hideBlock(selector) {
  let block = document.querySelector(selector);
  if (block !== undefined) {
    block.classList.add(`hidden`);
  }
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

function hideBigPictureByClick() {
  const bigPicture = document.querySelector(`.big-picture`);
  bigPicture.classList.add(`hidden`);
  bigPicture.querySelector(`.big-picture__cancel`).removeEventListener(`click`, hideBigPictureByClick);
  document.body.removeEventListener(`keydown`, hideBigPictureByEsc);
}

function hideBigPictureByEsc(evt) {
  if (evt.key === `Escape`) {
    hideBigPictureByClick();
  }
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
  const commentsBlock = bigPicture.querySelector(`.social__comments`);
  commentsBlock.innerHTML = ``;
  const comments = document.createDocumentFragment();
  for (const comment of pictureData.comments) {
    comments.appendChild(createCommentElem(comment));
  }
  commentsBlock.appendChild(comments);
}

function changeSize(sizeElement, imageUploadPreview, multiplier) {
  const currentValue = sizeElement.value;
  const newValue = parseInt(currentValue, 10) + SCALE_STEP * multiplier;
  if (newValue >= MIN_VALUE && newValue <= MAX_VALUE) {
    sizeElement.value = newValue;
    imageUploadPreview.style.transform = `scale(${(parseInt(sizeElement.value, 10) / MAX_VALUE).toString()})`;
  }
}

function setupSizeChanging(imageUploadPreview) {
  const shrinkButton = document.querySelector(`.scale__control--smaller`);
  const enlargeButton = document.querySelector(`.scale__control--bigger`);
  const sizeElement = document.querySelector(`.scale__control--value`);
  shrinkButton.addEventListener(`click`, function () {
    changeSize(sizeElement, imageUploadPreview, -1);
  });
  enlargeButton.addEventListener(`click`, function () {
    changeSize(sizeElement, imageUploadPreview, 1);
  });
}

function hideUploadFormByEsc(evt) {
  if (evt.key === `Escape` && document.activeElement !== document.querySelector(`.text__description`) && document.activeElement !== document.querySelector(`.text__hashtags`)) {
    hideBlock(`.img-upload__overlay`);
    document.body.classList.remove(`modal-open`);
    document.querySelector(`.img-upload__overlay`).removeEventListener(`keydown`, hideUploadFormByEsc);
  }
}

function setupUploadFormShowing() {
  const uploadFileButton = document.querySelector(`#upload-file`);
  uploadFileButton.addEventListener(`click`, function () {
    showBlock(`.img-upload__overlay`);
    document.body.classList.add(`modal-open`);
    document.body.addEventListener(`keydown`, hideUploadFormByEsc);
  });
}

function setupUploadFormHiding() {
  const uploadFileCancelButton = document.querySelector(`#upload-cancel`);
  uploadFileCancelButton.addEventListener(`click`, function () {
    hideBlock(`.img-upload__overlay`);
    document.body.classList.remove(`modal-open`);
    document.body.removeEventListener(`keydown`, hideUploadFormByEsc);
  });
}

function setupEffectChanging(imageUploadPreview) {
  const effects = document.querySelectorAll(`.effects__radio`);
  let currentEffect = `none`;
  for (const effect of effects) {
    effect.addEventListener(`change`, function () {
      imageUploadPreview.classList.remove(`effects__preview--${currentEffect}`);
      currentEffect = effect.value;
      imageUploadPreview.classList.add(`effects__preview--${currentEffect}`);
    });
  }
}

function setupEffectIntensityChanging(imageUploadPreview) {
  const levelPin = document.querySelector(`.effect-level__pin`);
  levelPin.addEventListener(`mousedown`, function () {
    const effectIntensityValue = document.querySelector(`.effect-level__value`).value;
    if (imageUploadPreview.classList.length > 1) {
      const effectClass = imageUploadPreview.classList[1];
      const effectIntensity = EFFECTS[effectClass.substring(18, effectClass.length)];
      imageUploadPreview.querySelector(`img`).style.filter = `${effectIntensity.effect}(${parseInt(effectIntensityValue, 10) / 100}${effectIntensity.unit})`;
    }
  });
}

function checkUniqueValues(hashtags) {
  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i] === hashtags[j]) {
        return false;
      }
    }
  }
  return true;
}

function checkHashTag(hashtagInput) {
  const hashtags = hashtagInput.value.split(` `);
  if (hashtags.length > 5) {
    hashtagInput.setCustomValidity(`You can write at most five hashtags!!!`);
  }
  if (!checkUniqueValues(hashtags)) {
    hashtagInput.setCustomValidity(`You cannot use the same hashtags!!!`);
  }
  const hashTagRegExp = /#[a-zA-Zа-яА-я\d]+/;
  for (const hashtag of hashtags) {
    if (hashtag[0] !== `#`) {
      hashtagInput.setCustomValidity(`Hashtag must start with '#'!!!`);
    } else if (hashtag === `#`) {
      hashtagInput.setCustomValidity(`Hashtag must have at least one symbol after '#'!!!`);
    } else if (hashtag.length > 20) {
      hashtagInput.setCustomValidity(`Hashtag is too long!!!`);
    } else if (hashTagRegExp.test(hashtag) !== true) {
      hashtagInput.setCustomValidity(`Hashtag must contain only '#', letters and numbers!!!`);
    } else {
      hashtagInput.setCustomValidity(``);
    }
  }
}

function checkComment(commentInput) {
  const comment = commentInput.value;
  if (comment.length > 140) {
    commentInput.setCustomValidity(`Comment is too long!!!`);
  }
}

function main() {
  const pictureData = generatePictureData();
  generatePictureElems(pictureData);
  const pictures = document.querySelectorAll(`.picture`);
  for (let i = 0; i < pictureData.length; i++) {
    pictures[i].addEventListener(`click`, function () {
      bigPictureSetup(pictureData[i]);
    });
    pictures[i].addEventListener(`mousedown`, function (evt) {
      if (evt.key === `Enter`) {
        bigPictureSetup(pictureData[i]);
      }
    });
  }
  const hashtagInput = document.querySelector(`.text__hashtags`);
  hashtagInput.addEventListener(`change`, function () {
    checkHashTag(hashtagInput);
  });
  const commentInput = document.querySelector(`.text__description`);
  commentInput.addEventListener(`change`, function () {
    checkComment(commentInput);
  });
  setupUploadFormShowing();
  setupUploadFormHiding();
  const imageUploadPreview = document.querySelector(`.img-upload__preview`);
  setupSizeChanging(imageUploadPreview);
  setupEffectChanging(imageUploadPreview);
  setupEffectIntensityChanging(imageUploadPreview);
  document.querySelector(`.social__comment-count`).classList.add(`hidden`);
  document.querySelector(`.comments-loader`).classList.add(`hidden`);
}

main();
