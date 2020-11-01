'use strict';

(function () {
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
        const effectIntensity = window.utils.effects[effectClass.substring(18, effectClass.length)];
        imageUploadPreview.querySelector(`img`).style.filter = `${effectIntensity.effect}(${parseInt(effectIntensityValue, 10) / 100}${effectIntensity.unit})`;
      }
    });
  }

  function changeSize(sizeElement, imageUploadPreview, multiplier) {
    const currentValue = sizeElement.value;
    const newValue = parseInt(currentValue, 10) + window.utils.scaleStep * multiplier;
    if (newValue >= window.utils.minValue && newValue <= window.utils.maxValue) {
      sizeElement.value = newValue;
      imageUploadPreview.style.transform = `scale(${(parseInt(sizeElement.value, 10) / window.utils.maxValue).toString()})`;
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

  window.newPictureSetup = {
    setupEffectChanging,
    setupEffectIntensityChanging,
    setupSizeChanging
  };
})();
