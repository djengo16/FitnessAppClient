const tokenIndetifier = "token";
var Buffer = require("buffer/").Buffer;

const tokenStorage = {
  saveToken: (token) => localStorage.setItem(tokenIndetifier, token),
  getToken: () => localStorage.getItem(tokenIndetifier),
  deleteToken: () => localStorage.removeItem(tokenIndetifier),
  decodeToken: () => {
    try {
      const item = localStorage.getItem(tokenIndetifier);
      if (!item) {
        return;
      }
      const token = JSON.parse(
        Buffer.from(item.split(".")[1], "base64").toString()
      );
      return token;
    } catch (err) {
      return err.message;
    }
  },
};

const userStorage = {
  saveActiveplanId: (planId) => localStorage.setItem("activePlanId", planId),
  saveUserProfilePictureUrl: (url) =>
    localStorage.setItem("profilePictureUrl", url),
};

export { tokenStorage, userStorage };
