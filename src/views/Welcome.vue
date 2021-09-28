<template>
  <div class="welcome container">
    <h1 class="title">Welcome</h1>
    <div v-if="showLogin">
      <h2 class="title">Login</h2>
      <LoginForm @login="enterChat" />
      <p>No acount yet? <span @click="showLogin = false">Signup</span> instead</p>
    </div>
    <div v-else>
      <h2 class="title">Sign Up</h2>
      <SignupForm @signup="enterChat" />
      <p>Already registered? <span @click="showLogin = true">Login</span> instead</p>
    </div>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue';
import LoginForm from '../components/LoginForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true);
    const router = useRouter();

    const enterChat = () => {
      router.push({ name: 'Chatroom' });
    };
    return { showLogin, enterChat };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
  font-family: 'Times New Roman', Times, serif;
}
/* form styles */
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  background-color: white;
  border: 4px ridge #ccc;
  outline: none;
  color: black;
  margin: 10px auto;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.welcome span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}

.welcome p {
  color: #c0c0c0;
}

.welcome button {
  margin: 20px auto;
}
</style>
