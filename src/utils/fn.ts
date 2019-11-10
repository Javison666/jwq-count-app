import Fn from "jj-browser-fn";
import RoomFn from "./room";
import PageApi from "@/apis/pageApi";
import { Toast } from "mint-ui";
const ProjFn = {
    ...Fn,
    ...RoomFn,
    // 跳转路由
    toRoute: (route: string) => {
        window.App.$router.push({
            path: route
        });
    },
    backLogin: () => {
        window.App.$router.push({
            path: PageApi.login.path
        });
    },
    // 添加全局公共方法
    checkHttpResponse: (res: any, errorFn: any, isNotice: boolean) => {
        return new Promise(resolve => {
            if (res && ProjFn.n(res.code) === 200) {
                resolve(res.data);
            } else {
                // tslint:disable-next-line:no-unused-expression
                errorFn ? errorFn(res) : "";
                if (isNotice) {
                    Toast({
                        message: res.msg,
                        iconClass: "icon icon-error",
                        position: "top"
                    });
                }
            }
        });
    },
    showMsgResponse: (res: any, errorFn?: any) => {
        return ProjFn.checkHttpResponse(res, errorFn, true);
    },
    handleResponse: (res: any, errorFn: any) => {
        return ProjFn.checkHttpResponse(res, errorFn, false);
    }
};

export default ProjFn;
