import { ref } from 'vue';
import { auth } from '../firebase/config';
import errorValidation from './errorValitation';

const error = ref(null);

const signup = async (email, password, displayName) => {
  error.value = null;
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error('Could not complete the signup');
    }
    await res.user.updateProfile({ displayName });
    error.value = null;
    return res;
  } catch (err) {
    console.log(err.message);
    console.log(err.code);
    errorValidation(err, error);
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
