/**
 * Electron 환경인지 확인하는 함수
 * @returns {boolean} Electron 환경이면 true, 아니면 false
 */
export const isElectron = (): boolean => {
    return window.electronAPI !== undefined;
};
