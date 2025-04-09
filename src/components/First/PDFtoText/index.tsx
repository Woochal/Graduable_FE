import type React from "react";
import { useState } from "react";
import PDFTextExtractor from "./PdfTextExtractor";

export default function PDFtoText() {
	const [pdfFile, setPdfFile] = useState<File | null>(null);

	// 파일 업로드 핸들러
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			// PDF 파일인지 확인
			if (file.type === "application/pdf") {
				setPdfFile(file);
			} else {
				alert("PDF 파일만 업로드할 수 있습니다.");
				e.target.value = "";
			}
		}
	};

	return (
		<div className="app">
			<h1>PDF 텍스트 추출 및 편집기</h1>

			<div className="file-upload">
				<input
					type="file"
					accept=".pdf"
					onChange={handleFileChange}
					id="pdf-upload"
				/>
				<label htmlFor="pdf-upload">PDF 파일 선택</label>
				{pdfFile && <p>선택된 파일: {pdfFile.name}</p>}
			</div>

			<PDFTextExtractor pdfFile={pdfFile} />
		</div>
	);
}
