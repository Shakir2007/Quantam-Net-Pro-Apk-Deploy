# QuantamNetPro Android APK Hub

High-performance deployment and download portal for the official QuantamNetPro Android APK.

## Features
- Dynamic Versioning via `version.json`
- Automatic QR Code Generation for Direct Mobile Download
- Real-time SHA-256 Checksum Verification
- Cyber Luxe Glassmorphic UI with Responsive Mobile Mockup
- Ready for Cloudflare Workers / Custom Domain deployment

## How to Update App Version
1. Place the new APK in `downloads/` (e.g. `QuantamNetPro-v1.1.0.apk`).
2. Update `version.json` with the new version number, file size, SHA256 checksum, and changelog (`whatsNew`).
3. Commit and push to Git. The live portal updates dynamically!
