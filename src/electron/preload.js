"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// electron/preload.ts
var electron_1 = require("electron");
var node_process_1 = __importDefault(require("node:process"));
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
        node: function () { return node_process_1.default.versions.node; },
        chrome: function () { return node_process_1.default.versions.chrome; },
        electron: function () { return node_process_1.default.versions.electron; },
    },
    // 디버깅 정보
    debug: {
        getProcessInfo: function () { return ({
            platform: node_process_1.default.platform,
            arch: node_process_1.default.arch,
            versions: node_process_1.default.versions,
            env: {
                NODE_ENV: node_process_1.default.env.NODE_ENV,
                isPackaged: node_process_1.default.env.NODE_ENV === 'production',
            },
            paths: {
                cwd: node_process_1.default.cwd(),
                execPath: node_process_1.default.execPath,
                resourcesPath: node_process_1.default.resourcesPath,
            }
        }); },
        onMainProcessLog: function (callback) {
            electron_1.ipcRenderer.on("main-process-log", function (_, message) { return callback(message); });
        }
    }
});
// 초기 디버깅 정보 출력
console.log("Preload script executed");
console.log("Node version:", node_process_1.default.versions.node);
console.log("Chrome version:", node_process_1.default.versions.chrome);
console.log("Electron version:", node_process_1.default.versions.electron);
console.log("Current working directory:", node_process_1.default.cwd());
console.log("Process path:", node_process_1.default.execPath);
console.log("Resources path:", node_process_1.default.resourcesPath);
