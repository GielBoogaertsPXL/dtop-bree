<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { introDone, startIntro } from '@/composables/useIntro'

onMounted(startIntro)
</script>

<template>
  <div id="app">
    <!-- Lives outside the router, so it never re-animates when switching pages -->
    <div class="app-background" :class="{ 'is-dimmed': introDone }"></div>

    <AppHeader class="app-header" />

    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>

    <AppFooter class="app-footer" />
  </div>
</template>

<style scoped>
/* Exactly one screen tall: header + page (fills the rest) + footer */
#app {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100svh;
}

.app-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: url("/DTOP_achtergrond.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 1;
  transition: opacity 0.8s ease;
}

.app-background.is-dimmed {
  opacity: 0.2;
}

.app-header {
  z-index: 900;
}

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
  .app-background,
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>