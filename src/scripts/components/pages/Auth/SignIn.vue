<template>
  <div>
    <h1>Signin</h1>
    <a href="#" @click.prevent="handleSignIn">signin with google</a>
  </div>
</template>

<script>

  import {mapActions} from 'vuex'
  import router       from '../../../routes'

  export default {

    name: 'SignIn',

    methods: {

      ...mapActions('AuthModule', ['signIn']),

      async handleSignIn() {
        await this.signIn()
        router.push({name: 'Home'})
      },
    }
  }
</script>