<script setup></script>

<template>
  <main>
    <section>
      <h1>Neem gerust contact met ons op</h1>
      <div class="grid">
        <article>
          <h3>U kan ons contacteren via</h3>
          <a href="mailto:web@dtop.be">web@dtop.be</a>
          <p>+32 89 76 75 65</p>
        </article>
        <article>
          <h3>Telefonisch enkel bereikbaar</h3>
          <p>Ma – Vr</p>
          <p>9-12u / 13-18u</p>
        </article>
        <article>
          <h3>Alleen op afspraak</h3>
          <p>
            <a
              href="https://www.google.com/maps/place/dtop+-+grafische+vormgeving/@51.1300276,5.6309022,17z/data=!3m1!4b1!4m6!3m5!1s0x47c0d3d01c8dcc6d:0x34037950cc182ae2!8m2!3d51.1300276!4d5.6334771!16s%2Fg%2F11tg7wvg19?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
              target="blank"
              >Hovestraat 13 <br />
              3960 Bree</a
            >
          </p>
        </article>
        <article>
          <h3>Ook zot van reclame?</h3>
          <p>Bezoek zeker onze <a href="https://www.facebook.com/dtopbree">Facebookpagina</a> waar u een collectie grappige, interessante en gevatte reclamefilmpjes vindt!</p>
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
