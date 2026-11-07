<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { introDone } from '@/composables/useIntro'

const PER_PAGE = 8

const images = ref(
    Array.from({ length: 20 }, (_, i) => ({
      title: `Image ${i + 1}`
    }))
)

const activeIndex = ref(null)
const page = ref(0)

// Already shown if the intro finished earlier (page switch), otherwise wait for it
const gridReady = ref(introDone.value)

watch(introDone, (done) => {
  if (done) gridReady.value = true
})

const pageCount = computed(() => Math.ceil(images.value.length / PER_PAGE))

// Photos on the current page, keeping their index in the full list
const visibleImages = computed(() =>
    images.value
        .slice(page.value * PER_PAGE, page.value * PER_PAGE + PER_PAGE)
        .map((image, i) => ({ ...image, index: page.value * PER_PAGE + i }))
)

/* Paging (manual only) */
function nextPage() {
  page.value = (page.value + 1) % pageCount.value
}

function prevPage() {
  page.value = (page.value - 1 + pageCount.value) % pageCount.value
}

function goToPage(n) {
  page.value = n
}

/* Lightbox (iterates over ALL images, not just the visible page) */
function openImage(index) {
  activeIndex.value = index
}

function closeImage() {
  if (activeIndex.value === null) return
  // Show the page that contains the photo the user ended on
  page.value = Math.floor(activeIndex.value / PER_PAGE)
  activeIndex.value = null
}

function nextImage() {
  activeIndex.value = (activeIndex.value + 1) % images.value.length
}

function prevImage() {
  activeIndex.value =
      (activeIndex.value - 1 + images.value.length) % images.value.length
}

function onKeydown(e) {
  if (activeIndex.value === null) return
  if (e.key === 'Escape') closeImage()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <main>
    <section v-if="gridReady" class="gallery">
      <button
          v-if="pageCount > 1"
          class="page-arrow prev"
          aria-label="Previous page"
          @click="prevPage"
      >&#10094;</button>

      <Transition name="grid" mode="out-in">
        <div :key="page" class="grid">
          <article
              v-for="(image, i) in visibleImages"
              :key="image.index"
              :style="{ '--i': i }"
              @click="openImage(image.index)"
          >
            <span class="article-title">{{ image.title }}</span>
          </article>
        </div>
      </Transition>

      <button
          v-if="pageCount > 1"
          class="page-arrow next"
          aria-label="Next page"
          @click="nextPage"
      >&#10095;</button>

      <div v-if="pageCount > 1" class="dots">
        <button
            v-for="n in pageCount"
            :key="n"
            class="dot"
            :class="{ 'is-active': page === n - 1 }"
            :aria-label="`Page ${n}`"
            @click="goToPage(n - 1)"
        ></button>
      </div>
    </section>

    <!-- Teleported so it always sits above the header, whatever the stacking contexts -->
    <Teleport to="body">
      <div v-if="activeIndex !== null" class="lightbox" @click.self="closeImage">
        <div class="lightbox-backdrop"></div>

        <button class="nav prev" @click.stop="prevImage">&#10094;</button>

        <figure class="lightbox-figure">
          <div class="lightbox-content">
            <span class="lightbox-title">{{ images[activeIndex].title }}</span>
          </div>
          <figcaption class="lightbox-caption">
            <span>{{ images[activeIndex].title }}</span>
            <span>{{ activeIndex + 1 }} / {{ images.length }}</span>
          </figcaption>
        </figure>

        <button class="nav next" @click.stop="nextImage">&#10095;</button>

        <button class="close" @click="closeImage">&times;</button>
      </div>
    </Teleport>
  </main>
</template>

<style scoped>
main {
  position: relative;
  flex: 1;
  min-height: 12rem; /* safety net: below this the page grows instead of squashing the grid */
  width: 100%;
}

.gallery {
  position: absolute;
  inset: 10%;
  container-type: size;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*
  4 columns x 2 rows of squares. The width follows from the available HEIGHT
  (2 rows + 1 gap), so the grid can never be taller than the gallery.
*/
.grid {
  /* Fade timing: photo 1 starts at 0s, photo 8 finishes at --fade-total */
  --fade-total: 2500ms;
  --fade-tile: 800ms;
  --gap: 1.5rem;

  /* 2 rows of squares + 1 gap -> the width follows from the available height */
  width: min(100cqw, calc(200cqh + var(--gap)));
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap);
}

article {
  background-color: #454967;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  animation: tile-in var(--fade-tile) ease forwards;
  /* Stagger so the 8th tile (i = 7) ends exactly at --fade-total */
  animation-delay: calc(var(--i) * (var(--fade-total) - var(--fade-tile)) / 7);
  transition: transform 0.3s ease;
}

@keyframes tile-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Page switch: the current grid fades out quickly, then the next one's tiles stagger in */
.grid-leave-active {
  transition: opacity 0.2s ease;
}

.grid-leave-to {
  opacity: 0;
}

.article-title {
  color: #ffffff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Page arrows */
.page-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #454967;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.page-arrow.prev {
  left: -3rem;
}

.page-arrow.next {
  right: -3rem;
}

/* Page indicators */
.dots {
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
}

.dot {
  width: 0.6rem;
  height: 0.6rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #454967;
  opacity: 0.3;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.dot.is-active {
  opacity: 1;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  overscroll-behavior: contain;
  touch-action: none;
}

.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.lightbox-figure {
  position: relative;
  z-index: 1;
  margin: 0;
  flex: 1;
  min-width: 0;
  max-width: 85vw;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lightbox-content {
  width: 100%;
  height: 75svh;
  background: #454967;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-title {
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

/* Small title line beneath the photo */
.lightbox-caption {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 0.8rem;
}

.nav {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
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

@media (hover: hover) {
  article:hover {
    transform: scale(1.02);
  }

  .page-arrow:hover {
    background: rgb(69 73 103 / 0.15);
  }

  .dot:hover {
    opacity: 1;
  }

  .nav:hover {
    background: rgba(255, 255, 255, 0.25);
  }
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

/* Narrow windows and tablets: still 4 columns, but tighter, with the arrows below the grid */
@media screen and (max-width: 800px) {
  .gallery {
    inset: 5% 5% 15%;
  }

  .grid {
    --gap: 1rem;
  }

  .article-title {
    font-size: 1.1rem;
  }

  /* The side margins are too narrow here, so the arrows go below the grid */
  .page-arrow {
    top: auto;
    bottom: -3.25rem;
    transform: none;
  }

  .page-arrow.prev {
    left: 0;
  }

  .page-arrow.next {
    right: 0;
  }
}

/* Phones: 2 columns x 4 rows, still 8 photos */
@media screen and (max-width: 500px) {
  main {
    min-height: 30rem;
  }

  /* 4 rows + 3 gaps of height -> width of 2 columns + 1 gap */
  .grid {
    width: min(100cqw, calc(50cqh - var(--gap) / 2));
    grid-template-columns: repeat(2, 1fr);
  }

  .article-title {
    font-size: 1rem;
  }

  .nav {
    width: 2rem;
    height: 2rem;
    font-size: 1.25rem;
    margin: 0 0.5rem;
  }

  .lightbox-figure {
    max-width: 80vw;
  }
}

@media (prefers-reduced-motion: reduce) {
  article {
    animation: none;
    opacity: 1;
  }

  .grid-leave-active {
    transition: none;
  }
}
</style>