import { createRouter, createWebHistory } from "vue-router";
import MemberForm from "../pages/MemberForm.vue";
import MemberList from "../pages/MemberList.vue";

const routes = [
  { path: "/", redirect: "/cadastro" },
  { path: "/cadastro", component: MemberForm },
  { path: "/lista", component: MemberList },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
