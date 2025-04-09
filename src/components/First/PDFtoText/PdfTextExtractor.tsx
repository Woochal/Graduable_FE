import type React from "react";
import { useState, useCallback, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs-dist/build/pdf.worker.mjs";

interface PDFTextExtractorProps {
	pdfFile: File | null;
}

const PDFTextExtractor = ({ pdfFile }: PDFTextExtractorProps) => {
	const [extractedText, setExtractedText] = useState<string>("");
	const [editedText, setEditedText] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// PDF에서 텍스트 추출 함수
	const extractTextFromPDF = useCallback(async (file: File) => {
		setIsLoading(true);
		setError(null);

		try {
			// 파일을 ArrayBuffer로 읽기
			const arrayBuffer = await file.arrayBuffer();

			// PDF 문서 로드
			const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
			const pdf = await loadingTask.promise;

			let fullText = "";

			// 모든 페이지에서 텍스트 추출
			for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
				const page = await pdf.getPage(pageNum);
				const textContent = await page.getTextContent();

				// 텍스트 항목 결합
				const pageText = textContent.items
					.map((item) => (item as { str: string }).str)
					.join("");
				fullText += `${pageText}\n\n`;
			}

			setExtractedText(fullText);
			setEditedText(fullText); // 초기 편집 텍스트는 추출된 텍스트와 동일
			setIsLoading(false);
		} catch (err) {
			console.error("PDF 텍스트 추출 오류:", err);
			setError("PDF 파일에서 텍스트를 추출하는 중 오류가 발생했습니다.");
			setIsLoading(false);
		}
	}, []);

	//extractTextFromPDF 함수는 메모이제이션되고, pdfFile이 변경될 때만 useEffect가 실행
	useEffect(() => {
		if (pdfFile) {
			extractTextFromPDF(pdfFile);
		}
	}, [pdfFile, extractTextFromPDF]);

	// 텍스트 편집 핸들러
	//TypeScript에서 타입 안전성을 확보하기 위해 사용

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditedText(e.target.value);
	};

	// 다운로드 핸들러 (수정된 텍스트를 .txt 파일로 저장)
	// const handleDownloadText = () => {
	// 	const blob = new Blob([editedText], { type: "text/plain" });
	// 	const url = URL.createObjectURL(blob);
	// 	const a = document.createElement("a");
	// 	a.href = url;
	// 	a.download = `${pdfFile?.name.replace(".pdf", "")}_edited.txt`;
	// 	document.body.appendChild(a);
	// 	a.click();
	// 	document.body.removeChild(a);
	// 	URL.revokeObjectURL(url);
	// };

	if (isLoading) {
		return <div>PDF에서 텍스트를 추출 중입니다...</div>;
	}

	if (error) {
		return <div className="error">{error}</div>;
	}

	return (
		<div className="pdf-text-extractor">
			{extractedText ? (
				<>
					<h3>추출된 텍스트 (편집 가능)</h3>
					<textarea
						value={editedText}
						onChange={handleTextChange}
						rows={20}
						cols={80}
						style={{ width: "100%", minHeight: "400px" }}
					/>
					{/* <button
						type="button"
						onClick={handleDownloadText}
						disabled={!editedText}
					>
						텍스트 다운로드
					</button> */}
				</>
			) : (
				<div>PDF 파일을 업로드하면 텍스트가 여기에 표시됩니다.</div>
			)}
		</div>
	);
};

export default PDFTextExtractor;
