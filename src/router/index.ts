import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import HomePage from "@/pages/HomePage.vue";
import BookPage from "@/pages/BookPage.vue";
import ListPage from "@/pages/ListPage.vue";
import EditPage from "@/pages/EditPage.vue";
import BadRequest from "@/errors/BadRequest.vue";
import Forbidden from "@/errors/Forbidden.vue";
import NotFound from "@/errors/NotFound.vue";
import OtherError from "@/errors/OtherError.vue";
import ServerError from "@/errors/ServerError.vue";
import Unauthorized from "@/errors/Unauthorized.vue";
import UnprocessableEntity from "@/errors/UnprocessableEntity.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { hideLayout: true },
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
  // errors
  {
    path: "/bad-request",
    name: "BadRequest",
    component: BadRequest,
    meta: { hideLayout: true },
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: Forbidden,
    meta: { hideLayout: true },
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound,
    meta: { hideLayout: true },
  },
  {
    path: "/error",
    name: "OtherError",
    component: OtherError,
    meta: { hideLayout: true },
  },
  {
    path: "/server-error",
    name: "ServerError",
    component: ServerError,
    meta: { hideLayout: true },
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    meta: { hideLayout: true },
  },
  {
    path: "/unprocessable-entity",
    name: "UnprocessableEntity",
    component: UnprocessableEntity,
    meta: { hideLayout: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
