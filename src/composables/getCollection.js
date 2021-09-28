import { ref } from 'vue';
import { db } from '../firebase/config';

const getCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = db.collection(collection).orderBy('createdAt');

  collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      console.log(snap);
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = 'could not fetch the data';
    }
  );

  return { error, documents };
};

export default getCollection;
