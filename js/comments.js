'use strict';

(function () {
  window.checkComment = function (commentInput) {
    const comment = commentInput.value;
    if (comment.length > window.utils.commentMaxLength) {
      commentInput.setCustomValidity(`Comment is too long!!!`);
    } else if (comment.length === 0) {
      commentInput.setCustomValidity(`You didn't add any comment!!!`);
    }
  };
})();
