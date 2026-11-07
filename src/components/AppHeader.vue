<script setup>
</script>

<template>
  <header>
    <RouterLink :to="{ name: 'home' }" class="logo">
      <img src="/DTOP_logo3.png" alt="DTOP logo" />
    </RouterLink>

    <nav>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'portfolio' }">Portfolio</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: relative; /* in the flow, so pages sit below it instead of under it */
  width: 100%;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.logo img {
  display: block; /* removes the inline baseline gap, so the header is exactly 6rem tall */
  height: 4rem;
}

nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.9rem;
}

/* Fill animates from left to right on hover */
nav a {
  padding: 0 0.25rem;
  font-size: 1.1rem;
  color: #454967;
  background-image: linear-gradient(#454967, #454967);
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 0% 100%;
  transition: background-size 0.3s ease, color 0.3s ease;
}

@media (hover: hover) {
  nav a:hover {
    background-size: 100% 100%;
    color: white;
  }

  .logo:hover {
    background: none;
  }
}

nav a.router-link-active {
  font-weight: bold;
}

@media screen and (max-width: 450px) {
  nav {
    gap: 1rem;
  }
}
</style>