<template>
    <div>
        {{ count }}
        <!-- @ vue事件绑定 vue 文档特别好 -->
        <EmitChild @myClick="onMyClick" />
    </div>
  </template>
  
  <script setup>
  import EmitChild from './EmitChild.vue'
  import { ref } from 'vue'
  const count = ref(0)
  const onMyClick = (e) => {
    count.value++
    console.log(e)
  }
  </script>
  
  <style  scoped>
  
  </style>