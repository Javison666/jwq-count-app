export const roomFn = {
    toRoom: roomId => {
        window.App.$router.push({
            path: "/addr/room/" + roomId
        });
    },
    getQrRoomHref: roomId =>
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":" +
        window.location.port +
        "/count/addr/room/" +
        roomId
};
export default roomFn;
