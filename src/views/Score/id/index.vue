<template>
    <div>
        <div style="margin-top:60px;">
            <div
                style="padding:8px;text-align:left;width:80%;margin:auto;overflow:hidden;padding-bottom:.5rem;"
                v-if="roomInfo.nick_name_list"
            >
                <h2
                    style="display:inline-block;font-size:1.5rem;"
                >{{roomInfo.nick_name_list[Number($route.query.addr)]}}</h2>
                <span style="float:right;position:relative;">
                    当前总积分：
                    <b style="color:green;font-size:2rem;">{{selfInfo.score}}</b>
                </span>
            </div>
            <hr />
            <div style="text-align:left;width:80%;margin:auto;">
                <div style="padding:8px;opacity:.6;overflow:hidden;">
                    <span style="font-size:.7rem;position:relative;top:.3rem;">提示：点击每轮右侧的数字进行修改。</span>
                    <mt-button
                        type="default"
                        size="small"
                        style="float:right;font-size:.7rem;"
                        @click="popupVisible=true"
                    >查看排行</mt-button>
                </div>
                <mt-cell :title="'新一轮（第'+(handleScoreList.length + 1)+'轮）'">
                    <span
                        @click="calcRound(handleScoreList.length + 1)"
                        :style="{'color': 'red'}"
                    >请输入</span>
                </mt-cell>
                <mt-cell
                    v-for="(item,idx) in handleScoreList"
                    :key="idx"
                    :label="item.total===0?'':'未结清'"
                    style="position:relative;"
                >
                    <div slot="title" @click="view(item,handleScoreList.length-1-idx)">
                        第{{item.roundId}}轮
                        <div
                            v-if="item.total!==0"
                            style="font-size:.7rem;opacity:.5;margin-top:.3rem"
                        >{{item.total===0?'':'未结清'}}</div>
                    </div>
                    <span
                        @click.prevent="calcRound(item.roundId)"
                        :style="{'color': item.score===undefined?'red':'gray'}"
                    >{{item.score===undefined?'请输入':item.score}}</span>
                </mt-cell>
            </div>
        </div>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" style="width:80%;">
            <h2 style="padding:1rem;">排行榜</h2>
            <hr />
            <div style="padding:1rem;">
                <div
                    v-for="(item,index) in totalScoreList"
                    :key="index"
                    style="padding:.2rem;overflow:hidden;"
                    :style="{'color': Number(item.addr)===Number($route.query.addr)?'green':'#333'}"
                >
                    <span
                        style="width:50%;display:inline-block;text-align:right;float:left;"
                    >{{item.name}} ：</span>
                    <span style="margin-left:.4rem;float:left;padding-top:.2rem;">{{item.score}}</span>
                </div>
            </div>
            <mt-button type="default" style="width:100%;" @click="popupVisible=false">关闭</mt-button>
        </mt-popup>
        <mt-popup v-model="popupListVisible" popup-transition="popup-fade" style="width:80%;">
            <h2 style="padding:1rem;">第{{viewList.roundId}}轮</h2>
            <hr />
            <div style="padding:1rem;">
                <div
                    v-for="(item,index) in viewList.list"
                    :key="index"
                    style="padding:.2rem;overflow:hidden;"
                    :style="{'color': Number(item.addr)===Number($route.query.addr)?'green':'#333'}"
                >
                    <span
                        style="width:50%;display:inline-block;text-align:right;float:left;"
                    >{{roomInfo.nick_name_list[Number(item.addr)]}} ：</span>
                    <span style="margin-left:.4rem;float:left;padding-top:.2rem;">{{item.score}}</span>
                </div>
            </div>
            <mt-button type="default" style="width:100%;" @click="popupListVisible=false">关闭</mt-button>
        </mt-popup>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Toast, MessageBox, Popup } from "mint-ui";
import { getScoreList, handleRoomScore, getRoomInfo } from "@/req/count";
@Component
export default class Home extends Vue {
    public popupVisible = false;
    public popupListVisible = false;
    public viewList: any = [];
    public roomInfo: any = {
        nick_name_list: []
    };
    public scoreList: any = [
        // {
        //     roundId: 2,
        //     list: [
        //         {
        //             addr: 2,
        //             score: -2
        //         }
        //     ]
        // },
        // {
        //     roundId: 1,
        //     list: [
        //         {
        //             addr: 1,
        //             score: -2
        //         }
        //     ]
        // }
    ];
    public get selfInfo() {
        const self: any = {
            score: 0
        };
        let score = 0;
        this.scoreList.map(i => {
            i.list.forEach(j => {
                if (Number(j.addr) === Number(this.$route.query.addr)) {
                    score += Number(j.score === undefined ? 0 : j.score);
                }
            });
        });
        self.score = score;
        return self;
    }
    public get totalScoreList() {
        const list: any = [];
        for (let a = 0; a < this.roomInfo.nick_name_list.length; a++) {
            let score = 0;
            this.scoreList.map(i => {
                i.list.forEach(j => {
                    if (Number(j.addr) === Number(a)) {
                        score += Number(j.score === undefined ? 0 : j.score);
                    }
                });
            });
            list.push({
                addr: a,
                name: this.roomInfo.nick_name_list[a],
                score
            });
        }
        return list.sort((a, b) => b.score - a.score);
    }
    public view(list, idx) {
        this.viewList = list;
        console.log(list);
        this.popupListVisible = true;
    }
    public get handleScoreList() {
        return this.scoreList.map(i => {
            i.total = 0;
            i.list.forEach(j => {
                if (Number(j.addr) === Number(this.$route.query.addr)) {
                    i.score = j.score;
                }
                i.total += Number(j.score === undefined ? 0 : j.score);
            });
            return i;
        });
    }
    public mounted() {
        window.countFn.updateScoreList = () => {
            this.getScoreList();
        };
    }
    public beforeRouteEnter(to, from, next) {
        next(vm => {
            if (window.countFn.updateAddrs === undefined) {
                return vm.$fn.toRoom(vm.$route.params.id);
            }
            vm.getScoreList();
            vm.getRoomInfo();
        });
    }
    public async getScoreList() {
        const res = await this.$fn.showMsgResponse(
            await getScoreList({
                roomId: this.$route.params.id
            })
        );
        this.scoreList = res.list;
    }
    public calcRound(round) {
        MessageBox.prompt(`请输入你在第${round}轮的分数`).then(
            async ({ value, action }) => {
                if (value < 0 || value === "0" || value > 0) {
                    const res = await this.$fn.showMsgResponse(
                        await handleRoomScore({
                            roomId: this.$route.params.id,
                            addrId: Number(this.$route.query.addr),
                            roundId: Number(round),
                            score: Number(value)
                        })
                    );
                } else {
                    Toast({
                        message: "请输入整数或者负整数",
                        iconClass: "icon icon-error",
                        position: "top"
                    });
                }
            }
        );
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
