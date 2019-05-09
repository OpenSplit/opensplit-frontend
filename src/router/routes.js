import Home from "@/views/Login.vue";

export default [
    {
        path: "/",
        component: {
            template: "<router-view></router-view>"
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
                path: 'groups/:id',
                name: 'group',
                component: () =>
                    import(/* webpackChunkName: "about" */ "@/views/Group.vue")
            },
            {
                path: 'groups/:id/expenses/new',
                name: 'expense',
                component: () =>
                    import(/* webpackChunkName: "about" */ "@/views/Expense.vue")
            },
            {
                path: 'groups/:id/payment/new',
                name: 'payment',
                component: () =>
                    import(/* webpackChunkName: "about" */ "@/views/Payment.vue")
            },
            {
                path: 'groups/:id/debts',
                name: 'debts',
                component: () =>
                    import(/* webpackChunkName: "about" */ "@/views/Debts.vue")
            }
        ]
    }
];