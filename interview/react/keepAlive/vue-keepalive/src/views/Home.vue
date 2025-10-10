<template>
    <div>
        <h2>Home</h2>
        <input type="text" v-model="text" placeholder="请输入">
        <p>输入内容：{{text}}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
    import { onActivated,onDeactivated } from 'vue'

  const text = ref('')
  // active 切换？
    onActivated(() => {
    console.log('activated')
    })
    onDeactivated(() => {
    console.log('deactivated')
    })
  </script>
  
  <style scoped>
  
  </style>