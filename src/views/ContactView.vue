<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})
</script>

<template>
  <main>
    <section>
      <h1 :class="{ 'is-visible': isVisible }">Neem gerust contact met ons op</h1>
      <div class="grid">
        <article
            v-for="n in 4"
            :key="n"
            :class="{ 'is-visible': isVisible }"
            :style="{ transitionDelay: `${n * 0.1}s` }"
        >
          <template v-if="n === 1">
            <h3>U kan ons contacteren via</h3>
            <a href="mailto:web@dtop.be">web@dtop.be</a>
            <p>+32 89 76 75 65</p>
          </template>

          <template v-else-if="n === 2">
            <h3>Telefonisch enkel bereikbaar</h3>
            <p>Ma – Vr</p>
            <p>9-12u / 13-18u</p>
          </template>

          <template v-else-if="n === 3">
            <h3>Alleen op afspraak</h3>
            <p>
              <a href="https://www.google.com/maps/place/dtop+-+grafische+vormgeving/@51.1300276,5.6309022,17z/data=!3m1!4b1!4m6!3m5!1s0x47c0d3d01c8dcc6d:0x34037950cc182ae2!8m2!3d51.1300276!4d5.6334771!16s%2Fg%2F11tg7wvg19?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D" target="_blank">
              Hovestraat 13 <br />
              3960 Bree</a>
            </p>
          </template>

          <template v-else>
            <h3>Ook zot van reclame?</h3>
            <p>
              Bezoek zeker onze
              <a href="https://www.facebook.com/dtopbree">Facebookpagina</a> waar u een collectie
              grappige, interessante en gevatte reclamefilmpjes vindt!
            </p>
          </template>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  flex: 1;
}

h1 {
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

h1.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-self: flex-end;
  gap: 1rem;
  width: 100%;
}

article {
  width: calc(25% - 3rem / 4);
  aspect-ratio: 1.5/1;
  background: #454967;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

article.is-visible {
  opacity: 1;
  transform: translateY(0);
}

article p,
article a,
article h3 {
  color: white;
  width: fit-content;
}

article a {
  font-style: italic;
}

h3 {
  margin-bottom: 1rem;
}
</style>