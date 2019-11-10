const baseUrl = `/api`;
import { createRoom } from "../req/count";
export default {
    count: {
        // 创建房间
        createRoom: `${baseUrl}/count/createRoom`,
        getRoomInfo: `${baseUrl}/count/getRoomInfo`,
        getScoreList: `${baseUrl}/count/getRoomScoreList`,
        handleRoomScore: `${baseUrl}/count/handleRoomScore`
    }
};
