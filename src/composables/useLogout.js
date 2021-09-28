import { ref } from 'vue';
import { auth } from '../firebase/config';
import errorValidation from './errorValitation';

const error = ref(null);

const logout = async () => {
  error.value = null;
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

const useLogout = () => {
  return { logout, error };
};

export default useLogout;
