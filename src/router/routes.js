import { i18n } from "./../plugins/i18n.js";
import Home from "@/views/Login.vue";

export default [
    {
        path: "/:lang",
        component: {
            template: "<router-view></router-view>"
        },
        beforeEnter(to, from, next) {
            const lang = to.params.lang;
            if (!["en", "de"].includes(lang)) return next("en");
            if (i18n.locale !== lang) {
                i18n.locale = lang;
            }
            return next();
        },
        children: [
            {
                path: "",
                name: "home",
                component: Home
            },
            {
                path: "login",
                name: "login",
                component: () =>
                    import(/* webpackChunkName: "about" */ "@/views/Login.vue")
            },
            {
                path: 'login/:token',
                name: 'loginHandler',
                component: () =>
                    import(/* webpackChunkName: "about" */ "@/components/LoginHandler.vue")
            },
            {
                path: 'groups',
                name: 'groups',
                component: () =>
                    import(/* webpackChunkName: "about" */ "@/views/Groups.vue")
            },
            {
                path: 'group/:id',
                name: 'group',
                component: () =>
                    import(/* webpackChunkName: "about" */ "@/views/Group.vue")
            }
        ]
    }
];