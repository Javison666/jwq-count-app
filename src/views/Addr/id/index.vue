<template>
    <div class="addr-box">
        <h3 style="padding-bottom:1rem;">房间名称：{{roomInfo.room_name}}</h3>
        <mt-button type="default">提示：请选择座位入座</mt-button>
        <div style="padding-top:1rem;text-align:left;width:80%;margin:auto;">
            <mt-cell
                v-for="(item, idx) in roomInfo.nick_name_list"
                :title="`座位`+` : `+item"
                :key="idx"
            >
                <span v-show="addrs.indexOf(idx)>-1">已坐下</span>
                <mt-button
                    v-show="addrs.indexOf(idx)===-1"
                    type="primary"
                    size="small"
                    @click="selectAddr(item,idx)"
                    plain
                >选择</mt-button>
            </mt-cell>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Toast } from "mint-ui";
import { getRoomInfo } from "@/req/count";
@Component
export default class Home extends Vue {
    public roomInfo: any = {};
    public addrs: any = [];
    public mounted() {
        window.countFn.updateAddrs = res => {
            this.updateAddrs(res.addrs);
        };
    }
    public beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getRoomInfo();
            window.countWs.send(
                JSON.stringify({
                    type: "enterRoom",
                    roomId: vm.$route.params.id
                })
            );
        });
    }
    public updateAddrs(addrs) {
        this.addrs = addrs.map(i => Number(i));
    }
    public async getRoomInfo() {
        let roomInfo: any = {};
        // roomInfo = {
        //     id: 47,
        //     room_id: "1150717815",
        //     room_name: "asdf",
        //     count: 123,
        //     enter_code: "1234",
        //     nick_name_list: "唐僧,黑熊精,观音,刘备",
        //     create_time: "2019-10-15T14:45:17.000Z"
        // };
        roomInfo = await this.$fn.showMsgResponse(
            await getRoomInfo({
                roomId: this.$route.params.id
            })
        );
        roomInfo.nick_name_list = roomInfo.nick_name_list.split(",");
        this.roomInfo = roomInfo;
    }
    public selectAddr(item, idx) {
        window.countWs.send(
            JSON.stringify({
                type: "enterRoom",
                roomId: this.$route.params.id,
                addrId: idx,
                roleName: item
            })
        );
        this.$router.push({
            path: `/score/room/${this.$route.params.id}?addr=${idx}`
        });
    }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.qrCodeDiv {
    img {
        margin: auto;
    }
}
</style>
