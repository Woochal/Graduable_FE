"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// electron/preload.ts
var electron_1 = require("electron");
// 렌더러에서 사용할 Electron API 노출
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    // Store 관련
    getStoreValue: function (key) { return electron_1.ipcRenderer.invoke("get-store-value", key); },
    setStoreValue: function (key, value) {
        return electron_1.ipcRenderer.invoke("set-store-value", key, value);
    },
    removeStoreValue: function (key) {
        return electron_1.ipcRenderer.invoke("remove-store-value", key);
    }, // 추가
    // Auth 관련
    openGoogleAuth: function () { return electron_1.ipcRenderer.invoke("open-google-auth"); },
    onOAuthSuccess: function (callback) {
        electron_1.ipcRenderer.on("oauth-success", function (_, userData) { return callback(userData); });
    },
    onOAuthError: function (callback) {
        electron_1.ipcRenderer.on("oauth-error", function (_, error) { return callback(error); });
    },
    removeAuthListeners: function () {
        electron_1.ipcRenderer.removeAllListeners("oauth-success");
        electron_1.ipcRenderer.removeAllListeners("oauth-error");
    },
    logout: function () { return electron_1.ipcRenderer.invoke("logout"); },
    // 시스템 정보
    versions: {
        node: function () { return process.versions.node; },
        chrome: function () { return process.versions.chrome; },
        electron: function () { return process.versions.electron; },
    },
});
