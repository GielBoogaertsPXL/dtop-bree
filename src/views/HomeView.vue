<script setup>
import {ref, onMounted, onUnmounted} from 'vue'

const mainRef = ref(null)
const heroRef = ref(null)
const textRef = ref(null)

let lastWidth = 0

const resizeText = async () => {
  if (!heroRef.value || !textRef.value) return

  const containerWidth = heroRef.value.clientWidth
  if (containerWidth === lastWidth) return
  lastWidth = containerWidth

  await document.fonts.ready

  textRef.value.style.fontSize = '100px'
  const textWidth = textRef.value.scrollWidth
  if (textWidth === 0) return

  textRef.value.style.fontSize = `${(containerWidth / textWidth) * 100 * 1.025}px`
}

let resizeObserver = null
let fadeObserver = null

onMounted(() => {
  resizeText()

  if (window.ResizeObserver && heroRef.value) {
    resizeObserver = new ResizeObserver(() => resizeText())
    resizeObserver.observe(heroRef.value)
  } else {
    window.addEventListener('resize', resizeText)
  }

  fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            fadeObserver.unobserve(entry.target)
          }
        })
      },
      {rootMargin: '0px 0px -10% 0px', threshold: 0}
  )

  mainRef.value
      .querySelectorAll('.fade-in')
      .forEach((el) => fadeObserver.observe(el))
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  } else {
    window.removeEventListener('resize', resizeText)
  }

  if (fadeObserver) fadeObserver.disconnect()
})
</script>

<template>
  <main ref="mainRef">
    <section ref="heroRef" class="hero">
      <span ref="textRef">D'TOP</span>
    </section>
    <section class="middle">
      <div class="info">
        <div class="left fade-in">
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
        <div class="right fade-in" style="--delay: 0.15s">
          <p>Met meer dan 20 jaar ervaring staan we in voor persoonlijke begeleiding, degelijk advies en kwaliteitsvol grafisch werk.</p>
          <p>Van naamkaartjes tot spandoeken, bij ons kunt u terecht voor al uw grafische wensen. We denken graag met u mee en helpen uw ideeën omzetten in een sterk en verzorgd ontwerp, met een nieuwe of bestaande huisstijl.</p>
          <p class="facebook">Ook zot van reclame? Of even tijd voor wat amusement? Op onze <a href="https://www.facebook.com/dtopbree">Facebookpagina</a> vindt u een collectie grappige, interessante of gevatte reclamefilmpjes...</p>
        </div>
      </div>

      <div class="block fade-in" style="--delay: 0.1s"></div>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow-x: clip;
}

.hero {
  overflow: hidden;
  position: relative;
  min-height: 100svh;
  width: 100%;
  background: linear-gradient(340deg,rgba(69, 73, 103, 1) 30%, rgba(223, 223, 247, 1) 100%);
}

.hero span {
  position: absolute;
  left: -3.4vw;
  bottom: 0;
  color: white;
  letter-spacing: -7%;
  font-weight: bold;
  line-height: 0.7;
  white-space: nowrap;
  display: inline-block;
}

.middle {
  padding: 10rem 2rem 0;
  color: #454967;
  display: flex;
  flex-direction: column;
  gap: 18rem;
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
  margin-left: -0.25rem
}

a {
  margin-left: -0.25rem
}

.contact a:hover {
  color: white;
}

.block {
  background-image: url("/DTOP_achtergrond.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 15vw;
  width: 30vw;
}

/* Fade-in animation */
.fade-in {
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: var(--delay, 0s);
}

.fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

@media screen and (max-width: 800px) {
  .info {
    flex-direction: column;
    gap: 8rem;
  }

  .left,
  .right {
    width: 70%;
  }

  .middle {
    gap: 12rem;
  }
}

@media screen and (max-width: 500px) {
  .middle {
    padding: 10rem 1rem 0;
  }

  .left,
  .right {
    width: 100%;
  }

  .info {
    flex-direction: column;
    gap: 5rem;
  }

  .block {
    width: 50vw;
    height: 25vw;
  }
}
</style>