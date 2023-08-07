<template>
  <div class="about-container">
    <!-- <div class="locales-btn" @click="changeLocales">
      {{ lang === 'en' ? '中文' : 'en' }}
    </div> -->
    <div class="logo-warpper">
      <!-- <img class="logo" src="../../assets/img/logo.png" /> -->
      <span>Login</span>
    </div>
    <div class="login-warpper">
      <van-form @submit="onSubmit">
        <van-cell-group inset :border="false">
          <van-field
            v-model="account"
            :name="$t('login.account')"
            label=""
            :left-icon="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgB7ZtfUhpBEMYbRH3ScAM3JzA5gYv/qnwzJwiewNxAOIHJCSQngDxZpWWBNzA32NyAZxTI95HBoiI77O70rCzFr4oaXHBqv9nu3p7uRWTNmpWiJDlwe3sbVCqV81KpdIDXJxwKzEf98Xj8hGMRxl/Hx8cd8YxXwff39yHEXOEVJvyXaDgcNk9PT1viCW+CHx4erjF8k2xEg8GgdnZ2Foky6oLb7XZ1Z2ena0zXBZr7hbaZl0UZJbGkinnadAtRRFUwzVhJ7CvlcrnNoCdKqAm+u7urS3aftVHd3t6+ESXUBG9sbFyJJ+DLoZZpqwg2JxOIR7QWVEUw/LYunuFV7na7VXFES/CB5MDz8/O5OOIs2Kx6IDmAiO18B3AW/PLyonobsgFL+iCOqCcey46zYASTvhQIZ8Gbm5u5CR6NRn/EEWfBtVotwpCLaPjwkzii4sPcvEsOIPlYGsEt8c+jsSYnVASfnJz0YG498Qj8tyEKqN2WWJoRf7S4qKKAmmCeEEz7hyjDAh8yLLXFVE08EFQaGpF0Fsz3RcN3p6gKxon1cYI1DdGYow+/xZQ13QUUT6Dc08CQaQ/LBdO+sq9zi0ewkwoQzGjmX5N8n1cVcaB5dHT0XTyRS+eBwmGe59zEQ1SAQ/vmI6aKFMmA19GKxGvWKMDaMbsO4gHOrVWbzuzDpqUS4u2lKb5PxBp/bLr6I+ff3d29lH+17ulCclfWQTz4mXX+TIJZdEeScT1zIm+gcJ4YonQvTVOMJV9kViwKzgqdOz+KehdpG26pBNOssOG/SdH+nMAeMIZHjJHpBU/2z3jP/lEVf9NC9sy8ad2igdtY4tQzsWCK3dra6kpOFcqUJBadSPCSi52SSHSiXJpmLMstljSS9J8WCmaASuuz7wWC3cIu40LBPruCHghM2zYWq2Dzz4EUiEqlYt2oWAXDRBLtcpaJRb3kWMGMzEXx3TmEcR/ECkZkzq1Jpg3iTmz71mbSoRQUW/PcJnhfCgzy7GDecZvgj1Js5rpkrGAErD1ZQVa2IW5qZ2+wCS5Uo/t/4mrjNsE+e0Veodi4h1JjBbM2jEyLgetRCgLr2hiah4eHn2O/IwkwD3rXkxbU3wFelA4uUIvtHtsXU5V4TEE9xNs6Xrk8jGaBInuDwaCVpq6VuWrJTIbPaOGq87cMHPeR4Xgp05oWzG9TG+shdewtupKxc4ki00WAadESuPkIZm4PVbEX6CiAwiKOptgXIWN68vFTgDVrVoS/D2xyPcZFIu8AAAAASUVORK5CYII='"
            :placeholder="$t('login.account')"
            :rules="[{ required: true, message: $t('login.accountRules') }]"
          />
          <van-field
            v-model="password"
            :name="$t('login.password')"
            label=""
            :left-icon="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPVSURBVHgB7ZtfUuJAEMYbRH3SwhtkT6CeAOK/Kp9WT6CcYN0TCCfY9QTiCWCfrFIxcALZG+AJNvumluh+7Q6aQiZMZiYhofKrSgnJJJmvuumZ6WmJcnLmigLFyOXlpVMqlQ4KhUIFxwZOOaNrr6+vffwZ4G/v+fm5vb+/P6AEiEXw9fV1FQJPcVRV74HwLo7G7u5ul2LEquBWq1VeXV09x8cD0qf59PTUiMvi1gSz+y4tLXkUcFsDBhDtxiHaimAh9g4fy2QPfzgcunt7e32ySJEMCVhWRew9jh6O3wptywsLCy1+PlmkRIYsLi7yb9YJadJ7eXmpI1r3Xdf1gxdubm44gp/gY0Vyr7O8vMzPd8kSRi59dXV1DCucT3xwoeBDaG1nZ6c97TmdTueYozqitDPpOly7BtdukgWMXBpiTyedR+cHODZVxDLb29tNtGcr+lHeo4O2YB5rSeLKPJ7CfQcUAW4PjziUXHbE+4zRFgyLHEsuNdlipIGYdLQl7zMZ298xcen1SSdhpQsyAPefTToPwV/JAlpBy/O8Mjr2Z8IlH9ZdI0MQxPjZn4a5YrG4Nh7po6JrYdmYqzK+TkUsLD7x8PBgPLExnnhkjVzwvJMLnndywfOO0sRD5KiO6GPuXBZJuXF82RgaqVP/n/1pzOW8V6ANJwB/qS5Q3u8Lu8g5qpWVlVaUZFzSoG/dx8fHmmo6KNSlIdZLs1gGVq4iSdBSbS8VzIt7idumDojewM+urtJWKhgT9W+UIZAkqKi0kwrOinVHsGurtMvH4bjh5B7NkMQE87iJpIG7tbW1hvjwhSQJu7hJTDBPGkYbZZyww3ejVJAuiQmGde+D3yF4vi2cFsIEzzS4aKDUX6lguNxfyhAcFFXahVnY6jZl3IzHCBlhFs6UYNX+hlm4S9miq9JIKliMmVkJXL5qMUzosGRzcjC+msFs64jsoZz1CK0AgOA2op+VZSKvZrDjf8dpGa7bIjvFL29E2cCbmtO6vb31VJdeM6KHDbyqauOpM63hcNigFIP+nURpP1UwBwNY+IzSSTNqWZPSXBoBp646k0kK7g8CX2TvU94QR1JvA8LvKCVA7CaWmZEnR8qrJeE6NUoH33XEMpGWh6JYZdZBrIF+/CRNtGo8Op0OR8YflDw13QqhEdqVeJ7nOYjenqx6ziai0O1Q142DaGc8OC/F1XYJDFln/B4bYhkr5cNsbUwA6mKH0RZvRam2K+StVsSPhGPIqOi4uihIvcDRtF0n/f4Oigkxbld5Hg4hvJ+8js/BPV/OULztJ+NaHyL7cf+/Q07OHPIPOXiBFLnaWfMAAAAASUVORK5CYII='"
            :placeholder="$t('login.password')"
            :rules="[{ required: true, message: $t('login.passwordRules') }]"
            :right-icon="passwordStatus ? 'eye-o' : 'closed-eye'"
            :type="!passwordStatus ? 'password' : 'text'"
            @click-right-icon="passwordStatus = !passwordStatus"
          />
        </van-cell-group>
        <div style="margin-top: 55px">
          <van-button round block type="primary" native-type="submit">
            {{ $t('login.submit') }}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script setup>
