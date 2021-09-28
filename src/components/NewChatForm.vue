<template>
  <div class="teste">
    <form>
      <textarea
        @keypress.enter.prevent="handleSubmit"
        placeholder="Type a message and hit enter to send..."
        v-model="message"
      >
      </textarea>
      <button @click.prevent="handleSubmit">Send</button>
      <div class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import getUser from '../composables/getUser';
import { timestamp } from '../firebase/config';
import useCollection from '../composables/useCollection';
export default {
  setup(props) {
    const { user } = getUser();
    const { addDoc, error } = useCollection('messages');
    const message = ref('');

    const handleSubmit = async () => {
      const chat = {
        message: message.value,
        name: user.value.displayName,
        createdAt: timestamp(),
      };
      if (message.value) {
        await addDoc(chat);
      }
      if (!error.value) {
        message.value = '';
      }
    };
    return {
      message,
      handleSubmit,
      error,
    };
  },
};
</script>

<style scoped>
form {
  margin: 10px;
  display: flex;
  justify-content: space-between;
}

button {
  width: 90px;
  height: 45px;

  border: 4px ridge #484848;
  margin-left: 10px;
}

textarea {
  resize: none;
  height: 45px;
  width: 85%;
  background-color: rgb(32, 32, 32);
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 2px ridge #ccc;
  font-family: inherit;
  outline: none;
  color: #ccc;
  font-size: 14px;
}
</style>
