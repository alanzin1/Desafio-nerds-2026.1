# Desafio NERDS – Cadastro e Listagem de Membros

Aplicação web desenvolvida em **Vue 3** para cadastro e gerenciamento de membros, com validação de formulário, listagem responsiva e backend simulado utilizando **JSON Server**.

---

## 📌 Funcionalidades

- ✅ **Cadastro de membros**
- 🔍 **Busca de membros** pelo nome
- 📋 **Listagem em tabela** (desktop)
- 📱 **Listagem em cards** (mobile)
- ⚠️ **Validação** de campos obrigatórios
- ⏳ **Feedback visual** de carregamento
- 💬 **Modal de alerta** para erros e sucesso
- 🔁 **Navegação por rotas** com indicador animado

---

## 🖥️ Telas da Aplicação

### Cadastro de Membro

Permite cadastrar novos membros informando:

- Nome
- Matrícula (apenas números, 6 dígitos)
- Email
- Setor
- Tipo de vínculo (Estágio ou Voluntário)

> Todos os campos são obrigatórios e possuem validação.

### Lista de Membros

- Exibe todos os membros cadastrados.
- Campo de busca em tempo real pelo nome.
- **Layout responsivo:**
  - **Desktop:** Tabela organizada.
  - **Mobile:** Cards empilhados.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/)
- CSS puro

### Backend (Mock)

- [JSON Server](https://github.com/typicode/json-server)

---

## 📂 Estrutura do Projeto

```text
src/
├─ assets/
├─ components/
│  └─ ModalAlert.vue
├─ pages/
│  ├─ MemberForm.vue
│  └─ MemberList.vue
├─ router/
│  └─ index.js
├─ services/
│  └─ membersApi.js
├─ App.vue
└─ main.js

backend/
└─ db.json
```

## 🚀 Como Rodar o Projeto

Pré-requisitos:

- Node.js 20+
- NPM ou Yarn

## 1️⃣ Clone o repositório

```Bashgit
git clone
cd nerds
```

## 2️⃣ Instale as dependências

```Bash
npm install
```

## 3️⃣ Inicie o Backend (JSON Server)

Abra um terminal e execute dentro da pasta backend na raiz do projeto o comando:

```Bash#
npm run backend
```

O backend ficará disponível em: http://localhost:3000/members

## 4️⃣ Inicie o Frontend em outro terminal, execute:

Na pasta raiz do projeto execute o comando:

```Bash
npm run dev
```

A aplicação estará disponível no modo de desenvolvimento em: http://localhost:5173

## 📦 Scripts Disponíveis

- npm run dev (inicia o servidor de desenvolvimento (Vite))
- npm run build (gera os arquivos para produção)
- npm run preview (visualiza o build de produção localmente)
