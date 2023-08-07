<template>
  <div>
    <van-nav-bar :title="title" :left-text="$t('headerBar.back')" left-arrow @click-left="onClickLeft">
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>
<script setup>
defineProps({
  title: String
})
// 抛出事件，供父组件使用
const emit = defineEmits(["goBack"])
const onClickLeft = () => {
  emit("goBack")
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.navBarBtn {
  color: #ffffff;
}
</style>
