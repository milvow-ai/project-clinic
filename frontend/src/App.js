import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowLeft, ArrowUpRight, ChevronDown, Menu, Phone, MapPin, X, ShoppingCart, Plus, MessageSquare, SlidersHorizontal, Heart, Eye, Clock3, RotateCcw, Star, User } from "lucide-react";
import { BlurTextReveal, BlurRevealContainer, BlurItem, blurTransition, blurVariants } from "./BlurReveal";
import "@/App.css";
import "@/Enquiry.css";

const logoImg = "/media/dental-clinica-logo.png";
const heroImage = "/media/hero-treatment.jpg";
const photos = [
  "https://customer-assets-wrfwihn1.emergentagent.net/job_58267dcc-e88f-40f4-9dc7-e543556b9ed8/artifacts/fp78lijx_WhatsApp%20Image%202026-08-15%20at%206.13.27%20PM.webp",
  "https://customer-assets-wrfwihn1.emergentagent.net/job_58267dcc-e88f-40f4-9dc7-e543556b9ed8/artifacts/h2fngxq3_WhatsApp%20Image%202026-08-15%20at%206.13.27%20PM%20%281%29.webp",
  "https://customer-assets-wrfwihn1.emergentagent.net/job_58267dcc-e88f-40f4-9dc7-e543556b9ed8/artifacts/s5o3v421_WhatsApp%20Image%202026-08-15%20at%206.13.26%20PM.webp",
];
const whatsapp = "https://wa.me/918368784559";
const maps = "https://www.google.com/maps/search/?api=1&query=Fa-99%2C+Thokar+-4%2C+Abul+Fazal+Enclave%2C+Jamia+Nagar%2C+Okhla%2C+New+Delhi%2C+Delhi+110025%2C+India";
const phone = "tel:+918368784559";

const trustSlides = [
  {
    number: "01",
    tag: "X-RAY / DIAGNOSTICS",
    title: "Diagnostic Accuracy",
    description: "Every treatment begins with a clear understanding of your oral health. Detailed diagnostics help us identify what needs attention and plan treatment with confidence.",
    image: "/media/xray-diagnostics.jpg",
  },
  {
    number: "02",
    tag: "DENTAL TREATMENT",
    title: "Gentle Care & Patient Comfort",
    description: "Modern dentistry should feel calm and comfortable. We take the time to make every visit reassuring, precise, and centred around you.",
    image: "/media/hero-treatment.jpg",
  },
  {
    number: "03",
    tag: "DENTAL INSTRUMENTS",
    title: "Precision in Every Detail",
    description: "From routine care to complex treatment, every procedure is approached with careful technique, modern equipment, and attention to the smallest details.",
    image: "/media/dental-instruments.jpg",
  },
  {
    number: "04",
    tag: "DOCTOR + PATIENT",
    title: "Care Built Around You",
    description: "Your concerns, goals, and comfort guide every decision. We explain your options clearly so you can move forward with confidence.",
    image: "/media/patient-care-close.jpg",
  },
];

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
        <BlurRevealContainer className="trust-header" delay={0.05} stagger={0.06}>
          <div className="trust-header-left">
            <BlurItem className="trust-badge">
              <span className="badge-cross"><Plus size={12} strokeWidth={3}/></span>
              <span>OUR PHILOSOPHY</span>
            </BlurItem>
            <h2 className="trust-heading">
              <BlurTextReveal text="Trusted Dental Care for a Brighter Smile." stagger={0.035} />
            </h2>
          </div>
          <div className="trust-header-right">
            <motion.p className="trust-description" transition={blurTransition} variants={blurVariants}>
              At the heart of our practice is a commitment to precision and patient comfort. We don’t just treat symptoms; we focus on the long-term health and vitality of your smile.
            </motion.p>
          </div>
        </BlurRevealContainer>

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
                title="DENTAL CLINICa Patient Care Video"
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

