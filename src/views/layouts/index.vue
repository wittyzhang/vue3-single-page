<template>
  <div class="app-container">
    <div class="layout-content">
      <router-view v-if="$route.meta.keepAlive"  v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
      <router-view v-else></router-view>
    </div>
  </div>
</template>
  
<script setup>

</script>
  