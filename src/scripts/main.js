import Vue     from 'vue'
import Amplify from 'aws-amplify'
import store   from './store'
import router  from './routes'
import App     from './components/App'

import {AuthConfig} from "./aws_auth";

Amplify.configure({
  Auth: AuthConfig
});

new Vue({
  el        : '#app',
  components: {App},
  template  : '<App/>',
  store,
  router,
})