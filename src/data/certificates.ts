import type { Certificate } from "@/types/portfolio";

export type { Certificate };

/**
 * Verified Certificates Registry
 *
 * Real, verifiable credentials only.
 * When real certificate files (image or PDF) and official verification URLs
 * are provided, add them to this array.
 *
 * Example specification:
 * {
 *   id: "cert-aws-ai",
 *   title: "AWS Certified AI Practitioner",
 *   issuer: "Amazon Web Services",
 *   issueDate: "2026-06",
 *   credentialId: "AWS-AI-829104",
 *   verificationUrl: "https://aws.amazon.com/verification",
 *   category: "AI/ML",
 *   technologies: ["Python", "SageMaker", "LLMs"],
 *   image: "/certificates/aws-ai.jpg",
 *   pdf: "/certificates/aws-ai.pdf",
 *   description: "Foundational machine learning and generative AI architectures."
 * }
 *
 * When this array is empty, the portfolio displays an elegant, verified empty state:
 * "Verified credentials are being added."
 * No mock or placeholder certificates are fabricated.
 */
export const CERTIFICATES: Certificate[] = [
  // When you upload your certificate image/pdf to public/certificates/
  // or have a verified credential URL, populate the entry here.
];

export function getVerifiedCertificates(): Certificate[] {
  return CERTIFICATES;
}

export function getCertificateById(id: string): Certificate | undefined {
  return CERTIFICATES.find((cert) => cert.id === id);
}
