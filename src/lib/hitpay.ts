import crypto from "crypto";

/**
 * Verifies the HitPay Webhook Signature using HMAC-SHA256.
 * Security Note: Never trust webhooks without verifying the signature against the dashboard salt.
 * 
 * @param rawBody The raw text payload of the webhook request
 * @param signature The signature provided in the headers
 * @returns boolean true if valid, false if tampering occurred
 */
export function verifyHitPaySignature(rawBody: string, signature: string): boolean {
  const salt = process.env.HITPAY_SALT;
  if (!salt) {
    console.error("CRITICAL: HITPAY_SALT is missing from environment variables.");
    return false;
  }

  const hash = crypto.createHmac("sha256", salt).update(rawBody).digest("hex");
  return hash === signature;
}
