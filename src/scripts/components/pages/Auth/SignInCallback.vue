<template>
  <h1>Signin Callback</h1>
</template>

<script>

  import {mapActions}     from 'vuex'
  import router           from '../../../routes'

  export default {

    name: 'SignInCallback',

    mounted() {
      this.signInCallback()
      router.push({name: 'Home'})
    },

    methods: {
      ...mapActions('AuthModule', ['signInCallback'])
    }
  }
</script>