import { useUsersStore } from '@/store/login.js'
import { inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import {setLanguage} from '@/locales/index'
const store = useUsersStore()
const router = useRouter()

const account = ref('')
const password = ref('')
const passwordStatus = ref(false)

const lang = ref('en')
onMounted(() => {
  lang.value =  localStorage.getItem('language')
})
// 登录
const onSubmit = async () => {
  await store._login({ account: account.value, password: password.value })
  router.push('/')
}
// 语言切换
const changeLocales = () => {
  const _lang = lang.value === 'en' ? 'zh' : 'en'
  lang.value = _lang
  setLanguage(_lang)
  window.location.reload()
}


</script>
<style>
.login-warpper .van-cell {
  border: 1px solid #f1f2f6;
  border-radius: 68px;
  margin-bottom: 10px;
}
.login-warpper .van-field__left-icon .van-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
<style lang="scss">
.about-container {
  /* 你的命名空间 */
  // background: ('/assets/logo.png');
  background: url('../../assets/img/loginbg.png') no-repeat;
  background-size: 100% auto;
  height: 100vh;
  box-sizing: border-box;
  .locales-btn {
    border: 1px solid #cccccc;
    font-size: 12px;
    border-radius: 10px;
    padding: 8px 10px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .logo-warpper {
    text-align: center;
    margin: 0 auto;
    padding-top: 87px;
    .logo {
      width: 142px;
      height: auto;
    }
    .title {
      font-size: 7vw;
      color: #fff;
      margin-top: 50px;
    }
  }
  .login-warpper {
    padding: 50px 15px 43px 15px;
    width: 330px;
    margin: 23px auto;
    background: #ffffff;
    border-radius: 18px;
    box-sizing: border-box;
  }
}
</style>
  