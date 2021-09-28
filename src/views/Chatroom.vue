<template>
  <div class="container">
    <Navbar @logout="handleLogout" />
    <ChatWindow />
    <NewChatForm />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import ChatWindow from '../components/ChatWindow.vue';
import getUser from '../composables/getUser';
import { useRouter } from 'vue-router';
import NewChatForm from '../components/NewChatForm.vue';
export default {
  components: { Navbar, NewChatForm, ChatWindow },
  setup(props, context) {
    const { user } = getUser();
    const router = useRouter();

    const handleLogout = () => {
      router.push({ name: 'Welcome' });
    };
    return { user, handleLogout };
  },
};
</script>

<style></style>
