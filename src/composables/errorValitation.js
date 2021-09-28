const errorValidation = (err, error) => {
  switch (err.code) {
    case 'auth/weak-password':
      error.value = 'Password should be at least 6 characters';
      break;
    case 'auth/email-already-in-use':
      error.value = 'The provided email is already in use by an existing user. Each user must have a unique email.';
      break;
    default:
      error.value = err.message;
  }
};

export default errorValidation;
