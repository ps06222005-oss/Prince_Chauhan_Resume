export const RESUME_PATH = "/resume.pdf";
export const RESUME_FILENAME = "Prince_Chauhan_Resume.pdf";

/**
 * Opens the canonical resume PDF in a new browser tab for direct viewing without forced download.
 */
export function openResume(): void {
  if (typeof window === "undefined") return;
  const link = document.createElement("a");
  link.href = RESUME_PATH;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const openOrDownloadResume = openResume;
