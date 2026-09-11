import type { Certificate } from "@/types/portfolio";

export type { Certificate };

/**
 * Verified Certificates Registry
 *
 * In accordance with strict engineering integrity:
 * No placeholder or invented certificates are fabricated.
 * Only verified certificates with official credentials are listed.
 * Future verified credentials will be registered here.
 */
export const CERTIFICATES: Certificate[] = [];

export function getVerifiedCertificates(): Certificate[] {
  return CERTIFICATES;
}

export function getCertificateById(id: string): Certificate | undefined {
  return CERTIFICATES.find((cert) => cert.id === id);
}
