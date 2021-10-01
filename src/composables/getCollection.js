import { ref, watchEffect } from 'vue';
import { db } from '../firebase/config';
import { query, limitToLast } from 'firebase/database';

const getCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);
  const lastMss = ref(null);

  let collectionRef = db.collection(collection).orderBy('createdAt');

  let last = db
    .collection(collection)
    .orderBy('createdAt', 'desc')
    .limit(1);

  const lasterino = last.onSnapshot(
    (snap) => {
      let ayy = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && ayy.push({ ...doc.data(), id: doc.id });
      });

      lastMss.value = ayy;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      lastMss.value = null;
      error.value = 'could not fetch the data';
    }
  );

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
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

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsub();
      lasterino();
    });
  });

  return { error, documents, lastMss };
};

export default getCollection;
