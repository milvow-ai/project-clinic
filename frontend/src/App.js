import { useEffect, useLayoutEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { ArrowDownRight, ArrowRight, ArrowLeft, ArrowUpRight, ChevronDown, Menu, Phone, MapPin, X, ShoppingCart, Plus, MessageSquare, SlidersHorizontal, Heart, Eye, Clock3, RotateCcw, Star } from "lucide-react";

/* ============================================================
   ACTIVE PROSPECT
   Every clinic-specific value below comes from
   prospects/<id>/content.json + theme.json + media/.
   Nothing about a clinic is hardcoded in this file.
   Swap prospect:  node scripts/use-prospect.js <id> && yarn build
   ============================================================ */
import P from "@/active/prospect.json";

const C = P.clinic;
const G = P.google || {};
const M = P.media || {};
const CONSENT = P.consent || {};
const HERO = P.hero || {};
const ok = (g) => !g || CONSENT[g] === true;
const TICKER = (P.announcements || []).filter((a) => ok(a.gate));
/* lucide components referenced by name from content.json */
const ICONS = { MessageSquare, SlidersHorizontal, Heart, Eye, Clock3, RotateCcw };

const logoImg   = M["logo"];
const heroImage = M["hero"];
const whatsapp  = C.whatsapp;
const maps      = C.maps;
const phone     = C.phoneHref;

const trustSlides = (P.trustSlides || []).map((s) => ({ ...s, image: M["trust-" + s.slotIndex] }));
const serviceCardsData = (P.services || []).map((s) => ({ ...s, image: M["service-" + s.slotIndex], icon: M[s.icon] }));
const differenceRows = (P.differenceRows || []).map((r) => ({ ...r, icon: ICONS[r.icon] || MessageSquare, clinica: r.ours }));
const patientReviews = P.reviews || [];
const verifiedClinicians = (P.doctors || []).map((d) => ({ ...d, image: M["doctor-" + d.slotIndex] }));
const services = P.treatments || [];
const faqs = P.faqs || [];
/* old gallery strip, now served from the prospect folder instead of a CDN */
const photos = [M["trust-1"], M["trust-3"], M["trust-4"]].filter(Boolean);

import "@/App.css";
import "@/Enquiry.css";
/* LAST: prospect theme must override App.css :root */
import "@/active/theme.css";


;



;

const Button = ({ children, href = whatsapp, light = false, testid, className = "", type = "button", onClick }) => {
  if (type === "submit") {
    return (
      <button
        data-testid={testid}
        type="submit"
        className={`oralic-button ${light ? "oralic-button-light" : ""} ${className}`}
        onClick={onClick}
      >
        <span className="button-flip-label">
          <span className="button-flip-current">{children}</span>
          <span aria-hidden="true" className="button-flip-next">{children}</span>
        </span>
        <span aria-hidden="true" className="button-morph-icon">
          <span className="btn-dot-indicator">■</span>
          <span className="btn-arrow-indicator"><ArrowUpRight size={15} /></span>
        </span>
      </button>
    );
  }

  const isExternal = href && (href.startsWith("http") || href.startsWith("https") || href.startsWith("tel:") || href.startsWith("mailto:"));
  return (
    <a
      data-testid={testid}
      className={`oralic-button ${light ? "oralic-button-light" : ""} ${className}`}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      onClick={onClick}
    >
      <span className="button-flip-label">
        <span className="button-flip-current">{children}</span>
        <span aria-hidden="true" className="button-flip-next">{children}</span>
      </span>
      <span aria-hidden="true" className="button-morph-icon">
        <span className="btn-dot-indicator">■</span>
        <span className="btn-arrow-indicator"><ArrowUpRight size={15} /></span>
      </span>
    </a>
  );
};

const AnimatedOralicButton = Button;

const TypewriterReviewQuote = ({ text, speed = 24 }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let index = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <blockquote className="review-card-quote">
      “{displayed}”<span className="typewriter-cursor">|</span>
    </blockquote>
  );
};

