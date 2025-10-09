<template>
    <div>
        <ExposeChild ref="comp" />
        <button @click="handleClick">调用子组件方法</button>
    </div>
  </template>
  
  <script setup>
    import ExposeChild from './ExposeChild.vue'
    import { ref } from 'vue'
    const comp = ref(null) // 可变对象 child
    const handleClick = () => {
      console.log(comp.value.childName)
      comp.value.someMethod()// 子组件提供父组件调用
    }
  </script>
  
  <style  scoped>
  
  </style>