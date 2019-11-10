<template>
    <div>
        <mt-header fixed title="小吉计分"></mt-header>
        <div style="margin-top:60px;">
            <div style="padding:1rem;">
                <mt-button type="default">提示：请扫房主二维码进入房间</mt-button>
            </div>
            <!-- 房间二维码 -->
            <div v-show="state">
                <div ref="qrCodeDiv" class="qrCodeDiv" style="padding:1rem;"></div>
                <div>
                    <mt-field label="房间名称" placeholder="请输入房间名称" v-model.trim="roomName" disabled></mt-field>
                </div>
                <div>
                    <mt-field
                        label="房间人数"
                        placeholder="请输入房间人数"
                        type="number"
                        v-model.trim="roomNum"
                        disabled
                    ></mt-field>
                </div>
                <div style="padding-top:2rem;">
                    <mt-button type="primary" @click="toRoom" plain>直接进入房间</mt-button>
                </div>
            </div>
            <!-- 创建房间 -->
            <div style="padding-top:2rem;" v-show="!state">
                <div>
                    <mt-field label="房间名称" placeholder="请输入房间名称" v-model.trim="roomName"></mt-field>
                </div>
                <div>
                    <mt-field
                        label="房间人数"
                        placeholder="请输入房间人数"
                        type="number"
                        v-model.trim="roomNum"
                    ></mt-field>
                </div>
                <div style="padding-top:2rem;">
                    <mt-button type="primary" @click="createRoom" plain>生成房间二维码</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Toast } from "mint-ui";
import { createRoom } from "@/req/count";
import QRCode from "qrcodejs2";
@Component
export default class Home extends Vue {
    public QRcode: any = {};
    public roomId = "";
    public roomName =
        "房号" +
        new Date()
            .getTime()
            .toString(36)
            .slice(-8);
    public roomNum = 4;
    public state = false;
    public back() {
        window.location.reload();
    }
    public toRoom() {
        this.$fn.toRoom(this.roomId);
    }
    public async createRoom() {
        if (this.roomName === "") {
            return Toast({
                message: "您的房间名称不正确！",
                iconClass: "icon icon-error",
                position: "top"
            });
        }
        if (!/\d+/.test(String(this.roomNum))) {
            return Toast({
                message: "您的房间人数不正确",
                iconClass: "icon icon-error",
                position: "top"
            });
        }
        let href = "https://jiweiqing.cn";
        const res: any = await this.$fn.showMsgResponse(
            await createRoom({
                roomName: this.roomName,
                count: this.roomNum
            })
        );
        this.roomId = res.roomId;
        href = this.$fn.getQrRoomHref(res.roomId);
        this.state = true;
        if (this.QRcode.clear) {
            return this.QRcode.makeCode(
                this.$fn.getQrRoomHref(this.$route.params.roomId)
            );
        }
        this.QRcode = new QRCode(this.$refs.qrCodeDiv, {
            text: this.$fn.getQrRoomHref(res.roomId),
            width: 200,
            height: 200,
            colorDark: "#333333", // 二维码颜色
            colorLight: "#ffffff", // 二维码背景色
            correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
        });
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global/_color.scss";
</style>
<style lang="scss">
.qrCodeDiv {
    img {
        margin: auto;
    }
}
</style>
