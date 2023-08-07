<template>
  <div class="index-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <section class="top-warpper">
        <div class="userInfo">{{ `Hello, ${userName}!` }}</div>
        <div class="tip">
          {{ $t('message.welcome', [Message]) }}
        </div>
      </section>
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUsersStore } from '@/store/login'
import { useRouter } from 'vue-router'

const store = useUsersStore()
const router = useRouter()
console.log(store)

const userName = ref('')
const refreshing = ref(false)
const Message = ref('')

onMounted(() => {
  userName.value = store.userInfo.username
  onLoad()
})

const onLoad = () => {
  if (refreshing.value) {
    refreshing.value = false
  }
  setTimeout(() => {
    Message.value = 'Demo'
  })
}
const onRefresh = () => {
  onLoad()
}
const loginOut = async () => {
  await store._loginOut()
  router.push('/login')
}
</script>
<style lang="scss" scoped>
.index-container {
  background-size: 100% auto;
  height: 100%;
  .top-warpper {
    margin: 0 auto;
    padding: 25px 20px 0;
    font-size: 28px;
    background: $primary-color;
    background-size: cover;
    height: 214px;
    border-radius: 0 0 40px 40px;
    .logobox {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      .flex5 {
        flex: 2 1 0%;
        text-align: center;
        margin-right: 5px;
      }
      .flex1 {
        flex: 1;
        text-align: center;
        margin-right: 5px;
        span {
          background: $primary-color;
          color: #ffffff;
          border-radius: 32px;
          white-space: nowrap;
          font-size: 12px;
          padding: 10px 15px;
        }
      }
      .logo {
        width: 100%;
        display: grid;
        height: auto;
      }
      .txtRight {
        text-align: right;
      }
      .exitBtn {
        width: 33px;
        height: 33px;
        img {
          width: 100%;
        }
      }
    }
    .tip {
      font-size: 15px;
      margin-top: 7px;
      margin-left: 10px;
      color: rgba(255, 255, 255, 0.5);
    }
    .userInfo {
      color: rgba(255, 255, 255, 0.85);
      font-size: 22px;
      margin-left: 10px;
      margin-top: 40px;
    }
  }
  .total-box {
    background: #ffffff;
    border-radius: 12px;
    width: 90%;
    // box-shadow: 0 3px 15px #ccc;
    // -webkit-box-shadow: 0 3px 15px #ccc;
    margin: -60px auto 20px auto;
    text-align: center;
    box-sizing: border-box;
    padding-top: 25px;
    .value {
      font-size: 24px;
      margin-bottom: 3px;
      font-weight: 700;
    }
    .text {
      font-size: 14px;
      margin-bottom: 20px;
      color: $gray-color;
      font-weight: 500;
    }
  }
  .van-cell-group {
    margin-bottom: 30px;
    // box-shadow: 0 3px 15px #ccc;
    // -webkit-box-shadow: 0 3px 15px #ccc;
  }
}
</style>
  