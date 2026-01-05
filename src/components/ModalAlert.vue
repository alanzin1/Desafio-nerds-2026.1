<template>
  <div class="overlay" @click.self="emitClose">
    <div class="modal">
      <p class="message">{{ message }}</p>

      <button class="button" @click="emitClose">OK</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

function emitClose() {
  emit("close");
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--color-text);
  padding: 1.5rem;
  border-radius: 10px;
  width: 90%;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.message {
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  color: #333;
}

.button {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 6px;
  background: var(--color-primary);
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.button:hover {
  background: var(--color-primary-dark);
}
</style>
