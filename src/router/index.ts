import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import HomePage from "@/pages/HomePage.vue";
import BookPage from "@/pages/BookPage.vue";
import ListPage from "@/pages/ListPage.vue";
import EditPage from "@/pages/EditPage.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/book/:id",
    name: "Book",
    component: BookPage,
  },
  {
    path: "/list/:id",
    name: "List",
    component: ListPage,
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: EditPage,
  },
  {
    path: "/create",
    name: "Create",
    component: ListPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
