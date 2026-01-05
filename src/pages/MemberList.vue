<template>
  <section class="card">
    <h2 class="title">Lista de Membros</h2>

    <input v-model="search" placeholder="Buscar membro..." class="search" />

    <p v-if="loading" class="info">Carregando membros...</p>

    <p v-else-if="filteredMembers.length === 0" class="info">
      Nenhum membro encontrado.
    </p>

    <div v-else>
      <div class="table-wrapper desktop-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Email</th>
              <th>Setor</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in filteredMembers" :key="member.matricula">
              <td>{{ member.nome }}</td>
              <td>{{ member.matricula }}</td>
              <td>{{ member.email }}</td>
              <td>{{ member.setor }}</td>
              <td>{{ member.tipo }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mobile-list">
        <div
          class="member-card"
          v-for="member in filteredMembers"
          :key="member.matricula"
        >
          <p><strong>Nome:</strong> {{ member.nome }}</p>
          <p><strong>Matrícula:</strong> {{ member.matricula }}</p>
          <p><strong>Email:</strong> {{ member.email }}</p>
          <p><strong>Setor:</strong> {{ member.setor }}</p>
          <p><strong>Tipo:</strong> {{ member.tipo }}</p>
        </div>
      </div>
    </div>
  </section>

  <BaseModal
    v-if="showModal"
    :message="modalMessage"
    @close="showModal = false"
  />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import BaseModal from "../components/ModalAlert.vue";
import { fetchMembers } from "../services/membersApi";

const search = ref("");
const members = ref([]);
const loading = ref(true);
const showModal = ref(false);
const modalMessage = ref("");

onMounted(async () => {
  try {
    members.value = await fetchMembers();

    if (members.value.length === 0) {
      modalMessage.value = "Nenhum membro cadastrado.";
      showModal.value = true;
    }
  } catch (error) {
    modalMessage.value = "Erro ao carregar membros.";
    showModal.value = true;
  } finally {
    loading.value = false;
  }
});

const filteredMembers = computed(() =>
  members.value.filter((m) =>
    m.nome.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 700px;
  background: var(--color-text);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.title {
  margin-bottom: 1.25rem;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-primary-dark);
  font-weight: 700;
  font-size: 1.4rem;
}

.search {
  width: 100%;
  padding: 0.65rem 0.75rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

.search:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(0, 217, 255, 0.15);
}

.info {
  text-align: center;
  color: var(--color-bg);
  font-size: 0.9rem;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.9rem;
}

td {
  color: var(--color-bg);
}

th {
  background: var(--color-primary);
  color: var(--color-text);
  font-weight: 600;
}

tbody tr:hover {
  background: rgba(0, 0, 0, 0.03);
}

.mobile-list {
  display: none;
}

.member-card {
  background: white;
  padding: 0.9rem;
  border-radius: 10px;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.member-card p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: var(--color-bg);
}

.member-card strong {
  color: var(--color-primary-dark);
}

@media (max-width: 640px) {
  .desktop-table {
    display: none;
  }

  .mobile-list {
    display: block;
  }

  .card {
    padding: 1rem;
  }

  .title {
    font-size: 1.25rem;
  }
}
</style>
