import Vue from "vue";
import Router from "vue-router";
import routes from "./router";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: "count",
    routes
});

router.afterEach((to, from) => {
    window.scrollTo(0, 0);
});

router.beforeEach(async (to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
    /* must call `next` */
});

export default router;
