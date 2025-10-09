<template>
    <div>
        Child
    </div>
  </template>
  
  <script setup>
    defineExpose({
        childName: '子组件名称',
        someMethod() {
            console.log('子组件方法调用')
        }
    })
  </script>
  
  <style  scoped>
  
  </style>