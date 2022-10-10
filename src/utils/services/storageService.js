const tokenIndetifier = "token";
var Buffer = require("buffer/").Buffer;

const storageItems = {
  activePlanId: "activePlanId",
  profilePictureUrl: "profilePictureUrl",
  token: "token",
};

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
  saveActiveplanId: (planId) =>
    localStorage.setItem(storageItems.activePlanId, planId),
  getActivePlanId: () => localStorage.getItem(storageItems.activePlanId),
  saveUserProfilePictureUrl: (url) =>
    localStorage.setItem(storageItems.profilePictureUrl, url),
};

export { tokenStorage, userStorage };
