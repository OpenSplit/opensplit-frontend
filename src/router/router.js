import Vue from "vue";
import Router from "vue-router";
import routes from "@/router/routes.js";
Vue.use(Router);


export default new Router({
    routes,
    mode: "history",
    base: process.env.BASE_URL
});