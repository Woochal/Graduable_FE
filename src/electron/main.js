"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 필요한 모듈 가져오기
var electron_1 = require("electron");
var electron_serve_1 = __importDefault(require("electron-serve"));
var node_path_1 = __importDefault(require("node:path"));
var electron_store_1 = __importDefault(require("electron-store"));
// 프로덕션 환경인지 확인
var isProd = process.env.NODE_ENV === "production";
// 스토어 인스턴스 생성
var store = new electron_store_1.default();
// 프로덕션 모드에서는 정적 파일 서빙
if (isProd) {
    (0, electron_serve_1.default)({ directory: "out" });
}
else {
    // 개발 모드에서는 별도의 사용자 데이터 경로 사용
    electron_1.app.setPath("userData", "".concat(electron_1.app.getPath("userData"), " (development)"));
}
// 메인 윈도우 변수
var mainWindow = null;
// 메인 윈도우 생성 함수
var createMainWindow = function () { return __awaiter(void 0, void 0, void 0, function () {
    var windowConfig, port;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                windowConfig = store.get("window-config") || {};
                //const { width, height } = screen.getPrimaryDisplay().workAreaSize;
                // 메인 윈도우 생성
                mainWindow = new electron_1.BrowserWindow({
                    width: 2000, // 고정된 기본 너비 설정
                    height: 1400, // 고정된 기본 높이 설정
                    minWidth: 1200, // 최소 너비 설정
                    minHeight: 800, // 최소 높이 설정
                    x: windowConfig.x,
                    y: windowConfig.y,
                    webPreferences: {
                        nodeIntegration: false, // 보안을 위해 비활성화
                        contextIsolation: true, // 보안을 위해 활성화
                        preload: node_path_1.default.join(__dirname, "preload.js"), // preload 스크립트 경로
                    },
                });
                if (!isProd) return [3 /*break*/, 2];
                return [4 /*yield*/, mainWindow.loadURL("app://./index.html")];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                port = process.argv[2] || 5173;
                return [4 /*yield*/, mainWindow.loadURL("http://localhost:".concat(port, "/"))];
            case 3:
                _a.sent();
                mainWindow.webContents.openDevTools(); // 개발 모드에서 개발자 도구 열기
                _a.label = 4;
            case 4:
                // 창 위치 및 크기 저장
                mainWindow.on("close", function () {
                    if (!(mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.isMaximized())) {
                        var bounds = mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.getBounds();
                        if (bounds) {
                            store.set("window-config", bounds);
                        }
                    }
                });
                // 창이 닫힐 때 메인 윈도우 변수 초기화
                mainWindow.on("closed", function () {
                    mainWindow = null;
                });
                return [2 /*return*/];
        }
    });
}); };
// IPC 통신 설정: 스토어 값 가져오기
electron_1.ipcMain.handle("get-store-value", function (_, key, defaultValue) {
    return store.get(key, defaultValue);
});
// IPC 통신 설정: 스토어 값 저장하기
electron_1.ipcMain.on("set-store-value", function (_, key, value) {
    store.set(key, value);
});
// 앱이 준비되면 메인 윈도우 생성
electron_1.app.on("ready", createMainWindow);
// 모든 창이 닫히면 앱 종료 (macOS 제외)
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// macOS에서 앱 아이콘 클릭 시 창이 없으면 새로 생성
electron_1.app.on("activate", function () {
    if (mainWindow === null) {
        createMainWindow();
    }
});
