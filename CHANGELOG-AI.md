# AI Work Changelog

## 2026-08-17 — WHY / Experience the Difference Section (Editorial 3-Column Comparison Table)
- **What changed**:
  - Implemented the **WHY Section** immediately below the Services section:
    - **Header Composition**: `[ ✛ WHY US ]` signature pill badge with red plus icon in DM Mono, editorial Fraunces serif headline (`A more considered way to care.`), and right-aligned supporting text in Sora.
    - **3-Column Comparison Table**:
      - **Column 1 (`What Matters`)**: 6 patient-centered differences with subtle icon accents (`MessageSquare`, `SlidersHorizontal`, `Heart`, `Eye`, `Clock`, `RotateCcw`).
      - **Column 2 (`DENTAL CLINICa`)**: Continuous dark ink column (`#12161f`) with rounded top/bottom caps, original clinic logo asset badge in the header, and crisp white SVG checkmarks (`✓`) that illuminate in clinic red on row hover.
      - **Column 3 (`Typical Dental Visit`)**: Neutral comparison state with subtle circular dash icons (`—`).
    - **Row Dividers & Responsive Rhythms**: Thin 1px dividers, row hover highlights, and smooth horizontal scrolling on mobile viewports.
- **Files modified/added**:
  - `frontend/src/App.js` [MODIFIED]
  - `frontend/src/App.css` [MODIFIED]
- **Verification**:
  - Production build compiled successfully (`main.910d79ae.js`, `main.abc2de8d.css`).
  - Verified live in browser subagent on Desktop (1440px) and Mobile (390px) with interactive screenshots.

## 2026-08-17 — Services Section Premium UI Refinement (Agency Editorial Benchmark)
- **What changed**:
  - Refined the **Services Section** layout and interactions to match the editorial benchmark:
    - **Card Width & Visibility (01)**: Broadened card width to `410px` on desktop, resulting in exactly **3 complete cards + 20–25% peek of Card 4** (`Orthodontics`) entering from the right to communicate horizontal continuation.
    - **Fixed Content Rhythm (03)**: Normalized vertical alignment across all cards — Icons, Titles (`min-height: 56px`), Descriptions (`min-height: 70px`), CTAs, and large Images (`height: 240px`) share the exact same vertical pixel baselines regardless of copy line wrapping.
    - **Icon Scale & Placement (05, 06)**: Increased rendered icon size to `52px` (approx 1.5–2x visual presence), placed directly on the clean white card surface with normalized bounding.
    - **Coordinated CTA Interaction (10–12)**: Implemented coordinated `400ms` micro-interaction with vertical text-flip (`View Details` smoothly scrolls up as duplicate enters from bottom) and forward/upward directional arrow motion (`translate(3px, -2px)`) inside the signature red circle.
    - **Editorial Photography Scale (13)**: Images occupy ~38% of card height with consistent `object-fit: cover` and subtle `1.028x` hover zoom.
    - **Responsive Rhythms (01)**: Tablet shows 2 cards + 15–20% peek (`360px`); Mobile shows 1 complete card + 15% peek (`clamp(300px, 84vw, 335px)`) with touch swipe support.
- **Files modified/added**:
  - `frontend/public/media/icon-preventive.png` [NEW]
  - `frontend/public/media/icon-implants.png` [NEW]
  - `frontend/public/media/icon-makeover.png` [NEW]
  - `frontend/public/media/icon-orthodontics.png` [NEW]
  - `frontend/src/App.js` [MODIFIED]
  - `frontend/src/App.css` [MODIFIED]
- **Verification**:
  - Production build compiled successfully (`main.e8362847.js`, `main.f9f9dc7e.css`).
  - Verified live in browser subagent on Desktop (1440px) and Mobile (390px) with interactive screenshots.

## 2026-08-17 — Services Carousel Section (Editorial Horizontal Showcase & Bespoke Icons)
- **What changed**:
  - Implemented the editorial **Services Carousel Section** positioned immediately below the rating belt:
    - **Header**: `[ ✛ OUR SERVICES ]` signature pill badge with red plus icon, editorial headline `Find your way forward.` in Fraunces serif, and top-right navigation arrows (`←` and `→`).
    - **4 Service Cards**:
      1. `General & Preventive Dentistry`: Routine check-ups, cleaning, gum care (`/media/service-preventive.jpg` with female dentist & patient in chair).
      2. `Dental Implants`: Replacing missing teeth with secure implants (`/media/service-implants.jpg` with male dentist explaining implant model & X-ray).
      3. `Smile Makeover`: Personalized cosmetic treatments (`/media/service-makeover.jpg` with female patient viewing smile in mirror).
      4. `Orthodontics`: Braces & clear aligners (`/media/service-orthodontics.png` with close-up braces).
    - **Bespoke Monochrome Icons**: Designed 4 custom inline SVGs (shield outline, implant threads, sparkle starburst, bracket wire) with consistent thin linework.
    - **Dot-to-Arrow CTA Interaction**: "View Details" button with signature red dot that morphs smoothly into a white arrow on hover while keeping button text rock solid.
    - **Carousel Behavior**: Desktop shows 3 full cards + 4th card partially entering from right to communicate horizontal scrolling; smooth arrow navigation and touch swipe on mobile.
- **Files modified/added**:
  - `frontend/public/media/service-preventive.jpg` [NEW]
  - `frontend/public/media/service-implants.jpg` [NEW]
  - `frontend/public/media/service-makeover.jpg` [NEW]
  - `frontend/public/media/service-orthodontics.png` [NEW]
  - `frontend/src/App.js` [MODIFIED]
  - `frontend/src/App.css` [MODIFIED]
- **Verification**:
  - Production build compiled successfully (`main.e259449e.js`, `main.d46bbf24.css`).
  - Verified live in browser subagent: Desktop carousel view, hover dot-to-arrow morph, right-arrow sliding, and mobile responsive layout.

## 2026-08-16 — Vimeo Video Integration, Slide Frame Refinement & Orthodontic Close Photo
- **What changed**:
  - Embedded the user's custom Vimeo treatment video (`https://vimeo.com/1218731432`) in background autoplay/loop/muted mode without any player branding or letterboxing.
  - Connected the bottom-right frosted glass control toggle (`⏸` / `▶`) to the Vimeo Player API via `postMessage` for seamless pause/play interaction.
  - Replaced the brown-shirt doctor/patient consultation image in Slide 04 with the uploaded high-resolution close-up orthodontic procedure photo (`/media/patient-care-close.jpg`).
  - Refined the frame aspect ratios and proportions matching Oralic reference mockups:
    - Left slideshow panel: `1.62fr` with `26px` smooth border-radius.
    - Right video panel: `1fr` with `26px` smooth border-radius.
    - Full-bleed edge-to-edge video scaling on both desktop and mobile viewports.
- **Files modified/added**:
  - `frontend/public/media/patient-care-close.jpg` [NEW]
  - `frontend/src/App.js` [MODIFIED]
  - `frontend/src/App.css` [MODIFIED]
- **Verification**:
  - Production build compiled successfully (`main.023a9e6c.js`, `main.38994f64.css`).
  - Verified live in browser subagent: Vimeo video playback, Slide 4 close photo, and 100% full-bleed mobile scaling.

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