function TrustPhilosophySection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const iframeRef = useRef(null);

  // Auto-advance slideshow every 5.5s unless paused by user hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % trustSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const toggleVideo = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (isVideoPlaying) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: "pause" }), "*");
        setIsVideoPlaying(false);
      } else {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: "play" }), "*");
        setIsVideoPlaying(true);
      }
    } else {
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const slide = trustSlides[activeSlide];

  return (
    <section id="about" className="section trust-section">
      <div className="container trust-container">
        {/* Header: Left Badge + Heading, Right Description */}
        <div className="trust-header">
          <div className="trust-header-left">
            <div className="trust-badge">
              <span className="badge-cross"><Plus size={12} strokeWidth={3}/></span>
              <span>OUR PHILOSOPHY</span>
            </div>
            <h2 className="trust-heading">
              Trusted Dental Care for a<br/>Brighter Smile.
            </h2>
          </div>
          <div className="trust-header-right">
            <p className="trust-description">
              At the heart of our practice is a commitment to precision and patient comfort. We don’t just treat symptoms; we focus on the long-term health and vitality of your smile.
            </p>
          </div>
        </div>

        {/* 2-Panel Showcase Grid: Left Slideshow (larger), Right Video (anchor) */}
        <div className="trust-showcase-grid">
          {/* Left Panel: Dynamic Slideshow with Overlay Text & Dash Progress Indicators */}
          <div 
            className="trust-slideshow-panel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {trustSlides.map((s, idx) => (
              <div 
                key={s.title} 
                className={`trust-slide-bg ${idx === activeSlide ? "active" : ""}`}
                style={{ backgroundImage: `url(${s.image})` }}
              />
            ))}
            <div className="trust-slide-overlay" />

            <div className="trust-slide-content">
              <div className="trust-slide-top">
                <h3 className="trust-slide-title">{slide.title}</h3>
              </div>

              <div className="trust-slide-bottom">
                <p className="trust-slide-desc">{slide.description}</p>
                <div className="trust-slide-indicators">
                  {trustSlides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`trust-dash-btn ${idx === activeSlide ? "active" : ""}`}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      <span className="trust-dash-line">
                        {idx === activeSlide && <span className="trust-dash-progress" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Vimeo Treatment Video Anchor with Custom Control Toggle */}
          <div className="trust-video-panel">
            <div className="trust-video-wrapper">
              <iframe
                ref={iframeRef}
                className="trust-vimeo-iframe"
                src="https://player.vimeo.com/video/1218731432?background=1&autoplay=1&loop=1&muted=1&autopause=0&transparent=0"
                title={`${C.name} Patient Care Video`}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <div className="trust-video-overlay" />
            </div>

            {/* Bottom Right Control Toggle */}
            <button 
              className="trust-video-control-btn" 
              onClick={toggleVideo}
              aria-label={isVideoPlaying ? "Pause video" : "Play video"}
            >
              {isVideoPlaying ? (
                <span className="pause-bars"><span></span><span></span></span>
              ) : (
                <span className="play-triangle">▶</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Bespoke Monochrome Dental Line Icons for Project Clinic
const PreventiveToothIcon = () => (
  <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 11C11 7 13.5 5 18 5C22.5 5 25 7 25 11C25 15.5 23 19 21.5 28C21 30.5 19.2 30.5 18 27C16.8 30.5 15 30.5 14.5 28C13 19 11 15.5 11 11Z" />
    <path d="M14 13C15.5 14.5 20.5 14.5 22 13" />
    <path d="M7 11C7 17 11 22 18 24C25 22 29 17 29 11C23 11 20.5 8 18 6C15.5 8 13 11 7 11Z" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.5"/>
  </svg>
);

const ImplantsToothIcon = () => (
  <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 11C11 7 13.5 5 18 5C22.5 5 25 7 25 11C25 14.5 23.5 17 22.5 19H13.5C12.5 17 11 14.5 11 11Z" />
    <path d="M14 19V28C14 29.5 22 29.5 22 28V19" />
    <path d="M14.5 22H21.5" />
    <path d="M15 25H21" />
    <path d="M16 28H20" />
  </svg>
);

const MakeoverToothIcon = () => (
  <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 12C10 7.5 12.5 5.5 17 5.5C21.5 5.5 24 7.5 24 12C24 16.5 22 20 20.5 29C20 31.5 18.2 31.5 17 28C15.8 31.5 14 31.5 13.5 29C12 20 10 16.5 10 12Z" />
    <path d="M13.5 14C15 16 19 16 20.5 14" />
    <path d="M28 8L29 11L32 12L29 13L28 16L27 13L24 12L27 11L28 8Z" fill="currentColor" strokeWidth="0.5" />
  </svg>
);
;

function ServicesCarouselSection() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -440 : 440;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="treatments" className="section services-carousel-section">
      <div className="container services-carousel-container">
        {/* Top Header: Badge + Heading on Left, Arrows on Right */}
        <div className="services-carousel-header">
          <div className="services-header-left">
            <div className="trust-badge">
              <span className="badge-cross"><Plus size={12} strokeWidth={3} /></span>
              <span>Our Services</span>
            </div>
            <h2 className="services-heading">Find your way forward.</h2>
          </div>
          <div className="services-nav-arrows">
            <button 
              data-testid="services-prev-btn"
              className="services-arrow-btn" 
              onClick={() => scroll("left")}
              aria-label="Previous services"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              data-testid="services-next-btn"
              className="services-arrow-btn" 
              onClick={() => scroll("right")}
              aria-label="Next services"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Overflow Track showing 3.2-3.4 cards on Desktop */}
      <div className="services-cards-track" ref={carouselRef}>
        <div className="services-track-inner">
          {serviceCardsData.map((card) => (
            <article className="service-editorial-card" key={card.id} data-testid={`service-card-${card.id}`}>
              <div className="service-card-top">
                <div className="service-card-icon" aria-hidden="true">
                  <img src={card.icon} alt={`${card.title} icon`} className="service-icon-img" />
                </div>
                <h3 className="service-card-title">{card.title}</h3>
                <p className="service-card-desc">{card.description}</p>
                <a 
                  data-testid={`service-cta-${card.id}`}
                  href={`https://wa.me/message/MWF3LLCPQ53NL1?text=${encodeURIComponent(card.whatsappMsg)}`}
                  target="_blank" 
                  rel="noreferrer" 
                  className="service-card-cta"
                >
                  <span className="cta-dot-circle">
                    <ArrowRight size={13} className="cta-arrow" />
                  </span>
                  <span className="cta-flip-wrapper">
                    <span className="cta-flip-primary">View Details</span>
                    <span className="cta-flip-secondary" aria-hidden="true">View Details</span>
                  </span>
                </a>
              </div>
              <div className="service-card-image-wrap">
                <img 
                  src={card.image} 
                  alt={`${card.title} at {C.name}`} 
                  className="service-card-img"
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
;

function WhySection() {
  return (
    <section id="about" className="section why-section">
      <div className="container why-container">
        {/* Top Header: Badge + Large Fraunces Headline + Right Supporting Paragraph */}
        <div className="why-header">
          <div className="why-header-left">
            <div className="trust-badge">
              <span className="badge-cross"><Plus size={12} strokeWidth={3} /></span>
              <span>Our Standards</span>
            </div>
            <h2 className="why-heading">Experience the difference.</h2>
          </div>
          <div className="why-header-right">
            <p className="why-lead-text">
              Thoughtful dentistry means clear answers, personal care, and a better experience from your first visit onward.
            </p>
          </div>
        </div>

        {/* Monumental Continuous 3-Column Architectural Table */}
        <div className="why-table-wrapper">
          <div className="why-table">
            {/* Table Header Row (100–115px Height) */}
            <div className="why-table-head">
              <div className="why-col-feature why-head-cell">
                <span>What Matters</span>
              </div>
              <div className="why-col-brand why-head-cell">
                <img src={logoImg} alt={`${C.name}`} className="why-brand-logo" />
              </div>
              <div className="why-col-typical why-head-cell">
                <span>Typical Dental Visit</span>
              </div>
            </div>

            {/* Table Body Rows (88–96px Height) */}
            <div className="why-table-body">
              {differenceRows.map((row, idx) => {
                const IconComponent = row.icon;
                const isLast = idx === differenceRows.length - 1;
                return (
                  <div className={`why-table-row ${isLast ? "why-row-last" : ""}`} key={row.feature}>
                    {/* Column 1: Features (50% Width, Pure White Surface, 42px #E8E8E2 Container + Black Line Icon) */}
                    <div className="why-col-feature why-cell">
                      <div className="why-feature-icon-wrap" aria-hidden="true">
                        <IconComponent size={22} strokeWidth={1.75} />
                      </div>
                      <span className="why-feature-text">{row.feature}</span>
                    </div>

                    {/* Column 2: {C.name} (25% Width, Pure White Surface, Refined 28px Circular Checkmark) */}
                    <div className="why-col-brand why-cell">
                      <span className="why-check-indicator" aria-label={`Included at ${C.name}`}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M9.5 14.2L12.5 17.2L18.5 10.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>

                    {/* Column 3: Typical Dental Visit (25% Width, #E8E8E2 Paper Tone, Refined 28px Circular Cross) */}
                    <div className="why-col-typical why-cell">
                      <span className="why-cross-indicator" aria-label="Not standard in typical dental visits">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M10.5 10.5L17.5 17.5M17.5 10.5L10.5 17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
;

const typingProfiles = [
  { baseSpeed: 20, initialDelay: 90 },   // Card 01 (Taniya Zabeen) — Brisk & crisp, finishes first
  { baseSpeed: 38, initialDelay: 260 },  // Card 02 (FIROZ Ahamad) — Measured & calm
  { baseSpeed: 24, initialDelay: 140 },  // Card 03 (Sadia Naz) — Fluid & brisk
  { baseSpeed: 48, initialDelay: 320 },  // Card 04 (Ubaid Ur Rehman) — Thoughtful & deliberate, finishes later
  { baseSpeed: 32, initialDelay: 190 },  // Card 05 (Saddam Hussain) — Natural conversational pace
  { baseSpeed: 28, initialDelay: 120 },  // Card 06 (Snehal Sharma) — Confident editorial pace
];

function TestimonialCard({ item, reviewIndex = 0, reviewNumber }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const cardRef = useRef(null);
  const isTypingRef = useRef(false);
  const timeoutRef = useRef(null);

  // Individualized typing speed & staggered initial delay per card
  const profile = typingProfiles[reviewIndex % typingProfiles.length] || {
    baseSpeed: 30,
    initialDelay: 150,
  };

  const startTypingCycle = () => {
    if (isTypingRef.current) return;
    isTypingRef.current = true;
    clearTimeout(timeoutRef.current);

    let charIndex = 0;
    const fullText = `"${item.review}"`;

    setDisplayedText("");
    setIsTypingComplete(false);

    // Initial stagger delay so cards do not start in robotic synchronization
    timeoutRef.current = setTimeout(() => {
      const typeNextChar = () => {
        if (charIndex < fullText.length) {
          charIndex++;
          const currentText = fullText.slice(0, charIndex);
          setDisplayedText(currentText);

          const lastChar = fullText[charIndex - 1];
          let nextDelay = profile.baseSpeed;

          // Organic cadence: slight human-like pauses on sentence breaks and punctuation
          if (lastChar === "." || lastChar === "!") {
            nextDelay = profile.baseSpeed + 95;
          } else if (lastChar === "," || lastChar === "–" || lastChar === "-") {
            nextDelay = profile.baseSpeed + 50;
          } else if (lastChar === " ") {
            nextDelay = profile.baseSpeed + 6;
          } else {
            // Subtle organic jitter (±3ms)
            nextDelay += ((charIndex % 3) - 1) * 3;
          }

          timeoutRef.current = setTimeout(typeNextChar, Math.max(14, nextDelay));
        } else {
          // Finished typing -> remains permanently visible for remainder of viewport journey
          setIsTypingComplete(true);
        }
      };

      typeNextChar();
    }, profile.initialDelay);
  };

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    // Viewport-triggered typing: starts typing when card enters viewport from the right
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTypingCycle();
          } else {
            // When exiting viewport on the left, reset state so it types fresh on re-entering
            clearTimeout(timeoutRef.current);
            isTypingRef.current = false;
            setDisplayedText("");
            setIsTypingComplete(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(cardEl);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.review, reviewIndex]);

  // Cursor-responsive border gradient ONLY (affects border highlight, zero content movement)
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <article
      className="testimonial-marquee-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
    >
      <div className="testimonial-card-top">
        <div className="testimonial-stars" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="star-icon-filled" fill="#E31B23" stroke="#E31B23" />
          ))}
        </div>
      </div>

      <div className="testimonial-quote-box">
        <blockquote className="testimonial-quote-text">
          {displayedText}
          {!isTypingComplete && <span className="testimonial-caret" aria-hidden="true" />}
        </blockquote>
      </div>

      <div className="testimonial-divider" />

      <div className="testimonial-card-bottom">
        <div className="testimonial-patient-info">
          <strong className="testimonial-patient-name">{item.name}</strong>
          <span className="testimonial-patient-context">{item.context}</span>
        </div>
        <span className="testimonial-card-index">{reviewNumber}</span>
      </div>
    </article>
  );
}

function TestimonialsSection() {
  // Triple duplicated list for seamless continuous infinite horizontal marquee
  const marqueeItems = [...patientReviews, ...patientReviews, ...patientReviews];

  return (
    <section id="reviews" className="section testimonials-section">
      <div className="container testimonials-header-container">
        <div className="testimonials-header">
          <div className="testimonials-header-left">
            <div className="trust-badge dark-badge">
              <span className="badge-cross"><Plus size={12} strokeWidth={3} /></span>
              <span>Testimonials</span>
            </div>
            <h2 className="testimonials-heading">Real experiences.</h2>
          </div>
          <div className="testimonials-header-right">
            <p className="testimonials-lead-text">
              What patients remember most is how they were treated — clearly, comfortably, and with care.
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Seamless Continuous Horizontal Marquee */}
      <div className="testimonials-marquee-wrapper">
        <div className="testimonials-marquee-track">
          {marqueeItems.map((item, idx) => {
            const reviewIndex = idx % patientReviews.length;
            const reviewNumber = `0${reviewIndex + 1}`;
            return (
              <TestimonialCard
                key={`${item.name}-${idx}`}
                item={item}
                reviewIndex={reviewIndex}
                reviewNumber={reviewNumber}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
;

function YourCareSection() {
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);
  const activeDoctor = verifiedClinicians[activeDoctorIndex] || verifiedClinicians[0];

  return (
    <section id="about" className="section yourcare-section">
      <div className="container yourcare-container">
        {/* 1. Header Area: Left-aligned, matching Hero, Services & Standards */}
        <div className="yourcare-header">
          <div className="yourcare-header-left">
            <div className="trust-badge">
              <span className="badge-cross"><Plus size={12} strokeWidth={3} /></span>
              <span>YOUR CARE</span>
            </div>
            <h2 className="yourcare-heading">
              Care starts with the person<br />treating you.
            </h2>
          </div>
          <div className="yourcare-header-right">
            <p className="yourcare-lead-text">
              Meet the clinician behind your care — experienced, approachable, and focused on making every step of treatment clear.
            </p>
          </div>
        </div>

        {/* 2. Primary Visual Composition: Large Editorial Featured Clinician Panel */}
        <div className="yourcare-showcase-wrapper">
          <article className="yourcare-feature-card">
            {/* Left: Large Clinician Portrait */}
            <div className="yourcare-portrait-box">
              <img
                key={activeDoctor.id}
                src={activeDoctor.image}
                alt={activeDoctor.name}
                className="yourcare-portrait-img"
                style={{ objectPosition: activeDoctor.objectPosition || "center" }}
              />
              <div className="yourcare-portrait-overlay" />
            </div>

            {/* Right: Large Information Panel */}
            <div className="yourcare-info-box">
              <div className="yourcare-info-top">
                <div className="yourcare-indicator" aria-hidden="true">
                  <span className="yourcare-dot" />
                  <ArrowUpRight className="yourcare-arrow-icon" size={17} strokeWidth={2.2} />
                </div>
                <span className="yourcare-tag">{activeDoctor.tag}</span>
              </div>

              <div className="yourcare-info-body">
                <h3 className="yourcare-doctor-name">{activeDoctor.name}</h3>
                <p className="yourcare-doctor-role">{activeDoctor.role}</p>

                <div className="yourcare-divider" />

                <p className="yourcare-doctor-desc">{activeDoctor.description}</p>
              </div>

              <div className="yourcare-focus-area">
                <span className="yourcare-focus-title">CLINICAL FOCUS</span>
                <div className="yourcare-focus-list">
                  {activeDoctor.focusAreas.map((area, idx) => (
                    <span key={area} className="yourcare-focus-item">
                      {area}
                      {idx < activeDoctor.focusAreas.length - 1 && (
                        <span className="yourcare-focus-bullet" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Secondary Clinician Preview Strip (when multiple verified clinicians exist) */}
          {verifiedClinicians.length > 1 && (
            <div className="yourcare-secondary-strip" aria-label="Available clinicians">
              {verifiedClinicians.map((doc, idx) => {
                const isActive = idx === activeDoctorIndex;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    className={`yourcare-secondary-item ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveDoctorIndex(idx)}
                  >
                    <div className="yourcare-secondary-avatar">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        style={{ objectPosition: doc.objectPosition || "center" }}
                      />
                    </div>
                    <div className="yourcare-secondary-info">
                      <strong className="yourcare-secondary-name">{doc.name}</strong>
                      <span className="yourcare-secondary-role">{doc.role}</span>
                    </div>
                    <div className="yourcare-secondary-status">
                      {isActive ? "FEATURED" : "VIEW PROFILE ↗"}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* Every block that animates in on scroll. One source of truth, shared by the
   pre-paint hook and the observer below. */
const REVEAL_SELECTOR =
  ".intro-grid>div,.metrics-grid>div,.statement-inner,.philosophy-inner>*,.philosophy-points>div,.care-intro,.accordion,.section-heading,.card-grid>article,.center-heading,.compare,.review-score,.review-quote,.gallery-grid figure,.gallery-note,.team-inner>div,.contact-grid>div,.faq-grid>div,.journal-grid>article,.final-content>*, .service-editorial-card, .why-comparison-table, .yourcare-feature-card";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [openService, setOpenService] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* Runs before the browser paints. The same code in useEffect runs AFTER the
     first paint, so every revealed block flashes at full opacity for one frame
     and then snaps to hidden. That flash is the clearest tell that a scroll
     animation was bolted on afterwards. */
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add("reveal"));
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    let lenis = null;
    let animationFrameId = null;

    if (!prefersReducedMotion) {
      try {
        lenis = new Lenis({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Responsive expo-style decay curve
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.15,
          infinite: false,
        });
        window.lenis = lenis;

        const raf = (time) => {
          lenis.raf(time);
          animationFrameId = requestAnimationFrame(raf);
        };
        animationFrameId = requestAnimationFrame(raf);
      } catch (err) {
        console.warn("Lenis init warning:", err);
      }
    }

    // Direction-Aware Navbar detection with threshold to eliminate trackpad jitter
    let lastScrollY = window.scrollY || 0;
    let accumulatedDelta = 0;
    const DIRECTION_THRESHOLD = 8;

    const handleScroll = () => {
      const currentScrollY = lenis ? lenis.scroll : window.scrollY;

      // Scrolled state for background blur
      setIsScrolled(currentScrollY > 30);

      // Always show navbar near the top of the page
      if (currentScrollY <= 65) {
        setNavbarHidden(false);
        accumulatedDelta = 0;
        lastScrollY = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY;

      // If direction changes, reset accumulator
      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = delta;
      } else {
        accumulatedDelta += delta;
      }

      if (accumulatedDelta > DIRECTION_THRESHOLD) {
        // Scrolling DOWN: hide navbar
        setNavbarHidden(true);
      } else if (accumulatedDelta < -DIRECTION_THRESHOLD) {
        // Scrolling UP: reveal navbar
        setNavbarHidden(false);
      }

      // Subtle scroll micro-motion on hero background image
      const heroImg = document.querySelector(".custom-hero .hero-image");
      if (heroImg && currentScrollY < 1200) {
        heroImg.style.transform = `scale(1.03) translate3d(0, ${currentScrollY * 0.045}px, 0)`;
      }

      lastScrollY = currentScrollY;
    };

    if (lenis) {
      lenis.on("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Smooth anchor navigation handling
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute("href");
        if (href && href !== "#" && href.length > 1) {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            if (lenis) {
              lenis.scrollTo(el, { offset: -75, duration: 1.1 });
            } else {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Synchronized Section Reveal Observers
    const els = document.querySelectorAll(REVEAL_SELECTOR);

    /* Once a block has finished playing, strip the classes so it stops being a
       composited layer. Leaving filter + will-change on ~40 elements for the
       life of the page is what makes a site like this feel heavy to scroll,
       and it can soften text rendering permanently. */
    const settleTimers = new Set();
    const settle = (el) => {
      const done = (ev) => {
        if (ev && ev.propertyName !== "transform") return;
        el.removeEventListener("transitionend", done);
        el.classList.remove("reveal", "in-view");
        el.style.willChange = "";
      };
      el.addEventListener("transitionend", done);
      // transitionend never fires for an element that is not painted
      const t = setTimeout(() => { settleTimers.delete(t); done(null); }, 1800);
      settleTimers.add(t);
    };

    /* Cards inside a horizontally translated track (the services carousel)
       never intersect the viewport on their own, because the track slides them
       outside it. Observed individually they would sit at opacity 0 forever.
       So watch the track and release its whole group together. Siblings keep
       their nth-child stagger, so the group still cascades rather than popping. */
    const GROUP_CONTAINERS = ".services-cards-track";
    const groups = new Map();
    const singles = [];
    els.forEach((el) => {
      const g = el.closest(GROUP_CONTAINERS);
      if (g) {
        if (!groups.has(g)) groups.set(g, []);
        groups.get(g).push(el);
      } else {
        singles.push(el);
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const members = groups.get(e.target) || [e.target];
          members.forEach((el) => {
            el.classList.add("in-view");
            settle(el);
          });
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    singles.forEach((el) => io.observe(el));
    groups.forEach((_members, container) => io.observe(container));

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (lenis) {
        lenis.destroy();
        window.lenis = null;
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
      document.removeEventListener("click", handleAnchorClick);
      io.disconnect();
      settleTimers.forEach(clearTimeout);
    };
  }, []);

  const nav = ["About", "Treatments", "Reviews", "Gallery", "Contact"];
;
;
  const submitEnquiry = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Hello {C.name}, my name is ${form.get("name")}. My phone is ${form.get("phone")}. I would like to enquire about ${form.get("concern")} and prefer ${form.get("preference")} for a reply.`;
    setFormStatus("Your enquiry is ready. Continue on WhatsApp to send it to the clinic.");
    window.open(`${whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
  return <main className="site-shell">
    {/* Dynamic Announcement & Discount Strip with Infinite Loop Animation */}
    <div className="utility discount-strip" data-testid="discount-banner">
      <div className="ticker-track">
        <div className="ticker-content">
          {TICKER.map((t, i) => (
            <a key={i} href={whatsapp} target="_blank" rel="noreferrer" className="ticker-item">
              <span className="ticker-badge">{t.badge}</span>
              <span>{t.text}</span>
              <span className="ticker-sep">✦</span>
            </a>
          ))}
        </div>
        {/* Duplicate track for seamless infinite scroll */}
        <div className="ticker-content" aria-hidden="true">
          {TICKER.map((t, i) => (
            <a key={i} href={whatsapp} target="_blank" rel="noreferrer" className="ticker-item">
              <span className="ticker-badge">{t.badge}</span>
              <span>{t.text}</span>
              <span className="ticker-sep">✦</span>
            </a>
          ))}
        </div>
      </div>
    </div>
    
    {/* Redesigned White/Frosted Navbar with Direction-Aware Hide/Show Animation */}
    <header className={`header custom-navbar ${isScrolled ? "scrolled" : ""} ${navbarHidden ? "navbar-hidden" : ""}`}>
      <div className="container header-inner custom-navbar-inner">
        <div className="navbar-left">
          <nav className={menuOpen ? "nav nav-open" : "nav"}>
            {nav.map((item) => (
              <a data-testid={`nav-${item.toLowerCase()}`} key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
          </nav>
        </div>

        <a data-testid="brand-logo-link" href="#top" className="brand navbar-center-brand">
          <img src={logoImg} alt={`${C.name} logo`} className="navbar-logo-img" />
        </a>

        <div className="navbar-right">
          <AnimatedOralicButton testid="header-book-cta" href={whatsapp}>
            Book appointment
          </AnimatedOralicButton>

          <button data-testid="mobile-menu-button" className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </div>
    </header>

    {/* Hero Section with Warm Natural Contrast and Oralic Review Card */}
    <section id="top" className="hero custom-hero">
      <img className="hero-image" src={heroImage} alt={`${C.name} treatment room`} />
      <div className="hero-shade custom-hero-shade" />

      <div className="container custom-hero-container">
        <div className="custom-hero-content">
          <div className="hero-badge">
            <span className="badge-cross"><Plus size={12} strokeWidth={3}/></span>
            <span>{HERO.badge}</span>
          </div>

          <h1 className="hero-heading">
            {HERO.titleLine1}{HERO.titleLine2 ? <><br className="hero-br"/> {HERO.titleLine2}</> : null}
          </h1>

          <p className="hero-copy">
            {HERO.subtitle}
          </p>

          <div className="hero-buttons custom-hero-buttons">
            <AnimatedOralicButton testid="hero-book-button" href={whatsapp}>
              Book appointment
            </AnimatedOralicButton>
            <a data-testid="hero-services-button" className="text-link light-link custom-services-link" href="#treatments">
              Our services <ArrowRight size={14}/>
            </a>
          </div>
        </div>

        {/* Real Google Review Card Matching Oralic Design & Red/White Clinic Theme with Typewriter */}
        {HERO.review && ok(HERO.review.gate) && <a data-testid="hero-review-card" className="oralic-google-review-card" href={maps} target="_blank" rel="noreferrer">
          <div className="review-card-stars">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <TypewriterReviewQuote text={HERO.review.quote} />
          <div className="review-card-author">
            <div className="author-tooth-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 6.5 2.5 10 .5 2 1.5 4 3.5 4s3-2 3.5-4c1-3.5 2.5-7 2.5-10 0-3.5-2.5-6-6-6z"/>
              </svg>
            </div>
            <div className="author-details">
              <strong className="author-name">{HERO.review.name}</strong>
              <span className="author-source">{HERO.review.meta}</span>
            </div>
          </div>
        </a>}
      </div>

      <div className="hero-bottom">
        <div className="container hero-bottom-inner">
          <span>Precise care. Human conversation.</span>
          <span>{C.address.line1} · Plus Code {C.plusCode}</span>
        </div>
      </div>
    </section>

    {/* Trust & Philosophy Section with Dynamic Slideshow and Video Anchor */}
    <TrustPhilosophySection />

    <section className="metrics"><div className="container metrics-grid"><div><strong data-testid="metric-rating">{G.rating}</strong><span>Google rating</span></div><div><strong data-testid="metric-reviews">{G.reviewCount}</strong><span>Public reviews</span></div><div><strong>01</strong><span>{C.city} location</span></div><div><strong>WA</strong><span>Easy WhatsApp booking</span></div></div></section>

    {/* Services Carousel Section Matching Editorial Polish with 4 Cards and Navigation */}
    <ServicesCarouselSection />

    {/* WHY / Experience the Difference Section (Editorial 3-Column Comparison Table) */}
    <WhySection />

    {/* TESTIMONIALS / Real Patient Experiences (Infinite Continuous Marquee & Typewriter Reveal) */}
    {ok("reviewsPublishable") && <TestimonialsSection />}

    {/* YOUR CARE / Featured Clinician Experience (Large Editorial Composition) */}
    <YourCareSection />

    <section id="gallery" className="section gallery"><div className="container"><div className="section-heading"><div><p className="eyebrow red">Inside {C.name}</p><h2>A space made<br/><em>for ease.</em></h2></div><span className="heading-note">Clinic imagery<br/>from our space</span></div><div className="gallery-grid"><figure className="gallery-large"><img src={photos[0]} alt={`${C.name} treatment room`}/><figcaption data-testid="gallery-caption-1">Treatment room · {C.name}</figcaption></figure><figure><img src={photos[1]} alt={`${C.name} dental chair`}/><figcaption data-testid="gallery-caption-2">Clinical setting · {C.name}</figcaption></figure><figure><img src={photos[2]} alt={`${C.name} interior`}/><figcaption data-testid="gallery-caption-3">Care environment · {C.name}</figcaption></figure></div><p data-testid="gallery-confirmation-note" className="gallery-note">Gallery captions and imagery shown from the supplied clinic set · final approval pending</p></div></section>

    <section id="contact" className="dark contact"><div className="container contact-grid"><div><p className="eyebrow red">Visit {C.name}</p><h2>Let’s find<br/><em>your next step.</em></h2><p className="dark-lead">Questions are welcome. Reach out in the way that feels easiest.</p><div className="contact-actions"><Button testid="contact-book-button" href={whatsapp}>Book on WhatsApp</Button><a data-testid="contact-phone-button" href={phone} className="text-link light-link"><Phone size={15}/> {C.phoneDisplay}</a></div><form data-testid="appointment-enquiry-form" className="enquiry-form" onSubmit={submitEnquiry}><p className="eyebrow">Written enquiry</p><h3>Prefer to type first?</h3><label>Name<input data-testid="enquiry-name-input" name="name" required placeholder="Your name"/></label><label>Phone<input data-testid="enquiry-phone-input" name="phone" required type="tel" placeholder="Your phone number"/></label><label>What would you like to discuss?<select data-testid="enquiry-concern-select" name="concern" defaultValue="General consultation"><option>General consultation</option><option>Cleaning and check-up</option><option>Restorative care</option><option>Smile enhancement</option></select></label><label>Reply via<select data-testid="enquiry-preference-select" name="preference" defaultValue="WhatsApp"><option>WhatsApp</option><option>Phone call</option></select></label><Button testid="enquiry-submit-button" type="submit">Prepare enquiry</Button>{formStatus && <p data-testid="enquiry-success-message" className="form-success">{formStatus}</p>}</form></div><div className="map-panel"><MapPin size={20}/><p>{C.address.line1}<br/>{C.address.line2}<br/>{C.address.line3}</p><span>Plus Code · {C.plusCode}</span><small data-testid="hours-confirmation-note" className="hours-note">Clinic hours · pending confirmation</small><a data-testid="contact-directions-button" href={maps} target="_blank" rel="noreferrer">Open directions <ArrowRight/></a></div></div></section>

    <section className="section faq"><div className="container faq-grid"><div><p className="eyebrow red">Good to know</p><h2>Questions,<br/><em>answered.</em></h2><p className="lead">The practical details, before you arrive.</p></div><div>{faqs.map(([q,a], i) => <div className="faq-item" key={q}><button data-testid={`faq-question-${i}`} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span><ChevronDown className={openFaq === i ? "rotate" : ""}/></button>{openFaq === i && <p data-testid={`faq-answer-${i}`}>{a}</p>}</div>)}</div></div></section>
    <section className="journal"><div className="container"><div className="section-heading"><div><p className="eyebrow red">From the journal</p><h2>Small notes on<br/><em>better care.</em></h2></div><span className="heading-note">Helpful reading<br/>coming soon</span></div><div className="journal-grid">{["How to prepare for your first visit", "Questions worth asking your dentist", "Keeping your smile comfortable"].map((item, i) => <article key={item}><span>0{i + 1} · JOURNAL</span><h3>{item}</h3><p>Helpful guidance from {C.name}, coming soon.</p><ArrowDownRight/></article>)}</div></div></section>
    <footer className="footer"><div className="container footer-grid"><div><img src={logoImg} alt={`${C.name} logo`} className="footer-logo"/><p>A considered dental experience<br/>in {C.locality}.</p></div><div><span className="footer-label">Visit</span><a data-testid="footer-address" href={maps} target="_blank" rel="noreferrer">{C.address.line1}<br/>{C.address.line2}<br/>{C.address.line3}</a></div><div><span className="footer-label">Connect</span><a data-testid="footer-phone" href={phone}>{C.phoneDisplay}</a><a data-testid="footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp booking</a><a data-testid="footer-maps" href={maps} target="_blank" rel="noreferrer">Google Maps</a></div><div><span className="footer-label">Explore</span><a href="#about">About</a><a href="#treatments">Treatments</a><a href="#reviews">Reviews</a><a href="#contact">Contact</a></div></div><div className="container footer-bottom"><span>© 2026 {C.name}</span><span>Some content pending clinic confirmation</span><span>Privacy · Terms</span></div></footer>
    <div className="mobile-actions"><a data-testid="mobile-call-action" href={phone}><Phone/>Call</a><a data-testid="mobile-whatsapp-action" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a data-testid="mobile-book-action" href={whatsapp}>Book</a></div>
    {/* Viewport Bottom Edge Progressive Blur Treatment */}
    <div className="viewport-edge-blur" aria-hidden="true" />
  </main>;
}

export default App;
