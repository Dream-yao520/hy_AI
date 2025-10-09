<template>
    <div>
        abc
    </div>
  </template>
  
  <script setup>
    import mitter from '../mitt.js'
    // 订阅者
    mitter.on('handleChange', () => {
      console.log('MittB 组件收到了 handleChange 事件')
    })
  </script>
  
  <style scoped>
  
  </style>