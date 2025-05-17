"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = createWindow;
// electron/helpers.ts
var electron_1 = require("electron");
var electron_store_1 = __importDefault(require("electron-store"));
// Store 타입 정의 (electron-store 패키지 사용)
//type ElectronStore = Store<{ [key: string]: WindowState }>;
// 창 생성 유틸리티 함수
function createWindow(windowName, options) {
    // 창 상태를 저장할 키
    var key = "window-state";
    // Store 인스턴스 생성 (특정 창의 상태를 저장)
    var store = new electron_store_1.default({
        name: windowName,
    });
    // 기본 창 크기 설정
    var defaultSize = {
        width: options.width || 1280,
        height: options.height || 832,
    };
    // 최소 크기 설정 (옵션에 정의되지 않았을 경우 기본값 사용)
    var minSize = {
        minWidth: options.minWidth || 800, // 원하는 최소 너비
        minHeight: options.minHeight || 600, // 원하는 최소 높이
    };
    // 이전에 저장된 창 상태 불러오기 (없으면 기본값 사용)
    var state = store.get(key) || defaultSize;
    // 창 생성 (저장된 상태와 옵션 병합)
    var win = new electron_1.BrowserWindow(__assign(__assign(__assign(__assign({}, options), state), minSize), { webPreferences: __assign({ nodeIntegration: false, contextIsolation: true }, options.webPreferences) }));
    // 창이 닫힐 때 상태 저장
    win.on("close", function () {
        if (!win.isMaximized()) {
            var bounds = win.getBounds();
            store.set(key, {
                width: bounds.width,
                height: bounds.height,
                x: bounds.x,
                y: bounds.y,
            });
        }
    });
    return win;
}
