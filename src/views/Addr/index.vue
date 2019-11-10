<template>
    <div>
        <room-header></room-header>
        <div style="margin-top:60px;">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RoomHeader from "@/components/RoomHeader.vue";
import { createRoom } from "@/req/count";
import QRCode from "qrcodejs2";
@Component({
    components: {
        RoomHeader
    }
})
export default class Home extends Vue {}
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