const serviceCardsData = [
  {
    id: "preventive",
    title: "General & Preventive Dentistry",
    description: "Routine check-ups, professional cleaning, gum care, and preventive treatment to keep your smile healthy year-round.",
    image: "/media/service-preventive.jpg",
    icon: "/media/icon-preventive.png",
    whatsappMsg: "Hello DENTAL CLINICa, I would like to inquire about General & Preventive Dentistry.",
  },
  {
    id: "implants",
    title: "Dental Implants",
    description: "Replace missing teeth with secure, natural-looking implants designed to restore function and confidence.",
    image: "/media/service-implants.jpg",
    icon: "/media/icon-implants.png",
    whatsappMsg: "Hello DENTAL CLINICa, I would like to inquire about Dental Implants.",
  },
  {
    id: "makeover",
    title: "Smile Makeover",
    description: "A personalized combination of cosmetic treatments to refine your smile while keeping it natural to you.",
    image: "/media/service-makeover.jpg",
    icon: "/media/icon-makeover.png",
    whatsappMsg: "Hello DENTAL CLINICa, I would like to inquire about a Smile Makeover consultation.",
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    description: "Braces and clear aligners to gradually straighten your teeth and create a healthier, more confident smile.",
    image: "/media/service-orthodontics.png",
    icon: "/media/icon-orthodontics.png",
    whatsappMsg: "Hello DENTAL CLINICa, I would like to inquire about Orthodontics and Braces.",
  },
];

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
        <BlurRevealContainer className="services-carousel-header" delay={0.05} stagger={0.06}>
          <div className="services-header-left">
            <BlurItem className="trust-badge">
              <span className="badge-cross"><Plus size={12} strokeWidth={3} /></span>
              <span>Our Services</span>
            </BlurItem>
            <h2 className="services-heading">
              <BlurTextReveal text="Find your way forward." stagger={0.04} />
            </h2>
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
        </BlurRevealContainer>
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
                  href={`${whatsapp}?text=${encodeURIComponent(card.whatsappMsg)}`}
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
                  alt={`${card.title} at DENTAL CLINICa`} 
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

const differenceRows = [
  {
    icon: MessageSquare,
    feature: "Clear treatment explanations",
    clinica: true,
    typical: false,
  },
  {
    icon: SlidersHorizontal,
    feature: "Personalized care plans",
    clinica: true,
    typical: false,
  },
  {
    icon: Heart,
    feature: "Comfort-first appointments",
    clinica: true,
    typical: false,
  },
  {
    icon: Eye,
    feature: "Transparent recommendations",
    clinica: true,
    typical: false,
  },
  {
    icon: Clock3,
    feature: "Time to understand your concerns",
    clinica: true,
    typical: false,
  },
  {
    icon: RotateCcw,
    feature: "Thoughtful follow-up",
    clinica: true,
    typical: false,
  },
];

