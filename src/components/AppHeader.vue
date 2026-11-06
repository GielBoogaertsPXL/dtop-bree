<script setup>
</script>

<template>
  <header>
    <div>
      <RouterLink :to="{ name: 'home' }">
        <img src="/DTOP_logo.png" alt="DTOP logo" class="logo"/>
      </RouterLink>
    </div>
    <nav>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'portfolio' }">Portfolio</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding: 1rem 1.5rem 20rem 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.logo {
  height: 4rem;
}

nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.9rem
}

nav a {
  width: fit-content;
  display: flex;
  justify-content: center;
  color: white;
  background-image: linear-gradient(white, white);
}

nav a:hover {
  color: #454967;
}
</style>
