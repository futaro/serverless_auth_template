import Vue            from 'vue'
import VueRouter      from "vue-router";
import Home           from './components/pages/Home'
import SignIn         from './components/pages/Auth/SignIn'
import SignInCallback from './components/pages/Auth/SignInCallback'

Vue.use(VueRouter)

export default new VueRouter({
  mode  : 'history',
  routes: [
    {path: '/', component: Home, name: 'Home'},
    {path: '/signin', name: 'SignIn', component: SignIn},
    {path: '/signin/callback', name: 'SignInCallback', component: SignInCallback}
  ]
})