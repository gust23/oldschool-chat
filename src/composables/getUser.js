import { ref } from 'vue';
import { auth } from '../firebase/config';
import errorValidation from './errorValitation';

const error = ref(null);

const user = ref(auth.currentUser);

auth.onAuthStateChanged((_user) => {
  console.log(_user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
