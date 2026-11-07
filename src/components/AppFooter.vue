<script setup>
</script>

<template>
  <footer>
    <p>© 2026</p>
    <p>D’TOP — grafische vormgeving i.s.m. <a href="https://www.gielboogaerts.com" target="_blank">GIELBOOGAERTSSTUDIO</a></p>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

p, a {
  font-size: 0.7rem;
  color: #454967;
}

a:hover {
  color: white;
}

@media screen and (max-width: 450px) {
  footer {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }

  footer a {
    margin-left: -0.25rem;
  }
}
</style>
