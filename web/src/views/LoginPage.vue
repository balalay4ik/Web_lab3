<template>
  <main class="form-signin w-25 m-auto">
    <form>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating" style="margin-bottom: 4px;">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
        <label for="floatingPassword">Password</label>
      </div>

      <p v-if="errorMessage">{{ errorMessage }}</p>
      <button style="margin-top: 10px" class="btn btn-login w-100 py-2" type="button" @click="login">Login</button>
      <p class="mt-5 mb-3 text-body-secondary">© 2024</p>
    </form>
  </main>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const store = useStore();
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.get('/api/account', {
          params: {
            email: email.value,
            password: password.value
          }
        });
        if (response.data && response.data.id) {
          store.dispatch('login', response.data)
          router.push('/'); 
        } else {
          errorMessage.value = 'Invalid credentials';
        }
      } catch (error) {
        errorMessage.value = error.response.data.message || 'Login failed';
      }
    };

    return { email, password, errorMessage, login };
  }
};
</script>