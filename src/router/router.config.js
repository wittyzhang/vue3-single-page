export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      name: 'login',
      title: '登录',
      keepAlive: false
    }
  },
  {
    path: '/',
    component: () => import('@/views/layouts/index.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: 'mySpace/list',
        name: 'mySpaceList',
        component: () => import('@/views/mySpace/list.vue'),
        meta: { title: '我的列表', keepAlive: true }
      },
      {
        path: 'mySpace/detail',
        name: 'mySpaceDetail',
        component: () => import('@/views/mySpace/detail.vue'),
        meta: { title: '订单详情', keepAlive: false }
      },
      {
        path: 'mySpace/addNotes',
        name: 'addNotes',
        component: () => import('@/views/mySpace/addNotes.vue'),
        meta: { title: '添加笔记', keepAlive: false }
      }
    ]
  },
  {
    path: '/order',
    name: 'payInfo',
    component: () => import('@/views/pay/index.vue'),
    meta: {
      title: '支付信息',
      keepAlive: false
    }
  },
  {
    path: '/part',
    name: 'payPart',
    component: () => import('@/views/pay/part.vue'),
    meta: {
      title: '部分还款',
      keepAlive: false
    }
  },
  {
    path: '/cashier',
    name: 'cashier',
    component: () => import('@/views/pay/pay.vue'),
    meta: {
      title: '支付',
      keepAlive: false
    }
  }
]
