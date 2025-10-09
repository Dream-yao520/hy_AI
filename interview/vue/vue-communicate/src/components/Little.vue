<template>
    <div>
        {{ (name) }}
    </div>
  </template>
  
  <script setup>
    import {inject} from 'vue' // 向内注入
    const name = inject('name')
  </script>
  
  <style scoped>
  
  </style>