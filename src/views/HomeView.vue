<script setup></script>

<template>
  <main>
    <section class="hero">
      <div class="container">
        <img src="/DTOP_logo.png" alt="DTOP Logo" />
        <h1>
          <span>Welkom bij</span> <br />
          <span class="bold big">D'TOP</span> <br />
          <span class="bold italic">grafische vormgeving</span>
        </h1>
      </div>
    </section>
    <section class="paragraph">
      <p>
        Al meer dan 20 jaar staat <span class="bold">D</span>(esk)<span class="bold">TOP</span>
        (Publishing) in Bree grafisch tot uw dienst, met degelijke begeleiding en deskundig advies.
      </p>
    </section>
    <section class="service">
      <div class="item">
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
      <div class="item">
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
      <div class="item">
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
    <section class="curious">
      <h2>Interesse?</h2>
      <p>
        Neem zeker vrijblijvend contact met ons op en wie weet gaan we een jarenlange samenwerking
        tegemoet.
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
  padding: 8rem 4rem 12rem 2rem;
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
