<template>
  <Suspense>
    <template #default>
      <CRUDComponent />
    </template>
    <template #fallback>
      <LoadingEffectVue/>
    </template>
  </Suspense>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import CRUDComponent from '@/components/CRUDComponent.vue'
import LoadingEffectVue from '@/components/LoadingEffect.vue';

export default defineComponent({
  components: { CRUDComponent, LoadingEffectVue },
  errorCaptured(error) {
    console.log("error", error)
    return false
  }
})
</script>
<style scoped lang="scss"></style>
