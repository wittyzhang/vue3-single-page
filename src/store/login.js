import { defineStore } from 'pinia'
import { showToast } from 'vant'
// import API from '@/api/module/user.js'

export const useUsersStore = defineStore('userInfos', {
  persist: true, // 开启持久化
  state: () => {
    return {
      userInfo: '',
      token: '',
      roleCodes: [],
      roles: []
    }
  },
  getters: {},
  actions: {
    async _login(obj) {
      try {
        await 
        setTimeout(() => {
          this.token = 'token'
          this.userInfo = { username: 'userName' }
        })
      } catch (error) {
        // showToast(error)
        return error
      }
    },
    async _loginOut() {
      try {
        // await API.loginout()
        // .then(() => {
        //   this._reset()
        // })
        await setTimeout(()=> {
          this._reset()
        })
      } catch (error) {
        showToast(error)
        return error
      }
    },
    _reset() {
      this.token = ''
      this.userInfo = {}
      this.roles = []
      this.roleCodes = []
    }
  }
})
