"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// electron/preload.ts
var electron_1 = require("electron");
/*
main.ts에서 BrowserWindow 생성 시 preload 옵션으로 지정되어, 렌더러 프로세스가 로드되기 전에 실행
*/
// 메인 프로세스와 렌더러 프로세스 간의 안전한 통신을 위한 API 노출
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    // 스토어 관련 함수
    getStoreValue: function (key, defaultValue) {
        return electron_1.ipcRenderer.invoke("get-store-value", key, defaultValue);
    },
    setStoreValue: function (key, value) {
        return electron_1.ipcRenderer.send("set-store-value", key, value);
    },
    // 시스템 정보
    versions: {
        node: function () { return process.versions.node; },
        chrome: function () { return process.versions.chrome; },
        electron: function () { return process.versions.electron; },
    },
});
