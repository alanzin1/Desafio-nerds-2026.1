<template>
  <main class="container">
    <nav class="menu">
      <span class="indicator" :class="activeRoute"></span>

      <RouterLink
        to="/cadastro"
        class="item"
        :class="{ active: activeRoute === 'cadastro' }"
      >
        Cadastro
      </RouterLink>

      <RouterLink
        to="/lista"
        class="item"
        :class="{ active: activeRoute === 'lista' }"
      >
        Lista
      </RouterLink>
    </nav>

    <RouterView />
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const activeRoute = computed(() =>
  route.path.includes("lista") ? "lista" : "cadastro"
);
</script>
<style scoped>
.container {
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 360px;
  background: var(--color-text);
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.item {
  flex: 1;
  text-align: center;
  padding: 0.6rem 0;
  font-weight: 600;
  z-index: 1;
  color: var(--color-bg);
  transition: color 0.2s ease;
}

.item.active {
  cursor: default;
  color: var(--color-text);
}

.indicator {
  position: absolute;
  top: 0.3rem;
  bottom: 0.3rem;
  width: 50%;
  background: var(--color-primary);
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.indicator.cadastro {
  transform: translateX(0%);
}

.indicator.lista {
  transform: translateX(calc(100% - 1rem));
}

@media (max-width: 640px) {
  .menu {
    max-width: 100%;
  }
  .container {
    margin-bottom: 5rem;
  }
}
</style>
