import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

import { Button, Header, Field, Cell } from "mint-ui";
import "mint-ui/lib/style.css";

// 自定义全局样式
import "@/assets/style/global/index.scss";

import PAGE_API from "@/apis/pageApi";
import HTTP_API from "@/apis/httpApi";

import fn from "@/utils/fn.ts";
import Component from "vue-class-component";
Component.registerHooks([
    "beforeRouteEnter",
    "beforeRouteLeave",
    "beforeRouteUpdate"
]);
window.countFn = {};
window.countWs = new WebSocket("ws://" + window.location.hostname + ":3000");
window.countWs.onopen = () => {
    window.countWs.onmessage = evt => {
        // tslint:disable-next-line
        console.log(evt.data);
        try {
            const res = JSON.parse(evt.data);
            if (window.countFn[res.type]) {
                window.countFn[res.type](res.data);
            }
        } catch (err) {
            // tslint:disable-next-line
            console.log(err);
        }
    };
    window.countWs.onclose = () => {
        // tslint:disable-next-line
        console.log("已断开");
    };
};

Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Field.name, Field);
Vue.component(Cell.name, Cell);

// prop全局
Vue.prototype.$fn = fn;
Vue.prototype.$PAGE_API = PAGE_API;
Vue.prototype.$HTTP_API = HTTP_API;

Vue.config.productionTip = false;

window.App = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
