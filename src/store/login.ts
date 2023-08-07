import { defineStore } from 'pinia'
import { showToast } from 'vant'
import API from '@/api/module/user.js'

export const useUsersStore = defineStore('userInfos', {
  persist: true, // 开启持久化
  state: () => {
    return {
      userInfo: {} as userInfo,
      token: '',
      roleCodes: [],
      roles: []
    }
  },
  getters: {},
  actions: {
    async _login(obj:{}) {
      try {
        await API.login(obj).then((res) => {
          const {
            token,
            username,
            id,
            avart,
            isMch,
            operationList,
            mchId,
            roleCodes,
            userCode
          } = res.data
          if (operationList && operationList.length > 0) {
            this.token = token
            this.roles = operationList
            this.roleCodes = roleCodes
            this.userInfo = { username, id, avart, isMch, mchId, userCode }
          } else {
            this._reset()
          }
        })
      } catch (error) {
        // showToast(error)
        return error
      }
    },
    async _loginOut() {
      try {
        await API.loginout()
        .then(() => {
          this._reset()
        })
      } catch (error) {
        // showToast(error)
        return error
      }
    }, 
    _reset() {
      this.token = ''
      this.userInfo = {} as userInfo
      this.roles = []
      this.roleCodes = []
    }
  }
})

interface userInfo {
  username: string
  id: number,
  mchId: number,
  avart: any,
  isMch: any,
  userCode: String
}
