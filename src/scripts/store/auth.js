import {Auth}           from "aws-amplify"
import axios            from 'axios'
import {GetCognitoAuth} from "../aws_auth"
import {gateway}        from '../../../config'

export default {

  namespaced: true,

  state: {
    jwtToken: null
  },

  getters: {
    jwtToken: state => state.jwtToken
  },

  mutations: {
    setJwtToken(state, payload) {
      state.jwtToken = payload
    }
  },

  actions: {

    signIn({dispatch, commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          await dispatch('_getSession')
          const info = await dispatch('getAuthInfo')
          commit('setJwtToken', info.currentSession.accessToken.jwtToken)
          await dispatch('callAPI')
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },

    async signInCallback({dispatch, commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          await dispatch('_parseCognitoWebResponse')
          const info = await dispatch('getAuthInfo')
          commit('setJwtToken', info.currentSession.accessToken.jwtToken)
          await dispatch('callAPI')
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },

    async signOut({dispatch, commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          await dispatch('_signOut')
          commit('setJwtToken', null)
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },

    _getSession() {
      return new Promise((resolve, reject) => {
        const auth = GetCognitoAuth('Google', session => resolve(session), err => reject(err))
        auth.getSession()
      })
    },

    _parseCognitoWebResponse() {
      return new Promise((resolve, reject) => {
        const auth = GetCognitoAuth(null, session => resolve(session), err => reject(err))
        auth.parseCognitoWebResponse(window.location.href)
      })
    },

    _signOut() {
      return new Promise((resolve, reject) => {
        const auth = GetCognitoAuth(null, session => resolve(session), err => reject(err))
        auth.signOut()
      })
    },

    async getAuthInfo() {
      const info = {
        currentAuthenticatedUser: null,
        currentCredentials      : null,
        currentSession          : null,
        currentUserCredentials  : null,
        currentUserPoolUser     : null,
        currentUserInfo         : null
      };

      try {
        info.currentUserPoolUser = await Auth.currentUserPoolUser();
      } catch (e) {
        console.log(e);
      }

      try {
        info.currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
      } catch (e) {
        console.log(e);
      }

      try {
        info.currentSession = await Auth.currentSession();
      } catch (e) {
        console.log(e);
      }

      try {
        info.currentUserCredentials = await Auth.currentUserCredentials();
      } catch (e) {
        console.log(e);
      }

      try {
        info.currentCredentials = await Auth.currentCredentials();
      } catch (e) {
        console.log(e);
      }

      try {
        info.currentUserInfo = await Auth.currentUserInfo();
      } catch (e) {
        console.log(e);
      }

      return info;
    },

    async callAPI({state}) {
      return new Promise((resolve, reject) => {
        const headers = {
          Authorization: `Bearer ${state.jwtToken}`
        }

        axios
          .get(`${gateway.InvokeUrl}${gateway.Stage}/test`, {headers})
          .then(res => {
            alert(res.data.username)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}