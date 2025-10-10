<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <router-view v-slot="{ Component }">
      <KeepAlive include="Home">
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>