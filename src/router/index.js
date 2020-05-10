import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Login.vue";
import Forgot from "../components/Forgot.vue";
import Dashboard from "../views/Dashboard.vue";
import Hospital from "../views/Hospital.vue";
import Doctor from "../views/Doctor.vue";
import Patient from "../views/Patient.vue";
import PatientDetail from "../views/PatientDetail.vue";
import User from "../views/User.vue";
import ChangePassword from "../views/ChangePassword.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/login",
    children: [
      { name: "Login", path: "login", component: Login },
      { name: "Forgot", path: "forgot", component: Forgot },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/hospital",
    name: "Hospital",
    component: Hospital,
  },
  {
    path: "/doctor",
    name: "Doctor",
    component: Doctor,
  },
  {
    path: "/patient",
    name: "Patient",
    component: Patient,
  },
  {
    path: "/patient/:id",
    name: "PatientDetail",
    component: PatientDetail,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/change",
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Forgot" && !store.getters.token) next();
  else if (to.name !== "Login" && !store.getters.token) next({ name: "Login" });
  else if (to.name === "Login" && store.getters.token)
    next({ name: "Dashboard" });
  else if (to.name === "Forgot" && store.getters.token)
    next({ name: "Dashboard" });
  else next();
});

export default router;
