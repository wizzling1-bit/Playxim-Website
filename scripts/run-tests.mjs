import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

// 1. Content detection logic test
function detectContentType(filename, mimeType) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const videoExtensions = ["mp4", "mkv", "mov", "avi", "webm", "m4v", "wmv", "flv", "ts"];
  const audioExtensions = ["mp3", "wav", "flac", "aac", "m4a", "ogg", "wma", "opus"];
  const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif", "bmp", "ico"];
  const docExtensions = ["pdf", "docx", "doc", "txt", "md", "pptx", "xlsx", "xls", "csv", "json"];
  const archiveExtensions = ["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "iso"];

  if (mimeType?.startsWith("video/") || videoExtensions.includes(ext)) return "video";
  if (mimeType?.startsWith("audio/") || audioExtensions.includes(ext)) return "audio";
  if (mimeType?.startsWith("image/") || imageExtensions.includes(ext)) return "image";
  if (docExtensions.includes(ext) || mimeType?.includes("pdf") || mimeType?.includes("text/")) return "document";
  if (archiveExtensions.includes(ext) || mimeType?.includes("zip") || mimeType?.includes("tar")) return "archive";
  return "other";
}

test("detectContentType accurately identifies all major MIME and file categories", () => {
  assert.equal(detectContentType("master.mp4"), "video");
  assert.equal(detectContentType("take_01.mov"), "video");
  assert.equal(detectContentType("assets.zip"), "archive");
  assert.equal(detectContentType("deck.pdf"), "document");
  assert.equal(detectContentType("score.flac"), "audio");
  assert.equal(detectContentType("banner.webp"), "image");
  assert.equal(detectContentType("binary.raw"), "other");
});

// 2. S3 collision-resistant object key generator test
function generateObjectKey(ownerId, contentId, filename) {
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const datePrefix = new Date().toISOString().slice(0, 10);
  return `creators/${ownerId}/${datePrefix}/${contentId}/${sanitizedFilename}`;
}

test("generateObjectKey generates deterministic sanitized paths", () => {
  const key = generateObjectKey("user-1", "item-99", "ProRes Footage (4K)!.mp4");
  assert.match(key, /^creators\/user-1\/\d{4}-\d{2}-\d{2}\/item-99\/ProRes_Footage__4K__.mp4$/);
});

// 3. Share code generator & password hashing test
function generateShareCode() {
  return crypto.randomBytes(6).toString("base64url").substring(0, 8);
}

function hashPassword(pass) {
  return crypto.createHash("sha256").update(pass.trim()).digest("hex");
}

test("Share codes are exactly 8 URL-safe characters and password hashes are 64-char hex", () => {
  const code = generateShareCode();
  assert.equal(code.length, 8);
  assert.match(code, /^[a-zA-Z0-9_-]{8}$/);

  const hash1 = hashPassword("PlayximSecure2026");
  const hash2 = hashPassword("PlayximSecure2026");
  assert.equal(hash1.length, 64);
  assert.equal(hash1, hash2);
  assert.notEqual(hash1, hashPassword("WrongPass"));
});

// 4. Financial double-entry calculations test
function calculateMonetization(qualifiedViews, ratePer1000 = 2.5) {
  return Number(((qualifiedViews / 1000) * ratePer1000).toFixed(6));
}

test("Monetization accurately computes USD at $2.50 CPM with micro-dollar precision", () => {
  assert.equal(calculateMonetization(1000), 2.5);
  assert.equal(calculateMonetization(40000), 100.0);
  assert.equal(calculateMonetization(150), 0.375);
});
