'use strict';

(function () {
  function checkUniqueValues(hashtags) {
    for (let i = 0; i < hashtags.length; i++) {
      for (let j = i + 1; j < hashtags.length; j++) {
        if (String.prototype.toLowerCase(hashtags[i]) === String.prototype.toLowerCase(hashtags[j])) {
          return false;
        }
      }
    }
    return true;
  }

  window.checkHashTag = function (hashtagInput) {
    const hashtags = hashtagInput.value.split(` `);
    const hashTagRegExp = /#[a-zA-Zа-яА-я\d]+/;
    for (const hashtag of hashtags) {
      if (hashtag[0] !== `#`) {
        hashtagInput.setCustomValidity(`Hashtag must start with '#'!!!`);
        return;
      } else if (hashtag === `#`) {
        hashtagInput.setCustomValidity(`Hashtag must have at least one symbol after '#'!!!`);
        return;
      } else if (hashtag.length > 20) {
        hashtagInput.setCustomValidity(`Hashtag is too long!!!`);
        return;
      } else if (hashTagRegExp.test(hashtag) !== true) {
        hashtagInput.setCustomValidity(`Hashtag must contain only '#', letters and numbers!!!`);
        return;
      } else {
        hashtagInput.setCustomValidity(``);
      }
    }
    if (hashtags.length > 5) {
      hashtagInput.setCustomValidity(`You can write at most five hashtags!!!`);
    }
    if (!checkUniqueValues(hashtags)) {
      hashtagInput.setCustomValidity(`You cannot use the same hashtags!!!`);
    }
  };
})();
