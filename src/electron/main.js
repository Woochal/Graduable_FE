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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// electron/main.ts
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var electron_1 = require("electron");
var node_path_1 = __importDefault(require("node:path"));
var electron_store_1 = __importDefault(require("electron-store"));
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var fs_1 = __importDefault(require("fs"));
// 프로덕션 모드 감지 로직 강화
var isProd = process.env.NODE_ENV === "production" || electron_1.app.isPackaged;
var store = new electron_store_1.default();
// 개발 환경에서 SSL 인증서 검증 무시
if (!isProd) {
    electron_1.app.commandLine.appendSwitch("ignore-certificate-errors");
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
}
// userData 경로 설정
if (!isProd) {
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
// 디렉토리 및 파일 존재 여부 확인 함수
var isPathValid = function (filePath) {
    try {
        return fs_1.default.existsSync(filePath);
    }
    catch (err) {
        console.error("Error checking path: ".concat(filePath), err);
        return false;
    }
};
// 디렉토리 내용 로그 출력 함수
var logDirectoryContents = function (dirPath) {
    try {
        if (isPathValid(dirPath)) {
            console.log("Contents of directory ".concat(dirPath, ":"));
            var items = fs_1.default.readdirSync(dirPath);
            items.forEach(function (item) {
                try {
                    var itemPath = node_path_1.default.join(dirPath, item);
                    var stats = fs_1.default.statSync(itemPath);
                    console.log("  ".concat(item, " (").concat(stats.isDirectory() ? 'directory' : 'file', ")"));
                }
                catch (err) {
                    console.error("  Error reading ".concat(item, ":"), err);
                }
            });
        }
        else {
            console.log("Directory does not exist: ".concat(dirPath));
        }
    }
    catch (err) {
        console.error("Error reading directory: ".concat(dirPath), err);
    }
};
// 메인 윈도우 생성
var createMainWindow = function () { return __awaiter(void 0, void 0, void 0, function () {
    var windowConfig, possiblePaths, indexPath, _i, possiblePaths_1, p, err_1, fileUrl, urlErr_1, extraResourcesPaths, foundExtraPath, _a, extraResourcesPaths_1, extraPath, searchResult, err_2, port, size;
    return __generator(this, function (_b) {
        switch (_b.label) {
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
                // 환경 정보 출력
                console.log("App Path:", electron_1.app.getAppPath());
                console.log("Exe Path:", electron_1.app.getPath("exe"));
                console.log("Is Packaged:", electron_1.app.isPackaged);
                console.log("Current Working Directory:", process.cwd());
                console.log("Resources Path:", process.resourcesPath);
                console.log("NODE_ENV:", process.env.NODE_ENV);
                if (!isProd) return [3 /*break*/, 20];
                // 주요 앱 디렉토리 내용 로그
                logDirectoryContents(electron_1.app.getAppPath());
                logDirectoryContents(node_path_1.default.dirname(electron_1.app.getPath("exe")));
                if (process.resourcesPath) {
                    logDirectoryContents(process.resourcesPath);
                    logDirectoryContents(node_path_1.default.join(process.resourcesPath, "app"));
                    logDirectoryContents(node_path_1.default.join(process.resourcesPath, "app", "dist"));
                    logDirectoryContents(node_path_1.default.join(process.resourcesPath, "dist"));
                }
                possiblePaths = __spreadArray(__spreadArray([], findAllPossibleIndexPaths(), true), [
                    // 기존 경로들
                    node_path_1.default.join(electron_1.app.getAppPath(), "dist", "index.html"),
                    node_path_1.default.join(process.resourcesPath, "app", "dist", "index.html"),
                    node_path_1.default.join(process.resourcesPath, "dist", "index.html"),
                    node_path_1.default.join(electron_1.app.getPath("exe"), "../resources/dist/index.html"),
                    node_path_1.default.join(electron_1.app.getPath("exe"), "../resources/app/dist/index.html"),
                    node_path_1.default.join(process.resourcesPath, "app.asar", "dist", "index.html"),
                    node_path_1.default.join(process.resourcesPath, "app.asar.unpacked", "dist", "index.html"),
                    node_path_1.default.join(process.cwd(), "dist", "index.html"),
                    node_path_1.default.join(process.cwd(), "resources", "app", "dist", "index.html"),
                ], false);
                indexPath = '';
                // 실제로 존재하는 경로 찾기
                for (_i = 0, possiblePaths_1 = possiblePaths; _i < possiblePaths_1.length; _i++) {
                    p = possiblePaths_1[_i];
                    console.log("Checking path:", p);
                    if (isPathValid(p)) {
                        indexPath = p;
                        console.log("Found index.html at:", indexPath);
                        break;
                    }
                }
                if (!indexPath) return [3 /*break*/, 9];
                console.log("Loading file from:", indexPath);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 8]);
                return [4 /*yield*/, mainWindow.loadFile(indexPath)];
            case 2:
                _b.sent();
                console.log("Successfully loaded index.html");
                return [3 /*break*/, 8];
            case 3:
                err_1 = _b.sent();
                console.error("Error loading file:", err_1);
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                fileUrl = "file://".concat(indexPath);
                console.log("Trying with file URL:", fileUrl);
                return [4 /*yield*/, mainWindow.loadURL(fileUrl)];
            case 5:
                _b.sent();
                console.log("Successfully loaded with file URL");
                return [3 /*break*/, 7];
            case 6:
                urlErr_1 = _b.sent();
                console.error("Failed to load with file URL:", urlErr_1);
                return [3 /*break*/, 7];
            case 7: return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 19];
            case 9:
                console.error("Could not find index.html in any expected location");
                _b.label = 10;
            case 10:
                _b.trys.push([10, 18, , 19]);
                extraResourcesPaths = [
                    node_path_1.default.join(process.resourcesPath, "app", "dist", "index.html"),
                    node_path_1.default.join(process.resourcesPath, "dist", "index.html"),
                ];
                foundExtraPath = false;
                _a = 0, extraResourcesPaths_1 = extraResourcesPaths;
                _b.label = 11;
            case 11:
                if (!(_a < extraResourcesPaths_1.length)) return [3 /*break*/, 14];
                extraPath = extraResourcesPaths_1[_a];
                console.log("Trying extraResources path:", extraPath);
                if (!isPathValid(extraPath)) return [3 /*break*/, 13];
                console.log("Found index.html in extraResources:", extraPath);
                return [4 /*yield*/, mainWindow.loadFile(extraPath)];
            case 12:
                _b.sent();
                foundExtraPath = true;
                return [3 /*break*/, 14];
            case 13:
                _a++;
                return [3 /*break*/, 11];
            case 14:
                if (!!foundExtraPath) return [3 /*break*/, 17];
                // 파일 시스템 전체 검색
                console.log("Searching for index.html recursively...");
                searchResult = findIndexHtmlRecursively(process.resourcesPath);
                if (!searchResult) return [3 /*break*/, 16];
                console.log("Found index.html through recursive search:", searchResult);
                return [4 /*yield*/, mainWindow.loadFile(searchResult)];
            case 15:
                _b.sent();
                return [3 /*break*/, 17];
            case 16:
                // 최후의 수단: 개발 서버에서 로드 (빌드된 파일 못 찾는 경우)
                console.error("Failed to find index.html through all methods");
                displayErrorPage("Could not find index.html file");
                _b.label = 17;
            case 17: return [3 /*break*/, 19];
            case 18:
                err_2 = _b.sent();
                console.error("Final attempt failed:", err_2);
                displayErrorPage("Error: ".concat(err_2.message));
                return [3 /*break*/, 19];
            case 19: return [3 /*break*/, 22];
            case 20:
                port = process.argv[2] || 5173;
                return [4 /*yield*/, mainWindow.loadURL("http://localhost:".concat(port, "/"))];
            case 21:
                _b.sent();
                _b.label = 22;
            case 22:
                size = mainWindow.getSize();
                console.log("Window size: ".concat(size[0], "x").concat(size[1]));
                // 디버깅 도움을 위해 개발자 도구 열기 (배포 버전에서도 문제 진단을 위해)
                mainWindow.webContents.openDevTools();
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
// 에러 페이지 표시
function displayErrorPage(errorMessage) {
    if (mainWindow) {
        mainWindow.webContents.loadURL("data:text/html,<html><body>\n\t\t\t<h1>Failed to load application</h1>\n\t\t\t<p>".concat(errorMessage, "</p>\n\t\t\t<h2>Debug Information</h2>\n\t\t\t<pre>\nApp Path: ").concat(electron_1.app.getAppPath(), "\nExe Path: ").concat(electron_1.app.getPath("exe"), "\nIs Packaged: ").concat(electron_1.app.isPackaged, "\nCurrent Working Directory: ").concat(process.cwd(), "\nResources Path: ").concat(process.resourcesPath, "\nNODE_ENV: ").concat(process.env.NODE_ENV, "\n\t\t\t</pre>\n\t\t</body></html>"));
    }
}
// 모든 가능한 index.html 경로 찾기
function findAllPossibleIndexPaths() {
    var baseLocations = [
        electron_1.app.getAppPath(),
        process.resourcesPath,
        node_path_1.default.dirname(electron_1.app.getPath("exe")),
        process.cwd(),
        node_path_1.default.join(process.resourcesPath, "app"),
        node_path_1.default.join(process.resourcesPath, "app.asar"),
        node_path_1.default.join(process.resourcesPath, "app.asar.unpacked"),
    ];
    var subPaths = [
        "dist",
        "app/dist",
        "resources/dist",
        "resources/app/dist",
    ];
    var result = [];
    for (var _i = 0, baseLocations_1 = baseLocations; _i < baseLocations_1.length; _i++) {
        var base = baseLocations_1[_i];
        if (!base)
            continue;
        // 기본 경로에 index.html이 있는지 확인
        result.push(node_path_1.default.join(base, "index.html"));
        // 하위 경로 조합
        for (var _a = 0, subPaths_1 = subPaths; _a < subPaths_1.length; _a++) {
            var sub = subPaths_1[_a];
            result.push(node_path_1.default.join(base, sub, "index.html"));
        }
    }
    return result;
}
// index.html 파일 재귀적 검색
function findIndexHtmlRecursively(startDir, maxDepth) {
    if (maxDepth === void 0) { maxDepth = 3; }
    if (maxDepth <= 0)
        return null;
    try {
        if (!isPathValid(startDir))
            return null;
        var files = fs_1.default.readdirSync(startDir);
        // 현재 디렉토리에서 index.html 찾기
        var indexHtml = files.find(function (file) { return file === 'index.html'; });
        if (indexHtml) {
            return node_path_1.default.join(startDir, indexHtml);
        }
        // dist 디렉토리 우선 확인
        var distDir = files.find(function (file) { return file === 'dist' &&
            fs_1.default.statSync(node_path_1.default.join(startDir, file)).isDirectory(); });
        if (distDir) {
            var distPath = node_path_1.default.join(startDir, distDir);
            var inDist = findIndexHtmlRecursively(distPath, maxDepth - 1);
            if (inDist)
                return inDist;
        }
        // 다른 하위 디렉토리 확인
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            var filePath = node_path_1.default.join(startDir, file);
            try {
                if (fs_1.default.statSync(filePath).isDirectory() && file !== 'dist') {
                    var found = findIndexHtmlRecursively(filePath, maxDepth - 1);
                    if (found)
                        return found;
                }
            }
            catch (err) {
                console.error("Error checking directory ".concat(filePath, ":"), err);
            }
        }
    }
    catch (err) {
        console.error("Error searching directory ".concat(startDir, ":"), err);
    }
    return null;
}
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
// 콘솔 로그를 렌더러 프로세스로 보내는 함수
var sendLogToRenderer = function (message) {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send("main-process-log", message);
    }
};
// 콘솔 로그 재정의
var originalConsoleLog = console.log;
var originalConsoleError = console.error;
console.log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var message = args.map(function (arg) {
        return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
    }).join(' ');
    originalConsoleLog.apply(console, args);
    sendLogToRenderer("[LOG] ".concat(message));
};
console.error = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var message = args.map(function (arg) {
        return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
    }).join(' ');
    originalConsoleError.apply(console, args);
    sendLogToRenderer("[ERROR] ".concat(message));
};
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
