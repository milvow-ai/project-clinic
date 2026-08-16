# AI Work Changelog

## 2026-08-16 — Oralic Hero & Navbar Redesign (v4 Typewriter & Scale Polish)
- **What changed**:
  - Reduced outer container padding to `width: min(1280px, calc(100% - 44px))` for balanced spacing without over-padding.
  - Enlarged the left hero content stack: bolder headline (`clamp(40px, 4.8vw, 60px)`), larger copy, badge, and CTA buttons.
  - Reduced review card dimensions (`max-width: 250px; padding: 12px 16px;`) and dropped it near the bottom border line (`margin-bottom: -15px`) to avoid covering the dentist and patient image.
  - Implemented an animated Typewriter effect for the patient Google review quote that writes out dynamically on initial load and each refresh, with a pulsing red cursor.
- **Files modified/added**:
  - `frontend/public/media/dental-clinica-logo.png` [NEW]
  - `frontend/public/media/hero-treatment.jpg` [NEW]
  - `frontend/src/App.js` [MODIFIED]
  - `frontend/src/App.css` [MODIFIED]
  - `frontend/package.json` [MODIFIED]
  - `frontend/craco.config.js` [MODIFIED]
- **Why**: Addressed user review feedback to scale up left hero elements, compact and drop the review card clear of the image subject, reduce excess padding, and add a typewriter animation for the review.
- **Verification**:
  - `yarn build` compiled successfully without warnings or errors.
  - Verified in browser with desktop (1440px), mobile (390px), and typewriter animation screenshots.
