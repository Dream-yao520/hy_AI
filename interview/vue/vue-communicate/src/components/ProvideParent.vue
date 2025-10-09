<template>
    <div>
        <ProvideChild />
    </div>  
  </template>
  
  <script setup>
    import ProvideChild from './ProvideChild.vue'
    import {provide} from 'vue' // 向外提供
    provide('name', 'provide parent')
  </script>
  
  <style scoped>
  
  </style>