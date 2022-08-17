const validateEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

const validatePasswordLength = (password) => password.length >= 6;

const validateUserName = (name) => /^[a-zA-Z]+$/.test(name);

const validatePhoneNumber = (number) =>
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
    number
  );

export {
  validateEmail,
  validatePasswordLength,
  validateUserName,
  validatePhoneNumber,
};
