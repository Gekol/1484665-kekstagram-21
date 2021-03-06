'use strict';

(function () {
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
  const COMMENT_MAX_LENGTH = 140;

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

  window.utils = {
    photosCount: PHOTOS_COUNT,
    minLikes: MIN_LIKES,
    maxLikes: MAX_LIKES,
    effects: EFFECTS,
    minValue: MIN_VALUE,
    maxValue: MAX_VALUE,
    scaleStep: SCALE_STEP,
    commentMaxLength: COMMENT_MAX_LENGTH,
    generateRandomInt,
    makeElement,
    showBlock,
    hideBlock
  };
})();


