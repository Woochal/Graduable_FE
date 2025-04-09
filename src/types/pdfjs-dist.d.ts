// src/types/pdfjs-dist.d.ts
declare module "pdfjs-dist/build/pdf" {
	export * from "pdfjs-dist";
}
declare module "pdfjs-dist/build/pdf.worker.entry" {
	const workerEntry: string;
	export default workerEntry;
}
