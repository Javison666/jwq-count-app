import $fn from "@/utils/fn.ts";
import httpApi from "@/apis/httpApi";

export const createRoom = (json): any =>
    $fn.httpPost({
        url: httpApi.count.createRoom,
        json
    });

export const getRoomInfo = (json): any =>
    $fn.httpPost({
        url: httpApi.count.getRoomInfo,
        json
    });

export const getScoreList = (json): any =>
    $fn.httpPost({
        url: httpApi.count.getScoreList,
        json
    });

export const handleRoomScore = (json): any =>
    $fn.httpPost({
        url: httpApi.count.handleRoomScore,
        json
    });
