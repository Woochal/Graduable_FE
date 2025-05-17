"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
// electron/main.ts
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var electron_1 = require("electron");
var electron_serve_1 = __importDefault(require("electron-serve"));
var node_path_1 = __importDefault(require("node:path"));
var electron_store_1 = __importDefault(require("electron-store"));
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var isProd = process.env.NODE_ENV === "production";
var store = new electron_store_1.default();
// 개발 환경에서 SSL 인증서 검증 무시
if (!isProd) {
    electron_1.app.commandLine.appendSwitch("ignore-certificate-errors");
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
}
if (isProd) {
    (0, electron_serve_1.default)({ directory: "out" });
}
else {
    electron_1.app.setPath("userData", "".concat(electron_1.app.getPath("userData"), " (development)"));
}
var mainWindow = null;
var authWindow = null;
var authServer = null;
// 사용 가능한 포트 찾기
var findAvailablePort = function () {
    return new Promise(function (resolve) {
        var server = (0, express_1.default)().listen(0, "localhost", function () {
            var port = server.address().port;
            server.close(function () { return resolve(port); });
        });
    });
};
// OAuth 로컬 서버 시작
var startAuthServer = function (port) {
    return new Promise(function (resolve) {
        var app = (0, express_1.default)();
        app.get("/auth/callback", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, code, error, tokenResponse, access_token, userResponse, userData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, code = _a.code, error = _a.error;
                        if (error) {
                            res.send("\n\t\t\t\t\t<html>\n\t\t\t\t\t\t<body>\n\t\t\t\t\t\t\t<h1>\uC778\uC99D \uC2E4\uD328</h1>\n\t\t\t\t\t\t\t<p>".concat(error, "</p>\n\t\t\t\t\t\t</body>\n\t\t\t\t\t</html>\n\t\t\t\t"));
                            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send("oauth-error", error);
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.post("https://oauth2.googleapis.com/token", {
                                code: code,
                                client_id: process.env.VITE_GOOGLE_CLIENT_ID,
                                client_secret: process.env.VITE_GOOGLE_CLIENT_SECRET,
                                redirect_uri: "http://localhost:".concat(port, "/auth/callback"),
                                grant_type: "authorization_code",
                            })];
                    case 2:
                        tokenResponse = _b.sent();
                        access_token = tokenResponse.data.access_token;
                        return [4 /*yield*/, axios_1.default.get("https://www.googleapis.com/oauth2/v2/userinfo", {
                                headers: { Authorization: "Bearer ".concat(access_token) },
                            })];
                    case 3:
                        userResponse = _b.sent();
                        userData = userResponse.data;
                        // 메인 창으로 사용자 정보 전달
                        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send("oauth-success", {
                            googleId: userData.id,
                            email: userData.email,
                            name: userData.name,
                        });
                        res.send("\n\t\t\t\t\t<html>\n\t\t\t\t\t\t<body>\n\t\t\t\t\t\t\t<h1>\uC778\uC99D \uC131\uACF5!</h1>\n\t\t\t\t\t\t\t<p>\uC774 \uCC3D\uC740 \uC790\uB3D9\uC73C\uB85C \uB2EB\uD799\uB2C8\uB2E4.</p>\n\t\t\t\t\t\t\t<script>\n\t\t\t\t\t\t\t\tsetTimeout(() => { window.close(); }, 1500);\n\t\t\t\t\t\t\t</script>\n\t\t\t\t\t\t</body>\n\t\t\t\t\t</html>\n\t\t\t\t");
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error("OAuth 처리 실패:", error_1);
                        res.status(500).send("인증 처리 중 오류가 발생했습니다.");
                        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send("oauth-error", "인증 실패");
                        return [3 /*break*/, 5];
                    case 5:
                        if (authWindow && !authWindow.isDestroyed()) {
                            setTimeout(function () {
                                authWindow === null || authWindow === void 0 ? void 0 : authWindow.close();
                            }, 2000);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        authServer = app.listen(port, "localhost", function () {
            console.log("OAuth \uC11C\uBC84 \uC2DC\uC791: http://localhost:".concat(port));
            resolve();
        });
    });
};
// Google OAuth 창 생성
var createAuthWindow = function () { return __awaiter(void 0, void 0, void 0, function () {
    var port, clientId, redirectUri, authUrl, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, findAvailablePort()];
            case 1:
                port = _a.sent();
                return [4 /*yield*/, startAuthServer(port)];
            case 2:
                _a.sent();
                authWindow = new electron_1.BrowserWindow({
                    width: 600,
                    height: 700,
                    webPreferences: {
                        nodeIntegration: false,
                        contextIsolation: true,
                    },
                    parent: mainWindow || undefined,
                    modal: true,
                });
                clientId = process.env.VITE_GOOGLE_CLIENT_ID;
                if (!clientId) {
                    console.error("Google Client ID가 설정되지 않았습니다!");
                    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send("oauth-error", "Client ID가 설정되지 않았습니다.");
                    return [2 /*return*/];
                }
                redirectUri = "http://localhost:".concat(port, "/auth/callback");
                authUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
                    "client_id=".concat(clientId, "&") +
                    "redirect_uri=".concat(encodeURIComponent(redirectUri), "&") +
                    "response_type=code&" +
                    "scope=openid email profile&" +
                    "access_type=offline&" +
                    "prompt=consent";
                authWindow.loadURL(authUrl);
                authWindow.on("closed", function () {
                    authWindow = null;
                    if (authServer) {
                        authServer.close();
                        authServer = null;
                    }
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("OAuth 창 생성 실패:", error_2);
                if (authServer) {
                    authServer.close();
                    authServer = null;
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// 메인 윈도우 생성
var createMainWindow = function () { return __awaiter(void 0, void 0, void 0, function () {
    var windowConfig, port, size;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                windowConfig = store.get("window-config") || {};
                mainWindow = new electron_1.BrowserWindow({
                    width: 1280,
                    height: 832,
                    minWidth: 1280,
                    minHeight: 800,
                    useContentSize: true, // width/height가 콘텐츠 크기만으로 되도록. 이거 없으면 앱 상단 메뉴도 포함되서 계산됨
                    x: windowConfig.x,
                    y: windowConfig.y,
                    webPreferences: {
                        nodeIntegration: false,
                        contextIsolation: true,
                        preload: node_path_1.default.join(__dirname, "preload.js"),
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
                _a.label = 4;
            case 4:
                size = mainWindow.getSize();
                console.log("Window size: ".concat(size[0], "x").concat(size[1]));
                // // 창 크기 변경 시 로그 출력
                // mainWindow.on('resize', () => {
                // 	const newSize = mainWindow?.getSize();
                // 	if (newSize) {
                // 		console.log(`Window resized: ${newSize[0]}x${newSize[1]}`);
                // 	}
                // });
                mainWindow.on("close", function () {
                    if (!(mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.isMaximized())) {
                        var bounds = mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.getBounds();
                        if (bounds) {
                            store.set("window-config", bounds);
                        }
                    }
                });
                mainWindow.on("closed", function () {
                    mainWindow = null;
                });
                return [2 /*return*/];
        }
    });
}); };
// IPC 핸들러들
electron_1.ipcMain.handle("get-store-value", function (_, key) {
    return store.get(key);
});
electron_1.ipcMain.handle("set-store-value", function (_, key, value) {
    store.set(key, value);
});
electron_1.ipcMain.handle("open-google-auth", function () {
    createAuthWindow();
});
electron_1.ipcMain.handle("remove-store-value", function (_, key) {
    store.delete(key);
});
// 로그아웃 - user와 userInfo 모두 삭제
electron_1.ipcMain.handle("logout", function () {
    store.delete("user");
    store.delete("userInfo");
});
// 앱 이벤트 핸들러
electron_1.app.on("ready", createMainWindow);
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (mainWindow === null) {
        createMainWindow();
    }
});
