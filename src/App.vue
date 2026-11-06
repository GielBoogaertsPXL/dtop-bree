<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

// Reset scroll once the old page is gone, so it doesn't jump to the top mid-fade
function resetScroll() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}
</script>

<template>
  <div id="app">
    <AppHeader class="app-header" />

    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in" @after-leave="resetScroll">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>

    <AppFooter class="app-footer" />
  </div>
</template>

<style scoped>
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

.app-header {
  z-index: 900;
}

/* Keeps the footer at the bottom while the page is briefly unmounted */
.app-footer {
  margin-top: auto;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>