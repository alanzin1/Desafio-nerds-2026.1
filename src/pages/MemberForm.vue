<template>
  <section class="card">
    <img :src="logo" alt="NERDS" class="logo" />
    <h2 class="title">Cadastro de Membro</h2>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="field">
        <input
          class="input"
          v-model="form.nome"
          placeholder="Nome"
          maxlength="60"
        />
        <span v-if="errors.nome" class="error">Nome obrigatório</span>
      </div>

      <div class="field">
        <input
          class="input"
          v-model="form.matricula"
          placeholder="Matrícula"
          inputmode="numeric"
          minlength="6"
          maxlength="6"
          @input="
            form.matricula = form.matricula.replace(/\D/g, '').slice(0, 6)
          "
        />
        <span v-if="errors.matricula" class="error">Matrícula obrigatória</span>
      </div>

      <div class="field">
        <input
          class="input"
          type="email"
          v-model.trim="form.email"
          placeholder="Email institucional"
          maxlength="60"
          :class="{ invalid: errors.email }"
        />
        <span v-if="errors.email" class="error">
          Informe um e-mail válido (ex: nome@ufc.br)
        </span>
      </div>
      <div class="field">
        <select class="input" v-model="form.setor">
          <option disabled value="">Selecione o setor</option>
          <option v-for="setor in setores" :key="setor" :value="setor">
            {{ setor }}
          </option>
        </select>
        <span v-if="errors.setor" class="error">Setor obrigatória</span>
      </div>

      <div class="field">
        <select class="input" v-model="form.tipo">
          <option disabled value="">Tipo de vínculo</option>
          <option value="Estágio">Estágio (16h semanais)</option>
          <option value="Voluntário">Voluntário (8h semanais)</option>
        </select>
        <span v-if="errors.tipo" class="error">Tipo obrigatório</span>
      </div>

      <button class="button" :disabled="loading">
        {{ loading ? "Salvando..." : "Cadastrar" }}
      </button>
    </form>
  </section>
  <BaseModal
    v-if="showModal"
    :message="modalMessage"
    @close="showModal = false"
  />
</template>

<script setup>
import { reactive, ref } from "vue";
import { createMember } from "../services/membersApi";
import BaseModal from "../components/ModalAlert.vue";
import logo from "@/assets/logo.png";

const loading = ref(false);

const showModal = ref(false);
const modalMessage = ref("");

const setores = [
  "Back-End",
  "Front-End",
  "UI Design",
  "Analista / Projetista",
  "Qualidade de Software (QA)",
  "DevOps",
  "Marketing / Mídias",
];

const form = reactive({
  nome: "",
  matricula: "",
  email: "",
  setor: "",
  tipo: "",
});

const errors = reactive({
  nome: false,
  matricula: false,
  email: false,
  setor: false,
  tipo: false,
});

async function handleSubmit() {
  errors.nome = !form.nome;
  errors.matricula = !form.matricula;
  errors.email = !form.email || !form.email.includes("@");
  errors.setor = !form.setor;
  errors.tipo = !form.tipo;

  if (
    errors.nome ||
    errors.matricula ||
    errors.email ||
    errors.setor ||
    errors.tipo
  ) {
    modalMessage.value = "Preencha todos os campos corretamente.";
    showModal.value = true;
    return;
  }

  try {
    loading.value = true;

    await createMember({ ...form });

    modalMessage.value = "Membro cadastrado com sucesso!";
    showModal.value = true;

    form.nome = "";
    form.matricula = "";
    form.email = "";
    form.setor = "";
    form.cargo = "";
    form.tipo = "";
  } catch (error) {
    modalMessage.value = "Erro ao cadastrar membro.";
    showModal.value = true;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem;
  background: var(--color-text);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.logo {
  display: block;
  width: 160px;
  max-width: 70%;
  margin: 0 auto 1rem;
}

.title {
  margin-bottom: 1.25rem;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-primary-dark);
  font-weight: 700;
  font-size: 1.2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.input {
  width: 100%;
  padding: 0.7rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.input:focus {
  border: 1px solid var(--color-primary);
}
.input.invalid {
  border-color: var(--color-danger);
}

.error {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-danger);
}

.button {
  margin-top: 0.75rem;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}
.button:hover {
  background: var(--color-primary-dark);
}

@media (min-width: 640px) {
  .card {
    padding: 2rem;
  }

  .title {
    font-size: 1.4rem;
  }

  .logo {
    width: 200px;
  }
}
</style>
