import { createRouter, createWebHistory } from 'vue-router'
import {constantRouterMap} from './router.config'
import { useUsersStore } from '@/store/login'
import { showToast } from 'vant'

const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  const store = useUsersStore()
  if (to.meta.name === 'login') {
    if (store.token) {
      next('/')
    } else {
      next()
    }
  } else {
    if (!store.token) {
      //token过期
      next('/login')
    } else {
      next()
    }
  }
})
router.afterEach((to, from, next) => {
  //遍历meta改变title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  window.scrollTo(0, 0)
})
export default router
