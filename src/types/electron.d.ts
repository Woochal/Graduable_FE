/*
타입 안전성 제공: 렌더러 프로세스(웹 페이지)에서 window.electronAPI를 통해 메인 프로세스와 통신할 때, 올바른 메서드와 매개변수를 사용하고 있는지 확인.
코드 자동 완성: 개발 중에 IDE(예: VS Code)에서 window.electronAPI.를 입력하면 사용 가능한 메서드들(getStoreValue, setStoreValue, versions)이 자동으로 제안.
컴파일 시 오류 검출: 잘못된 메서드나 매개변수 형식을 사용할 경우, 코드를 실행하기 전에 타입스크립트 컴파일러가 오류를 감지.
문서화 역할: 코드를 읽는 다른 개발자에게 API의 구조와 사용 방법에 대한 정보를 제공.

이 파일은 실제 런타임에는 영향을 주지 않고 즉, 자바스크립트로 컴파일된 후에는 이 타입 정의가 코드에서 완전히 제거. 
단지 개발 과정에서 코드의 정확성을 보장하기 위한 도구로 사용.

window.electronAPI가 사용되는 모든 부분이 이 파일의 영향을 받음
없어도 코드는 동작함
개발 환경에서 코드의 품질과 안정성을 향상시키는 역할
*/

interface ElectronAPI {
	getStoreValue: <T>(key: string, defaultValue?: T) => Promise<T>;
	setStoreValue: <T>(key: string, value: T) => void;
	versions: {
		node: () => string;
		chrome: () => string;
		electron: () => string;
	};
}

declare global {
	interface Window {
		electronAPI: ElectronAPI;
	}
}

export {};
