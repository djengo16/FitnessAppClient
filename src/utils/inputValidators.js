const validateEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

const validatePasswordLength = (password) => password.length >= 6;

const validateUserName = (name) => /^[a-zA-Z]+$/.test(name);

export { validateEmail, validatePasswordLength, validateUserName };
