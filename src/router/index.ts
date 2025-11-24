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
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: Forbidden,
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/error",
    name: "OtherError",
    component: OtherError,
  },
  {
    path: "/server-error",
    name: "ServerError",
    component: ServerError,
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
  },
  {
    path: "/unprocessable-entity",
    name: "UnprocessableEntity",
    component: UnprocessableEntity,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
