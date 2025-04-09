import type React from "react";
import { useCallback, useRef, useState } from "react";
import type { UploadedImage } from "../../../types/Image";
import ImageUploaderTag from "./ImageUploadertag";

export default function ImageUploader() {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [image, setImage] = useState<UploadedImage | null>(null);

	// 이미지 인지 검사 후
	const processFile = useCallback((file: File) => {
		if (!file.type.startsWith("image/")) return;
		const imageData: UploadedImage = {
			name: file.name,
			type: file.type,
			size: file.size,
			lastModified: file.lastModified,
			file: file,
			previewUrl: URL.createObjectURL(file),
		};
		setImage(imageData);
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			const file = e.dataTransfer.files[0];
			if (file) {
				processFile(file);
			}
		},
		[processFile],
	);

	const handlePaste = useCallback(
		(e: React.ClipboardEvent<HTMLDivElement>) => {
			const items = e.clipboardData.items;
			for (const item of items) {
				if (item.type.startsWith("image/")) {
					const file = item.getAsFile();
					if (file) {
						processFile(file);
					}
				}
			}
		},
		[processFile],
	);

	const handleCancle = useCallback(() => {
		setImage(null);
		if (image?.previewUrl) {
			URL.revokeObjectURL(image.previewUrl);
		}
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}, [image]);

	const ImageUploadProps = {
		inputRef,
		image,
		processFile,
		handleDrop,
		handlePaste,
		handleCancle,
	};

	return <ImageUploaderTag {...ImageUploadProps} />;
}
