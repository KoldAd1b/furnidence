const validateEmail = (email) => {
  email = email.trim();
  if (!email) {
    return "Email must not be empty";
  }
  if (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return null;
  }
  return "Invalid email. Please try again";
};

const validateName = (name) => {
  if (name.trim().length >= 5) return null;
  return "Name must contain at least 5 characters";
};
const validatePassword = (password) => {
  password = password.trim();
  const errors = [];
  if (!password) {
    return ["Password must not be empty"];
  }
  if (password.length < 6) {
    errors.push("Your password must be at least 6 characters");
  }
  if (password.search(/[a-z]/i) < 0) {
    errors.push("Your password must contain at least one letter.");
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
  }
  if (errors.length > 0) {
    return errors;
  }
  return null;
};

const confirmPassword = (password, passwordToConfirm) => {
  if (password.trim() !== passwordToConfirm.trim())
    return "Passwords should match";
  return null;
};
export { validateEmail, validateName, validatePassword, confirmPassword };
