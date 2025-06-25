
const verifyPassword = (password) => {

  const uppercase = /.*[A-Z].*/;
  const lowercase = /.*[a-z].*/;
  const length = /.{6,}/;
  if (!uppercase.test(password)) return "Must have an Uppercase letter in the password";
  else if (!lowercase.test(password)) return "Must have a Lowercase letter in the password";
  else if (!length.test(password)) return "Length must be at least 6 character";
  else return;
};

export default verifyPassword;
