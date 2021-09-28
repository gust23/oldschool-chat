import { ref } from 'vue';
import { auth } from '../firebase/config';
import errorValidation from './errorValitation';

const error = ref(null);

const login = async (email, password) => {
  error.value = null;
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    error.value = null;
    console.log(res);
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = 'Incorrect login credentials, try again';
  }
};

const useLogin = () => {
  return { error, login };
};

export default useLogin;
