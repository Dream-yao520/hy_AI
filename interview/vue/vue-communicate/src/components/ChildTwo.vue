<template>
    <div>
        {{msg1}}
        {{msg2}}
    </div>
  </template>
  
  <script setup>
  defineProps({
    msg1:{
        type:String,
        default:'默认值1'
    },
    msg2:{
        type:String,
        default:'默认值2'
    }
  })
  </script>
  
  <style  scoped>
  
  </style>