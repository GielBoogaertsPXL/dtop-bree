<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const sectionRefs = ref([])
const itemRefs = ref([])
let observer = null

function setSectionRef(el, index) {
  if (el) sectionRefs.value[index] = el
}

function setItemRef(el, index) {
  if (el) itemRefs.value[index] = el
}

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
        // Trigger as soon as an element enters the top 80% of the screen
        rootMargin: '0px 0px -20% 0px',
        threshold: 0
      }
  )

  sectionRefs.value.forEach((el) => {
    if (el) observer.observe(el)
  })

  itemRefs.value.forEach((el) => {
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <main>
    <section class="hero" :ref="(el) => setSectionRef(el, 0)">
      <div class="container">
        <img src="/DTOP_logo.png" alt="DTOP Logo" />
        <h1>
          <span>Welkom bij</span> <br />
          <span class="bold big">D'TOP</span> <br />
          <span class="bold italic">grafische vormgeving</span>
        </h1>
      </div>
    </section>
    <section class="paragraph" :ref="(el) => setSectionRef(el, 1)">
      <p>
        Al meer dan 20 jaar staat <span class="bold">D</span>(esk)<span class="bold">TOP</span>
        (Publishing) in Bree grafisch tot uw dienst, met degelijke begeleiding en deskundig advies.
      </p>
    </section>
    <section class="service" :ref="(el) => setSectionRef(el, 2)">
      <div class="item" :ref="(el) => setItemRef(el, 0)">
        <p>Onze diensten</p>
        <div class="text">
          <h2>
            U kan bij ons terecht voor alles van druk, vertrekkende vanuit een bestaande huisstijl
            of startend met een nieuwe.
          </h2>
          <p>
            Briefpapier, enveloppen, naamkaartjes, folders, flyers, brochures, menukaarten,
            placemats, affiches, spandoeken, advertenties, stickers, inkomkaarten en nog veel
            meer...
          </p>
        </div>
      </div>
      <div class="item" :ref="(el) => setItemRef(el, 1)">
        <p>Ervaring</p>
        <div class="text">
          <h2>
            Met meer dan 20 jaar ervaring bieden wij kwalitatief werk aan met begeleiding van begin
            tot einde.
          </h2>
          <p>
            Door onze jarenlange ervaring kennen we de mogelijkheden van grafische vormgeving en
            drukwerk door en door. We staan u graag bij met deskundig advies en zorgen voor een
            kwalitatief eindresultaat.
          </p>
        </div>
      </div>
      <div class="item" :ref="(el) => setItemRef(el, 2)">
        <p>Persoonlijke aanpak</p>
        <div class="text">
          <h2>
            We begeleiden elk project persoonlijk, van het eerste idee tot het afgewerkte resultaat.
          </h2>
          <p>
            We denken met u mee en begeleiden elk project persoonlijk, van het eerste ontwerp tot
            het afgewerkte drukwerk. Zo zorgen we samen voor een resultaat dat perfect aansluit bij
            uw wensen.
          </p>
        </div>
      </div>
    </section>
    <section class="curious" :ref="(el) => setSectionRef(el, 3)">
      <h2>Interesse?</h2>
      <p>
        Neem zeker vrijblijvend contact met ons op.
      </p>
      <span>
        <a href="mailto:web@dtop.be">web@dtop.be</a> <br />
        <span>+32 89 76 75 65</span><span class="italic"> (enkel 9-12u / 13-17u)</span>
      </span>
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

.hero,
.paragraph,
.service,
.curious {
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.hero.is-visible,
.paragraph.is-visible,
.service.is-visible,
.curious.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.item {
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 6rem);
  background-image: url('/DTOP_achtergrond.png');
}

.container {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 2rem 1rem;
  width: 100%;
}

h1 {
  font-size: 3rem;
  font-weight: normal;
}

.paragraph {
  height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2.5rem;
}

.paragraph p {
  width: 75%;
}

.bold {
  font-weight: bold;
}

.big {
  font-size: 4.5rem;
}

.italic {
  font-style: italic;
}

.service {
  background: #454967;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10rem;
  padding: 8rem 4rem 12rem;
}

.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.item p {
  color: white;
  font-size: 1.5rem;
  font-weight: lighter;
}

.text {
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 0.1rem solid white;
  padding-bottom: 2.5rem;
  width: 50%;
  margin-right: 3vw;
}

.text h2 {
  color: white;
  font-size: 2rem;
}

.text p {
  font-size: 1.2rem;
}

.curious {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 8rem 0 10rem 4rem;
  margin: 8rem 0 8rem 0;
}

.curious h2 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.curious p {
  font-size: 1.5rem;
}
</style>