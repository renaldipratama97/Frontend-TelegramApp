import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLogin: {},
    contactList: {},
    profile: {},
    idUser: null || localStorage.getItem('idUser'),
    accessToken: null || localStorage.getItem('accessToken'),
    refreshToken: null || localStorage.getItem('refreshToken')
  },
  mutations: {
    SET_USER (state, payload) {
      state.userLogin = payload
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
    },
    REMOVE_TOKEN (state) {
      localStorage.removeItem('idUser')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      state.idUser = null
      state.refreshToken = null
      state.accessToken = null
    },
    SET_CONTACT_LIST (state, payload) {
      state.contactList = payload
    },
    SET_PROFILE (state, payload) {
      state.profile = payload
    }
  },
  actions: {
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL_API}/users/login`, payload)
          .then(res => {
            const { result } = res.data
            localStorage.setItem('accessToken', result.accessToken)
            localStorage.setItem('refreshToken', result.refreshToken)
            localStorage.setItem('idUser', result.id)
            context.commit('SET_USER', result)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL_API}/users/register`, payload)
          .then(res => {
            const { result } = res.data
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getUsersList (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL_API}/users/getFriend/${localStorage.getItem('idUser')}`)
          .then(res => {
            console.log(res.data.result)
            const result = res.data.result
            context.commit('SET_CONTACT_LIST', result)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getProfile (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL_API}/users/${localStorage.getItem('idUser')}`)
          .then(res => {
            console.log(res.data.result)
            const result = res.data.result
            context.commit('SET_PROFILE', result)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateUserProfile (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL_API}/users/photoProfile/${payload.idUser}`, payload.formData)
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: 'Update Photo Profile Success',
              showConfirmButton: false,
              timer: 1500
            })
            resolve(res)
            router.push('/')
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Gagal Upload Photo Profile',
              showConfirmButton: false,
              timer: 1500
            })
            reject(err)
          })
      })
    },
    updatePhoneNumber (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL_API}/users/phonenumber/${payload.idUser}`, payload)
          .then(res => {
            console.log(payload)
            Swal.fire({
              icon: 'success',
              title: 'Phone number has been updated',
              showConfirmButton: false,
              timer: 1500
            })
            router.push('/')
          })
          .catch(err => {
            console.log(payload)
            Swal.fire({
              icon: 'error',
              title: 'Failed to update phone number',
              showConfirmButton: false,
              timer: 1500
            })
            reject(err)
          })
      })
    },
    bio (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL_API}/users/bio/${payload.idUser}`, payload)
          .then(res => {
            console.log(payload)
            Swal.fire({
              icon: 'success',
              title: 'Bio has been updated',
              showConfirmButton: false,
              timer: 1500
            })
            router.push('/')
          })
          .catch(err => {
            console.log(payload)
            Swal.fire({
              icon: 'error',
              title: 'Failed to update bio',
              showConfirmButton: false,
              timer: 1500
            })
            reject(err)
          })
      })
    },
    logout (context, payload) {
      context.commit('REMOVE_TOKEN')
    }
  },
  getters: {
    isLogin (state) {
      return state.accessToken !== null
    },
    getContactList (state) {
      return state.contactList
    },
    myProfile (state) {
      return state.profile
    }
  },
  modules: {}
})
