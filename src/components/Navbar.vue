<template>
  <nav v-if="user">
    <div>
      <p>
        Display name <span>{{ user.displayName }}</span>
      </p>
      <p class="email">Currently logged in as... {{ user.email }}</p>
    </div>
    <button @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import useLogout from '../composables/useLogout';
import getUser from '../composables/getUser';

export default {
  setup(props, context) {
    const { logout, error } = useLogout();
    const { user } = getUser();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        context.emit('logout');
        console.log('user logged out');
      }
    };
    return { handleClick, user };
  },
};
</script>

<style>
nav {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav span {
  color: #ffbf00;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #eee;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
</style>
