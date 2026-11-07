<script setup>
import { ref, watch } from 'vue'
import { introDone } from '@/composables/useIntro'

// Already visible if the intro finished earlier (page switch), otherwise wait for it
const contentVisible = ref(introDone.value)

watch(introDone, (done) => {
  if (done) contentVisible.value = true
})
</script>

<template>
  <main>
    <div class="content" :class="{ 'is-visible': contentVisible }">
      <div class="info">
        <div class="left">
          <div>
            <p><span>D</span>esk <span>TOP</span> Publishing</p>
            <a href="https://www.google.com/maps/place/dtop+-+grafische+vormgeving/@51.1300276,5.6309022,17z/data=!3m1!4b1!4m6!3m5!1s0x47c0d3d01c8dcc6d:0x34037950cc182ae2!8m2!3d51.1300276!4d5.6334771!16s%2Fg%2F11tg7wvg19?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D" target="_blank">Hovestraat 13 — 3960 Bree</a>
          </div>
          <div class="contact">
            <a href="mailto:web@dtop.be">web@dtop.be</a>
            <p>+32 89 76 75 65</p>
            <br>
            <p><i>Ma t.e.m. Vr</i></p>
            <p><i>9-12u / 13-18u</i></p>
            <p><i>Enkel op afspraak</i></p>
          </div>
        </div>
        <div class="right">
          <p>Met meer dan 20 jaar ervaring staan we in voor persoonlijke begeleiding, degelijk advies en kwaliteitsvol grafisch werk.</p>
          <p>Van naamkaartjes tot spandoeken, bij ons kunt u terecht voor al uw grafische wensen. We denken graag met u mee en helpen uw ideeën omzetten in een sterk en verzorgd ontwerp, met een nieuwe of bestaande huisstijl.</p>
          <p class="facebook">Ook zot van reclame? Of even tijd voor wat amusement? Op onze <a href="https://www.facebook.com/dtopbree">Facebookpagina</a> vindt u een collectie grappige, interessante of gevatte reclamefilmpjes...</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  flex: 1;
  min-height: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 4rem 2rem 2rem;
  color: #454967;
}

.content {
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.info {
  display: flex;
}

.left {
  width: 60%;
}

.right {
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.facebook {
  margin-top: 1rem;
  font-style: italic;
}

.left span {
  font-weight: bold;
}

.contact {
  margin-top: 1rem;
  color: rgb(69 73 103 / 0.60);
}

.contact a {
  color: rgb(69 73 103 / 0.60);
  margin-left: -0.25rem;
}

a {
  margin-left: -0.25rem;
}

@media (hover: hover) {
  .contact a:hover {
    color: white;
  }
}

@media (prefers-reduced-motion: reduce) {
  .content {
    transition: none;
    transform: none;
  }
}

@media screen and (max-width: 800px) {
  .info {
    flex-direction: column;
    gap: 2rem;
  }

  .left,
  .right {
    width: 70%;
  }
}

@media screen and (max-width: 450px) {
  main {
    padding: 4rem 1rem 1rem;
  }

  .info {
    gap: 1.5rem;
  }

  .right {
    margin-top: 1rem;
  }
}
</style>