<template>
    <header class="p-3 text-bg-dark">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><router-link to="/" class="nav-link px-2 text-secondary">Home</router-link></li>
                    <li><router-link to="/profile" class="nav-link px-2 text-white">Profile</router-link></li>
                    <li><router-link to="/about" class="nav-link px-2 text-white">About</router-link></li>
                </ul>

                <div class="text-end">
                    <div v-if="!isAuthenticated">
                        <router-link to="/login" class="btn btn-outline-light me-2">Login</router-link>
                        <router-link to="/signup" class="btn btn-warning">Sign-up</router-link>
                    </div>
                    <div v-else>
                        <button type="button" class="btn btn-warning" @click="logout">Log out</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>
