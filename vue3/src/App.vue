<template>
  <div>
    Text: {{ text }}
    <br>
    <input type="text" v-model="text">
  </div>
</template>

<script setup lang="ts">
import { useDebouncedRef } from "@/custom-refs/useDebouncedRef"
const text = useDebouncedRef("")
</script>

<style lang="scss" scoped>

</style>
