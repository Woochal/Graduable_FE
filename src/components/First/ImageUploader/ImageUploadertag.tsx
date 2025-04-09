import type { UploadedImage } from "../../../types/Image";
interface ImageUploadProps {
	inputRef: React.RefObject<HTMLInputElement | null>;
	image: UploadedImage | null;
	processFile: (file: File) => void;
	handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
	handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void;
	handleCancle: () => void;
}

export default function ImageUploaderTag({
	inputRef,
	image,
	processFile,
	handleDrop,
	handlePaste,
	handleCancle,
}: ImageUploadProps) {
	return (
		<div
			onDrop={handleDrop}
			onDragOver={(e) => e.preventDefault()}
			onPaste={handlePaste}
		>
			<div>
				{!image && (
					<div>
						<div>
							<span>📷</span>
						</div>
						<p>이미지를 드래그하거나 붙여넣으세요</p>
						<p>또는</p>
					</div>
				)}
				<input
					ref={inputRef}
					type="file"
					accept="image/*"
					style={{ display: "none" }}
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) {
							processFile(file);
						}
					}}
				/>
				<button type="button" onClick={() => inputRef.current?.click()}>
					파일 선택
				</button>
			</div>

			{image?.previewUrl && (
				<div>
					<img src={image?.previewUrl} alt="preview" />

					<button type="button" onClick={handleCancle}>
						취소
					</button>
				</div>
			)}
		</div>
	);
}

/*
서버 전송시 파일
const handleSubmit = async () => {
	const formData = new FormData();

	// 게시글 내용 등 JSON 데이터
	const postData = {
		title: "제목",
		content: "내용",
	};
	formData.append(
		"post",
		new Blob([JSON.stringify(postData)], { type: "application/json" })
	);

	// 이미지 첨부
	if (image?.file) {
		formData.append("file", image.file);
	}

	const res = await fetch("/api/post", {
		method: "POST",
		body: formData,
	});
	const result = await res.json();
	console.log(result);
};
*/
