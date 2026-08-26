<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

const images = ref(
    Array.from({ length: 20 }, (_, i) => ({
      title: `Image ${i + 1}`
    }))
)

const activeIndex = ref(null)
const articleRefs = ref([])
let observer = null

function setArticleRef(el, index) {
  if (el) articleRefs.value[index] = el
}

function openImage(index) {
  activeIndex.value = index
}

function closeImage() {
  activeIndex.value = null
}

function nextImage() {
  activeIndex.value = (activeIndex.value + 1) % images.value.length
}

function prevImage() {
  activeIndex.value =
      (activeIndex.value - 1 + images.value.length) % images.value.length
}

watch(activeIndex, (newValue) => {
  document.body.style.overflow = newValue !== null ? 'hidden' : ''
})

onMounted(async () => {
  await nextTick()

  observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -20% 0px',
        threshold: 0
      }
  )

  articleRefs.value.forEach((el) => {
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  document.body.style.overflow = ''
  if (observer) observer.disconnect()
})
</script>

<template>
  <main>
    <section>
      <article
          v-for="(image, index) in images"
          :key="index"
          :ref="(el) => setArticleRef(el, index)"
          @click="openImage(index)"
      >
        <span class="article-title">{{ image.title }}</span>
      </article>
    </section>

    <div v-if="activeIndex !== null" class="lightbox" @click.self="closeImage">
      <div class="lightbox-backdrop"></div>

      <button class="nav prev" @click.stop="prevImage">&#10094;</button>

      <div class="lightbox-content">
        <span class="lightbox-title">{{ images[activeIndex].title }}</span>
      </div>

      <button class="nav next" @click.stop="nextImage">&#10095;</button>

      <button class="close" @click="closeImage">&times;</button>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  position: relative;
}

section {
  padding: 20rem 0 14rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
}

article {
  aspect-ratio: 1;
  width: calc(25% - 3rem / 4);
  background: #454967;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

article.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.article-title {
  color: #ffffff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.lightbox-content {
  position: relative;
  width: 85vw;
  height: 85vh;
  background: #454967;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.lightbox-title {
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.nav {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0);
  border: none;
  color: #ffffff;
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.nav:hover {
  background: rgba(255, 255, 255, 0.25);
}

.close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2.5rem;
  line-height: 1;
  cursor: pointer;
}
</style>