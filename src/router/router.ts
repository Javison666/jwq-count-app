export default [
    {
        path: "/",
        name: "index",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home/index.vue")
    },
    {
        path: "/addr",
        name: "addr",
        component: () => import("@/views/Addr/index.vue"),
        children: [
            // {
            //     path: "/room/",
            //     redirect: "/home"
            // },
            {
                path: "/addr/room/:id",
                component: () => import("@/views/Addr/id/index.vue")
            }
        ]
    },
    {
        path: "/score",
        name: "score",
        component: () => import("@/views/Score/index.vue"),
        children: [
            // {
            //     path: "/room/",
            //     redirect: "/home"
            // },
            {
                path: "/score/room/:id",
                component: () => import("@/views/Score/id/index.vue")
            }
        ]
    },
    {
        path: "*",
        redirect: "/home"
    }
];
