# AI Work Changelog

## 2026-08-16 — Trust & Philosophy Section Redesign (Interactive 4-Slide Showcase & Video Anchor)
- **What changed**:
  - Implemented the exact Trust / Philosophy section below the Hero matching the reference mockup:
    - **Header**: `[ ✛ OUR PHILOSOPHY ]` badge, Fraunces serif headline (`Trusted Dental Care for a Brighter Smile.`), and Sora body description.
    - **Left Slideshow Panel (01–04)**: Dynamic interactive carousel featuring the 4 user slides:
      - 01: `Diagnostic Accuracy` (with real dental X-ray visual).
      - 02: `Gentle Care & Patient Comfort` (with dental treatment visual).
      - 03: `Precision in Every Detail` (with real clinical instruments visual).
      - 04: `Care Built Around You` (with doctor & patient consultation visual).
      - High-resolution dark vignette gradient, top-left titles, bottom-left descriptions, smooth crossfade transitions, auto-advance timer (5.5s), pause on hover, and interactive dash progress indicators.
    - **Right Panel (Video Anchor)**: Dedicated clinical treatment visual / video container with rounded borders (`22px`), HTML5 `<video>` autoplay/loop/muted support, fallback poster, and interactive bottom-right control button (`⏸` / `▶`).
    - **Typography**: Configured Fraunces for all headings, Sora for body/UI, and DM Mono (12px minimum) across the clinic interface.
    - **Responsiveness**: Stacks into single-column layout on mobile (390px) with responsive card heights and clean touch controls.
- **Files modified/added**:
  - `frontend/public/media/xray-diagnostics.jpg` [NEW]
  - `frontend/public/media/dental-instruments.jpg` [NEW]
  - `frontend/public/media/doctor-patient.jpg` [NEW]
  - `frontend/src/App.js` [MODIFIED]
  - `frontend/src/App.css` [MODIFIED]
  - `frontend/src/index.css` [MODIFIED]
  - `frontend/public/index.html` [MODIFIED]
- **Why**: User requested exact trust / philosophy section matching the provided reference mockup, with interactive slideshow on the left and video anchor on the right, along with instructions on how to supply custom video.
- **Verification**:
  - `yarn build` compiled successfully without warnings or errors.
  - Verified in browser with desktop (1440x900) and mobile (390x844) viewports.

## 2026-08-16 — Oralic Hero & Navbar Redesign (v5 Ticker, Gradient Nav & Entry Animation)
- **What changed**:
  - Replaced the static top utility bar with an animated Discount & Announcement News Ticker Strip featuring a smooth continuous infinite loop (`20% OFF on Advanced Tooth Implants`, `Complimentary Consultation`, etc.) linked to WhatsApp.
  - Added a frosted glass top-to-bottom transparency gradient blur on the navbar (`linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.52) 100%)`).
  - Added a staggered smooth fade and slide-up entrance animation for the hero badge, headline, copy, and CTAs on initial load (preserving standard text without typewriter for hero text).
  - Maintained the typewriter effect exclusively for the compact Google review card quote.
- **Files modified/added**:
  - `frontend/public/media/dental-clinica-logo.png` [NEW]
  - `frontend/public/media/hero-treatment.jpg` [NEW]
  - `frontend/src/App.js` [MODIFIED]
  - `frontend/src/App.css` [MODIFIED]
  - `frontend/package.json` [MODIFIED]
  - `frontend/craco.config.js` [MODIFIED]
- **Why**: Addressed user request for a news headline offer ticker strip, top-to-bottom frosted transparent gradient navbar, and smooth entry animation for hero text.
- **Verification**:
  - `yarn build` compiled successfully without warnings or errors.
  - Verified in browser with desktop (1440px), mobile (390px), and recorded session WebP artifacts.
