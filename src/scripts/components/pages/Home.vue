<template>
  <div>
    <h1>Home</h1>
    <router-link :to="{name:'SignIn'}">sign in</router-link>
    <a href="#" @click.prevent="signOut">sign out</a>
  </div>
</template>

<script>

  import {mapActions} from 'vuex'

  export default {
    name: 'Home',

    methods: {
      ...mapActions('AuthModule', ['signOut'])
    }
  }
</script>