<script setup></script>

<template>
  <header>
    <div>
      <img src="/DTOP_logo.png" alt="DTOP logo" />
      <p>D’TOP – GRAFISCHE VORMGEVING</p>
    </div>
    <nav>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'portfolio' }">Portfolio</RouterLink>
      <RouterLink :to="{ name: 'contact' }">Contact</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 4rem;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

div {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
}

img {
  height: 1rem;
}
</style>