function WhySection() {
  return (
    <section id="about" className="section why-section">
      <div className="container why-container">
        {/* Top Header: Badge + Large Fraunces Headline + Right Supporting Paragraph */}
        <BlurRevealContainer className="why-header" delay={0.05} stagger={0.06}>
          <div className="why-header-left">
            <BlurItem className="trust-badge">
              <span className="badge-cross"><Plus size={12} strokeWidth={3} /></span>
              <span>Our Standards</span>
            </BlurItem>
            <h2 className="why-heading">
              <BlurTextReveal text="Experience the difference." stagger={0.04} />
            </h2>
          </div>
          <div className="why-header-right">
            <motion.p className="why-lead-text" transition={blurTransition} variants={blurVariants}>
              Thoughtful dentistry means clear answers, personal care, and a better experience from your first visit onward.
            </motion.p>
          </div>
        </BlurRevealContainer>

        {/* Monumental Continuous 3-Column Architectural Table */}
        <div className="why-table-wrapper">
          <div className="why-table">
            {/* Table Header Row (100–115px Height) */}
            <div className="why-table-head">
              <div className="why-col-feature why-head-cell">
                <span>What Matters</span>
              </div>
              <div className="why-col-brand why-head-cell">
                <img src={logoImg} alt="DENTAL CLINICa" className="why-brand-logo" />
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

                    {/* Column 2: DENTAL CLINICa (25% Width, Pure White Surface, Refined 28px Circular Checkmark) */}
                    <div className="why-col-brand why-cell">
                      <span className="why-check-indicator" aria-label="Included at DENTAL CLINICa">
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

const patientReviews = [
  {
    name: "Taniya Zabeen",
    rating: 5,
    context: "General Dental Care",
    review: "Excellent experience. Painless treatment with modern facilities and warm vibe. Dr Ahmad and Dr Sidra made me feel super comfortable. The staff was friendly and professional. Highly recommend for anyone seeking top notch dental care.",
  },
  {
    name: "FIROZ Ahamad",
    rating: 5,
    context: "Dental Treatment",
    review: "I had a wonderful experience with Dr. Mohammad Ahamad. The diagnosis was accurate, the treatment worked perfectly, and I felt well cared for throughout my recovery.",
  },
  {
    name: "Sadia Naz",
    rating: 5,
    context: "Dental Treatment",
    review: "Had an amazing experience. Dr. Ahmad and Dr. Sidra were fantastic – made me feel at ease and provided painless treatment. Modern facilities, friendly staff, and a super warm vibe. Highly recommend.",
  },
  {
    name: "Ubaid Ur Rehman",
    rating: 5,
    context: "Full Mouth Implants",
    review: "Best implantologist. Got my full mouth implant done at DENTAL CLINICa Dr Ahmad Mohammad. Advised to all dental patients. 5 star. Fully satisfied.",
  },
  {
    name: "Saddam Hussain",
    rating: 5,
    context: "Dental Treatment",
    review: "Staff is very friendly. Dr informs everything clearly and in advance. Dr also gives ample time. Great experience.",
  },
  {
    name: "Snehal Sharma",
    rating: 5,
    context: "Dental Treatment",
    review: "Painless treatment with amazing facilities and latest technology, excellent sterilization. Everything was on top notch. Highly recommend, go for it without any second opinion.",
  },
];

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
        <BlurRevealContainer className="testimonials-header" delay={0.05} stagger={0.06}>
          <div className="testimonials-header-left">
            <BlurItem className="trust-badge dark-badge">
              <span className="badge-cross"><Plus size={12} strokeWidth={3} /></span>
              <span>Testimonials</span>
            </BlurItem>
            <h2 className="testimonials-heading">
              <BlurTextReveal text="Real experiences." stagger={0.04} />
            </h2>
          </div>
          <div className="testimonials-header-right">
            <motion.p className="testimonials-lead-text" transition={blurTransition} variants={blurVariants}>
              What patients remember most is how they were treated — clearly, comfortably, and with care.
            </motion.p>
          </div>
        </BlurRevealContainer>
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

const verifiedClinicians = [
  {
    id: "dr-ahmad",
    name: "Dr. Ahmad Mohammad",
    role: "Principal Dentist & Implantologist",
    image: "/media/dr-ahmad-mohammad.jpg",
    objectPosition: "center 15%",
    description:
      "Focused on precise diagnosis, clear treatment planning, and making patients feel comfortable throughout their care.",
    focusAreas: [
      "General Dentistry",
      "Dental Implants",
      "Root Canal Treatment",
      "Restorative Care",
      "Smile Enhancement",
    ],
    tag: "01 · PRINCIPAL DENTIST",
  },
  {
    id: "dr-sidra",
    name: "Dr. Sidra Firdous",
    role: "Dental Surgeon & Restorative Care",
    image: "/media/dr-sidra-firdous.png",
    objectPosition: "center 15%",
    description:
      "Dedicated to gentle, reassuring patient care, aesthetic restorations, and stress-free clinical visits for the entire family.",
    focusAreas: [
      "Restorative Dentistry",
      "Preventive Care",
      "Painless Fillings",
      "Aesthetic Smile Design",
    ],
    tag: "02 · DENTAL SURGEON",
  },
];

function YourCareSection() {
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);
  const activeDoctor = verifiedClinicians[activeDoctorIndex] || verifiedClinicians[0];

  return (
    <section id="about" className="section yourcare-section">
      <div className="container yourcare-container">
        {/* 1. Header Area: Left-aligned, matching Hero, Services & Standards */}
        <BlurRevealContainer className="yourcare-header" delay={0.05} stagger={0.06}>
          <div className="yourcare-header-left">
            <BlurItem className="trust-badge">
              <span className="badge-cross"><Plus size={12} strokeWidth={3} /></span>
              <span>YOUR CARE</span>
            </BlurItem>
            <h2 className="yourcare-heading">
              <BlurTextReveal text="Care starts with the" stagger={0.04} />
              <br className="yourcare-heading-br" />
              <span className="yourcare-heading-line2">
                <BlurTextReveal text="person treating you." stagger={0.04} delay={0.16} />
              </span>
            </h2>
          </div>
          <div className="yourcare-header-right">
            <motion.p className="yourcare-lead-text" transition={blurTransition} variants={blurVariants}>
              Meet the clinician behind your care — experienced, approachable, and focused on making every step of treatment clear.
            </motion.p>
          </div>
        </BlurRevealContainer>

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [openService, setOpenService] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    const els = document.querySelectorAll(
      ".intro-grid>div,.metrics-grid>div,.statement-inner,.philosophy-inner>*,.philosophy-points>div,.care-intro,.accordion,.section-heading,.card-grid>article,.center-heading,.compare,.review-score,.review-quote,.gallery-grid figure,.gallery-note,.team-inner>div,.contact-grid>div,.faq-grid>div,.final-content>*, .service-editorial-card, .why-comparison-table, .yourcare-feature-card"
    );
    els.forEach((el) => el.classList.add("reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));

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
    };
  }, []);

  const nav = ["About", "Treatments", "Reviews", "Gallery", "Contact"];
  const services = ["Check-ups and cleaning", "Fillings and restorations", "Root canal treatment", "Crowns and bridges", "Dental implants", "Whitening and smile enhancement"];
  const faqs = [
    ["How can I book an appointment?", "Call +91 83687 84559 or message DENTAL CLINICa directly on WhatsApp. We will help you find the right next step."],
    ["Where is the clinic located?", "Fa-99, Thokar -4, Abul Fazal Enclave, Jamia Nagar, Okhla, New Delhi, Delhi 110025, India."],
    ["How do I find the clinic?", "The clinic is located in Jamia Nagar, Okhla. You can contact us directly on WhatsApp or call +91 83687 84559 for quick guidance."],
    ["What treatments are available?", "Our treatment pathways are being confirmed for publication. Contact the clinic and we will guide you based on your needs."],
  ];
  const submitEnquiry = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Hello DENTAL CLINICa, my name is ${form.get("name")}. My phone is ${form.get("phone")}. I would like to enquire about ${form.get("concern")} and prefer ${form.get("preference")} for a reply.`;
    setFormStatus("Your enquiry is ready. Continue on WhatsApp to send it to the clinic.");
    window.open(`${whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
  return <main className="site-shell">
    {/* Dynamic Announcement & Discount Strip with Infinite Loop Animation */}
    <div className="utility discount-strip" data-testid="discount-banner">
      <div className="ticker-track">
        <div className="ticker-content">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="ticker-item">
            <span className="ticker-badge">SPECIAL OFFER</span>
            <span>Flat 20% OFF on Advanced Tooth Implants & Smile Restoration — Book on WhatsApp</span>
            <span className="ticker-sep">✦</span>
          </a>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="ticker-item">
            <span className="ticker-badge">LIMITED TIME</span>
            <span>Complimentary Consultation with Dr Ahmad & Dr Sidra</span>
            <span className="ticker-sep">✦</span>
          </a>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="ticker-item">
            <span className="ticker-badge">PATIENT CARE</span>
            <span>Painless Treatments · Modern Facilities · Jamia Nagar, Okhla</span>
            <span className="ticker-sep">✦</span>
          </a>
        </div>
        {/* Duplicate track for seamless infinite scroll */}
        <div className="ticker-content" aria-hidden="true">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="ticker-item">
            <span className="ticker-badge">SPECIAL OFFER</span>
            <span>Flat 20% OFF on Advanced Tooth Implants & Smile Restoration — Book on WhatsApp</span>
            <span className="ticker-sep">✦</span>
          </a>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="ticker-item">
            <span className="ticker-badge">LIMITED TIME</span>
            <span>Complimentary Consultation with Dr Ahmad & Dr Sidra</span>
            <span className="ticker-sep">✦</span>
          </a>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="ticker-item">
            <span className="ticker-badge">PATIENT CARE</span>
            <span>Painless Treatments · Modern Facilities · Jamia Nagar, Okhla</span>
            <span className="ticker-sep">✦</span>
          </a>
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
          <img src={logoImg} alt="DENTAL CLINICa logo" className="navbar-logo-img" />
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
      <img className="hero-image" src={heroImage} alt="DENTAL CLINICa treatment room" />
      <div className="hero-shade custom-hero-shade" />

      <div className="container custom-hero-container">
        <BlurRevealContainer className="custom-hero-content" delay={0.08} stagger={0.06}>
          <BlurItem className="hero-badge">
            <span className="badge-cross"><Plus size={12} strokeWidth={3}/></span>
            <span>SINCE 2018 — TRUSTED DENTAL CARE</span>
          </BlurItem>

          <h1 className="hero-heading">
            <BlurTextReveal text="Trusted Partner for Exceptional Oral Health." stagger={0.04} />
          </h1>

          <motion.p className="hero-copy" transition={blurTransition} variants={blurVariants}>
            Expert medical specialists dedicated to your family’s wellness.
          </motion.p>

          <motion.div className="hero-buttons custom-hero-buttons" transition={blurTransition} variants={blurVariants}>
            <AnimatedOralicButton testid="hero-book-button" href={whatsapp}>
              Book appointment
            </AnimatedOralicButton>
            <a data-testid="hero-services-button" className="text-link light-link custom-services-link" href="#treatments">
              Our services <ArrowRight size={14}/>
            </a>
          </motion.div>
        </BlurRevealContainer>

        {/* Real Google Review Card Matching Inspiration Design & Red/White Clinic Theme with Typewriter */}
        <motion.a 
          data-testid="hero-review-card" 
          className="oralic-google-review-card" 
          href={maps} 
          target="_blank" 
          rel="noreferrer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...blurTransition, delay: 0.2 }}
          variants={blurVariants}
        >
          <div className="review-card-header">
            <div className="review-card-user">
              <div className="review-card-avatar-wrap">
                <User size={22} className="review-card-human-icon" strokeWidth={2.2} />
              </div>
              <div className="review-card-user-meta">
                <strong className="review-card-name">Taniya Zabeen</strong>
                <div className="review-card-rating-row">
                  <span className="review-card-score">5.0</span>
                  <div className="review-card-stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="review-card-quote-icon-wrap" aria-hidden="true">
              <svg width="28" height="22" viewBox="0 0 34 26" fill="none" className="review-card-quote-glyph">
                <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C7.5 19.8 4.2 23 0.2 24.5L1.8 26C8.6 23.4 13.5 17.2 13.5 10C13.5 4.5 11 0 8 0ZM26.5 0C22.1 0 18.5 3.6 18.5 8C18.5 12.4 22.1 16 26.5 16C26 19.8 22.7 23 18.7 24.5L20.3 26C27.1 23.4 32 17.2 32 10C32 4.5 29.5 0 26.5 0Z" fill="#E5E7EB"/>
              </svg>
            </div>
          </div>
          
          <div className="review-card-quote-body">
            <TypewriterReviewQuote text="Painless treatment with modern facilities and warm vibe. Dr Ahmad and Dr Sidra made me feel super comfortable. Highly recommend!" />
          </div>
        </motion.a>
      </div>

      <div className="hero-bottom">
        <div className="container hero-bottom-inner">
          <span>Precise care. Human conversation.</span>
        </div>
      </div>
    </section>

    {/* Trust & Philosophy Section with Dynamic Slideshow and Video Anchor */}
    <TrustPhilosophySection />

    <section className="metrics">
      <div className="container metrics-grid">
        <div><strong data-testid="metric-rating">4.9</strong><span>Google rating</span></div>
        <div><strong data-testid="metric-reviews">288</strong><span>Public reviews</span></div>
        <div><strong>01</strong><span>New Delhi location</span></div>
        <div>
          <strong className="metric-whatsapp-icon" aria-label="WhatsApp">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" className="whatsapp-metric-glyph">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.46C16.32 14.33 15.1 13.73 14.88 13.65C14.65 13.57 14.49 13.53 14.32 13.78C14.16 14.03 13.69 14.58 13.54 14.75C13.4 14.92 13.25 14.94 13 14.81C12.75 14.69 11.95 14.43 11 13.58C10.26 12.92 9.76 12.11 9.61 11.86C9.47 11.61 9.6 11.48 9.72 11.35C9.83 11.24 9.97 11.06 10.1 10.91C10.22 10.76 10.27 10.66 10.35 10.5C10.43 10.33 10.39 10.19 10.33 10.06C10.27 9.94 9.77 8.72 9.57 8.22C9.37 7.74 9.17 7.8 9.02 7.8C8.88 7.79 8.71 7.79 8.55 7.79C8.38 7.79 8.11 7.85 7.88 8.11C7.65 8.36 7.02 8.95 7.02 10.16C7.02 11.37 7.9 12.53 8.02 12.7C8.15 12.86 9.75 15.34 12.21 16.4C12.8 16.65 13.25 16.8 13.61 16.92C14.2 17.11 14.74 17.08 15.16 17.02C15.64 16.95 16.63 16.42 16.83 15.84C17.04 15.26 17.04 14.76 16.98 14.66C16.92 14.55 16.81 14.59 16.57 14.46Z"/>
            </svg>
          </strong>
          <span>Easy WhatsApp booking</span>
        </div>
      </div>
    </section>

    {/* Services Carousel Section Matching Editorial Polish with 4 Cards and Navigation */}
    <ServicesCarouselSection />

    {/* WHY / Experience the Difference Section (Editorial 3-Column Comparison Table) */}
    <WhySection />

    {/* TESTIMONIALS / Real Patient Experiences (Infinite Continuous Marquee & Typewriter Reveal) */}
    <TestimonialsSection />

    {/* YOUR CARE / Featured Clinician Experience (Large Editorial Composition) */}
    <YourCareSection />

    <section id="gallery" className="section gallery"><div className="container"><BlurRevealContainer className="section-heading"><div><p className="eyebrow red">Inside DENTAL CLINICa</p><h2><BlurTextReveal text="A space made for ease." stagger={0.04} /></h2></div><span className="heading-note">Clinic imagery<br/>from our space</span></BlurRevealContainer><div className="gallery-grid"><figure className="gallery-large"><img src={photos[0]} alt="DENTAL CLINICa treatment room"/><figcaption data-testid="gallery-caption-1">Treatment room · DENTAL CLINICa</figcaption></figure><figure><img src={photos[1]} alt="DENTAL CLINICa dental chair"/><figcaption data-testid="gallery-caption-2">Clinical setting · DENTAL CLINICa</figcaption></figure><figure><img src={photos[2]} alt="DENTAL CLINICa interior"/><figcaption data-testid="gallery-caption-3">Care environment · DENTAL CLINICa</figcaption></figure></div><p data-testid="gallery-confirmation-note" className="gallery-note">Gallery captions and imagery shown from the supplied clinic set · final approval pending</p></div></section>

    <section id="contact" className="dark contact"><div className="container contact-grid"><div><p className="eyebrow red">Visit DENTAL CLINICa</p><h2><BlurTextReveal text="Let’s find your next step." stagger={0.04} /></h2><p className="dark-lead">Questions are welcome. Reach out in the way that feels easiest.</p><div className="contact-actions"><Button testid="contact-book-button" href={whatsapp}>Book on WhatsApp</Button><a data-testid="contact-phone-button" href={phone} className="text-link light-link"><Phone size={15}/> +91 83687 84559</a></div><form data-testid="appointment-enquiry-form" className="enquiry-form" onSubmit={submitEnquiry}><p className="eyebrow">Written enquiry</p><h3>Prefer to type first?</h3><label>Name<input data-testid="enquiry-name-input" name="name" required placeholder="Your name"/></label><label>Phone<input data-testid="enquiry-phone-input" name="phone" required type="tel" placeholder="Your phone number"/></label><label>What would you like to discuss?<select data-testid="enquiry-concern-select" name="concern" defaultValue="General consultation"><option>General consultation</option><option>Cleaning and check-up</option><option>Restorative care</option><option>Smile enhancement</option></select></label><label>Reply via<select data-testid="enquiry-preference-select" name="preference" defaultValue="WhatsApp"><option>WhatsApp</option><option>Phone call</option></select></label><Button testid="enquiry-submit-button" type="submit">Prepare enquiry</Button>{formStatus && <p data-testid="enquiry-success-message" className="form-success">{formStatus}</p>}</form></div><div className="map-panel"><MapPin size={20}/><p>Fa-99, Thokar -4<br/>Abul Fazal Enclave, Jamia Nagar<br/>Okhla, New Delhi, Delhi 110025, India</p><small data-testid="hours-confirmation-note" className="hours-note">Clinic hours · pending confirmation</small></div></div></section>

    <section className="section faq"><div className="container faq-grid"><div><p className="eyebrow red">Good to know</p><h2><BlurTextReveal text="Questions, answered." stagger={0.04} /></h2><p className="lead">The practical details, before you arrive.</p></div><div>{faqs.map(([q,a], i) => <div className="faq-item" key={q}><button data-testid={`faq-question-${i}`} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span><ChevronDown className={openFaq === i ? "rotate" : ""}/></button>{openFaq === i && <p data-testid={`faq-answer-${i}`}>{a}</p>}</div>)}</div></div></section>
    <footer className="footer"><div className="container footer-grid"><div><img src={logoImg} alt="DENTAL CLINICa logo" className="footer-logo"/><p>A considered dental experience<br/>in Jamia Nagar, Okhla.</p></div><div><span className="footer-label">Visit</span><a data-testid="footer-address" href={maps} target="_blank" rel="noreferrer">Fa-99, Thokar -4<br/>Abul Fazal Enclave, Jamia Nagar<br/>Okhla, New Delhi, Delhi 110025, India</a></div><div><span className="footer-label">Connect</span><a data-testid="footer-phone" href={phone}>+91 83687 84559</a><a data-testid="footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp booking</a><a data-testid="footer-maps" href={maps} target="_blank" rel="noreferrer">Google Maps</a></div><div><span className="footer-label">Explore</span><a href="#about">About</a><a href="#treatments">Treatments</a><a href="#reviews">Reviews</a><a href="#contact">Contact</a></div></div><div className="container footer-bottom"><span>© 2026 DENTAL CLINICa</span><span>Some content pending clinic confirmation</span><span>Privacy · Terms</span></div></footer>
    <div className="mobile-actions">
      <a data-testid="mobile-call-action" href={phone} className="mobile-action-link"><Phone size={14}/> Call</a>
      <a data-testid="mobile-whatsapp-action" href={whatsapp} target="_blank" rel="noreferrer" className="mobile-action-link">WhatsApp</a>
      <a data-testid="mobile-book-action" href={whatsapp} target="_blank" rel="noreferrer" className="mobile-action-link mobile-action-book">
        <span className="button-flip-label">
          <span className="button-flip-current">Book</span>
          <span aria-hidden="true" className="button-flip-next">Book</span>
        </span>
      </a>
    </div>
    {/* Viewport Bottom Edge Soft Focus Gradient Treatment */}
    <div className="viewport-edge-blur" aria-hidden="true" />
  </main>;
}

export default App;
