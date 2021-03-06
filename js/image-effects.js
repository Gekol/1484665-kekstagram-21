'use strict';

(function () {
  function setupEffectChanging(imageUploadPreview) {
    const effects = document.querySelectorAll(`.effects__radio`);
    let currentEffect = `none`;
    const effectSlider = document.querySelector(`.effect-level`);
    effectSlider.style.display = `none`;
    for (const effect of effects) {
      effect.addEventListener(`change`, function () {
        if (effect.value === `none`) {
          imageUploadPreview.style.filter = ``;
          effectSlider.style.display = `none`;
        } else {
          const effectIntensity = window.utils.effects[effect.value];
          const effectIntensityElement = document.querySelector(`.effect-level__value`);
          const effectIntensityValue = effectIntensityElement.value;
          effectSlider.style.display = `block`;
          imageUploadPreview.style.filter = `${effectIntensity.effect}(${parseInt(effectIntensityValue, 10) * effectIntensity.max / 100}${effectIntensity.unit})`;
        }
        imageUploadPreview.classList.remove(`effects__preview--${currentEffect}`);
        currentEffect = effect.value;
        imageUploadPreview.classList.add(`effects__preview--${currentEffect}`);
      });
    }
  }

  function setupEffectIntensityChanging(imageUploadPreview) {
    const levelPin = document.querySelector(`.effect-level__pin`);
    const effectIntensityElement = document.querySelector(`.effect-level__value`);
    const effectLevelDepth = document.querySelector(`.effect-level__depth`);
    levelPin.addEventListener(`mousedown`, function (evt) {
      let startCoords = {
        x: evt.clientX
      };
      const onMouseMove = function (moveEvt) {
        let shift = {
          x: startCoords.x - moveEvt.clientX
        };
        let newValue = levelPin.offsetLeft - shift.x;
        const maxWidth = levelPin.parentElement.offsetWidth;
        if (newValue >= 0 && newValue <= maxWidth) {
          effectIntensityElement.value = newValue / maxWidth * 100;
          levelPin.style.left = newValue + `px`;
          effectLevelDepth.style.width = newValue + `px`;
        }
        startCoords = {
          x: moveEvt.clientX
        };
        const effectIntensityValue = effectIntensityElement.value;
        if (imageUploadPreview.classList.length > 1 && imageUploadPreview.classList[1] !== `none`) {
          const effectClass = imageUploadPreview.classList[1];
          const effectIntensity = window.utils.effects[effectClass.substring(18, effectClass.length)];
          if (effectClass !== `none`) {
            imageUploadPreview.style.filter = `${effectIntensity.effect}(${parseInt(effectIntensityValue, 10) * effectIntensity.max / 100}${effectIntensity.unit})`;
          }
        }
      };
      const onMouseUp = function () {
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };
      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
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

  window.newPictureProperties = {
    setupEffectChanging,
    setupEffectIntensityChanging,
    setupSizeChanging
  };
})();
