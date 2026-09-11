export const RESUME_PATH = "/resume.pdf";
export const RESUME_FILENAME = "Prince_Chauhan_Resume.pdf";

/**
 * Triggers direct download or view of the canonical resume PDF.
 * Uses a direct anchor element with both download attribute and _blank target
 * to ensure graceful cross-origin iframe fallback.
 */
export function openOrDownloadResume(): void {
  if (typeof window === "undefined") return;
  const link = document.createElement("a");
  link.href = RESUME_PATH;
  link.download = RESUME_FILENAME;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
