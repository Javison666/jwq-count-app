<template>
    <div>
        <mt-header fixed title="小吉计分">
            <mt-button slot="left" @click="toRoom">房间</mt-button>
            <mt-button slot="right" @click="getQrcode">二维码</mt-button>
        </mt-header>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade">
            <h2 style="padding:1rem;">房间二维码</h2>
            <div ref="qrCodeDiv" class="qrCodeDiv" style="padding:2rem;"></div>
            <div style="padding:1rem">
                <mt-button style="width:100%;" type="primary" @click="popupVisible=false">关闭</mt-button>
            </div>
        </mt-popup>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QRCode from "qrcodejs2";
import { Popup } from "mint-ui";

Vue.component(Popup.name, Popup);
@Component
export default class Home extends Vue {
    public popupVisible = false;
    public QRcode: any = null;
    public toRoom() {
        window.location.href = this.$fn.getQrRoomHref(this.$route.params.id);
    }
    public getQrcode() {
        this.popupVisible = true;
        const href = this.$fn.getQrRoomHref(this.$route.params.id);
        if (this.QRcode) {
            return this.QRcode.makeCode(href);
        }
        this.QRcode = new QRCode(this.$refs.qrCodeDiv, {
            text: href,
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
</style>
<style lang="scss">
.qrCodeDiv {
    img {
        margin: auto;
    }
}
</style>
