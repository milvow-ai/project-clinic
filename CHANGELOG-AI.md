# AI Work Changelog

## 2026-08-16 — Oralic Hero & Navbar Redesign (v2 Brand Alignment)
- **What changed**:
  - Replaced the dark theme header with a clean white/frosted navbar (`rgba(255, 255, 255, 0.96)` with blur).
  - Swapped navbar positions to place site navigation links (`ABOUT`, `TREATMENTS`, `REVIEWS`, `GALLERY`, `CONTACT`) on the left, the real clinic brand logo in the center, and the animated "BOOK APPOINTMENT" button on the right.
  - Implemented the custom animated button with solid red background, white text, dot-to-arrow morph and text flip animation on hover, and removed all glowing box-shadows.
  - Sized and aligned the hero typography (H1 & copy) cleanly to match the Oralic structure.
  - Updated eyebrow badge text to `SINCE 2018 — TRUSTED DENTAL CARE`.
  - Added a compact Oralic-style real Google Review card for patient Taniya Zabeen with 5 red stars, quote, and tooth avatar, positioned at the bottom right on desktop and stacked neatly on mobile.
- **Files modified/added**:
  - `frontend/public/media/dental-clinica-logo.png` [NEW]
  - `frontend/public/media/hero-treatment.jpg` [NEW]
  - `frontend/src/App.js` [MODIFIED]
  - `frontend/src/App.css` [MODIFIED]
  - `frontend/craco.config.js` [MODIFIED]
- **Why**: Addressed user review feedback to use real clinic branding, correct navbar alignment/swapping, remove red glow shadow, update badge year to 2018, and place compact Taniya Zabeen Google review card.
- **Verification**:
  - `yarn build` compiled successfully without warnings or errors.
  - Verified in browser with desktop and mobile screenshots.
