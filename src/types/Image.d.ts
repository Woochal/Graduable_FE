export interface UploadedImage {
	name: string;
	type: string;
	size: number;
	lastModified: number;
	file: File;
	previewUrl: string;
}
