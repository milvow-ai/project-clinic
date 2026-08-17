import { useEffect, useState, useRef } from "react";
import { ArrowDownRight, ArrowRight, ArrowLeft, ChevronDown, Menu, Phone, MapPin, X, ShoppingCart, Plus, MessageSquare, SlidersHorizontal, Heart, Eye, Clock3, RotateCcw } from "lucide-react";
import "@/App.css";
import "@/Enquiry.css";

const logoImg = "/media/dental-clinica-logo.png";
const heroImage = "/media/hero-treatment.jpg";
const photos = [
  "https://customer-assets-wrfwihn1.emergentagent.net/job_58267dcc-e88f-40f4-9dc7-e543556b9ed8/artifacts/fp78lijx_WhatsApp%20Image%202026-08-15%20at%206.13.27%20PM.webp",
  "https://customer-assets-wrfwihn1.emergentagent.net/job_58267dcc-e88f-40f4-9dc7-e543556b9ed8/artifacts/h2fngxq3_WhatsApp%20Image%202026-08-15%20at%206.13.27%20PM%20%281%29.webp",
  "https://customer-assets-wrfwihn1.emergentagent.net/job_58267dcc-e88f-40f4-9dc7-e543556b9ed8/artifacts/s5o3v421_WhatsApp%20Image%202026-08-15%20at%206.13.26%20PM.webp",
];
const whatsapp = "https://wa.me/message/MWF3LLCPQ53NL1";
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

const AnimatedButtonContent = ({ children }) => <><span className="button-label"><span className="button-label-current">{children}</span><span aria-hidden="true" className="button-label-next">{children}</span></span><span aria-hidden="true" className="button-arrow"><ArrowUpRight /></span></>;
const Button = ({ children, href = "#contact", light = false, testid }) => <a data-testid={testid} className={`button ${light ? "button-light" : ""}`} href={href}><AnimatedButtonContent>{children}</AnimatedButtonContent></a>;
const ArrowUpRight = () => <ArrowRight size={15} />;

const AnimatedOralicButton = ({ children, href = whatsapp, light = false, testid, className = "" }) => (
  <a data-testid={testid} className={`oralic-button ${light ? "oralic-button-light" : ""} ${className}`} href={href} target="_blank" rel="noreferrer">
    <span className="button-flip-label">
      <span className="button-flip-current">{children}</span>
      <span aria-hidden="true" className="button-flip-next">{children}</span>
    </span>
    <span aria-hidden="true" className="button-morph-icon">
      <span className="btn-dot-indicator">•</span>
      <span className="btn-arrow-indicator"><ArrowUpRight /></span>
    </span>
  </a>
);

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
        {/* Top Header: Badge + Left Heading + Right Supporting Copy */}
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

        {/* Continuous 3-Column Editorial Comparison Table */}
        <div className="why-table-wrapper">
          <div className="why-table">
            {/* Table Header Row */}
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

            {/* Table Body Rows */}
            <div className="why-table-body">
              {differenceRows.map((row, idx) => {
                const IconComponent = row.icon;
                const isLast = idx === differenceRows.length - 1;
                return (
                  <div className={`why-table-row ${isLast ? "why-row-last" : ""}`} key={row.feature}>
                    {/* Column 1: Feature (50% Width, White surface, 40px Neutral Container + Black Line Icon) */}
                    <div className="why-col-feature why-cell">
                      <div className="why-feature-icon-wrap" aria-hidden="true">
                        <IconComponent size={18} strokeWidth={1.85} />
                      </div>
                      <span className="why-feature-text">{row.feature}</span>
                    </div>

                    {/* Column 2: DENTAL CLINICa (25% Width, White surface, Refined Checkmark) */}
                    <div className="why-col-brand why-cell">
                      <span className="why-check-indicator" aria-label="Included at DENTAL CLINICa">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
                          <path d="M8 12.3L10.7 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>

                    {/* Column 3: Typical Dental Visit (25% Width, #E8E8E2 surface, Subtle Muted Cross) */}
                    <div className="why-col-typical why-cell">
                      <span className="why-cross-indicator" aria-label="Not standard in typical dental visits">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="#8e99a8" strokeWidth="1.75" />
                          <path d="M9 9L15 15M15 9L9 15" stroke="#8e99a8" strokeWidth="1.75" strokeLinecap="round" />
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [openService, setOpenService] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  useEffect(() => {
    const els = document.querySelectorAll(".intro-grid>div,.metrics-grid>div,.statement-inner,.philosophy-inner>*,.philosophy-points>div,.care-intro,.accordion,.section-heading,.card-grid>article,.center-heading,.compare,.review-score,.review-quote,.gallery-grid figure,.gallery-note,.team-inner>div,.contact-grid>div,.faq-grid>div,.journal-grid>article,.final-content>*");
    els.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in-view");
      io.unobserve(e.target);
      setTimeout(() => e.target.classList.remove("reveal", "in-view"), 1500);
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    const heroImg = document.querySelector(".hero-image");
    const finalImg = document.querySelector(".final-cta>img");
    const onScroll = () => {
      const pos = window.scrollY;
      if (heroImg) heroImg.style.transform = `scale(${1.03 + pos * 0.0003}) translateY(${pos * 0.08}px)`;
      if (finalImg) finalImg.style.transform = `scale(${1.18 - (document.body.scrollHeight - window.innerHeight - pos) * 0.0002})`;
      const headers = document.querySelectorAll(".header, .custom-navbar");
      headers.forEach(h => {
        if (pos > 20) h.classList.add("scrolled");
        else h.classList.remove("scrolled");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  const nav = ["About", "Treatments", "Reviews", "Gallery", "Contact"];
  const services = ["Check-ups and cleaning", "Fillings and restorations", "Root canal treatment", "Crowns and bridges", "Dental implants", "Whitening and smile enhancement"];
  const faqs = [
    ["How can I book an appointment?", "Call +91 83687 84559 or message DENTAL CLINICa directly on WhatsApp. We will help you find the right next step."],
    ["Where is the clinic located?", "Fa-99, Thokar -4, Abul Fazal Enclave, Jamia Nagar, Okhla, New Delhi, Delhi 110025, India. Plus Code: H74X+26."],
    ["How do I find the clinic?", "Use the directions link for the most direct route to the clinic, or search the Plus Code H74X+26 in Google Maps."],
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
    
    {/* Redesigned White/Frosted Navbar with Left Links, Center Logo, Right Button */}
    <header className="header custom-navbar">
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
        <div className="custom-hero-content">
          <div className="hero-badge">
            <span className="badge-cross"><Plus size={12} strokeWidth={3}/></span>
            <span>SINCE 2018 — TRUSTED DENTAL CARE</span>
          </div>

          <h1 className="hero-heading">
            Trusted Partner for<br className="hero-br"/> Exceptional Oral Health.
          </h1>

          <p className="hero-copy">
            Expert medical specialists dedicated to your family’s wellness.
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
        <a data-testid="hero-review-card" className="oralic-google-review-card" href={maps} target="_blank" rel="noreferrer">
          <div className="review-card-stars">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <TypewriterReviewQuote text="Painless treatment with modern facilities and warm vibe. Dr Ahmad and Dr Sidra made me feel super comfortable. Highly recommend!" />
          <div className="review-card-author">
            <div className="author-tooth-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 6.5 2.5 10 .5 2 1.5 4 3.5 4s3-2 3.5-4c1-3.5 2.5-7 2.5-10 0-3.5-2.5-6-6-6z"/>
              </svg>
            </div>
            <div className="author-details">
              <strong className="author-name">Taniya Zabeen</strong>
              <span className="author-source">Verified Google Review · 5★</span>
            </div>
          </div>
        </a>
      </div>

      <div className="hero-bottom">
        <div className="container hero-bottom-inner">
          <span>Precise care. Human conversation.</span>
          <span>Fa-99, Thokar -4 · Plus Code H74X+26</span>
        </div>
      </div>
    </section>

    {/* Trust & Philosophy Section with Dynamic Slideshow and Video Anchor */}
    <TrustPhilosophySection />

    <section className="metrics"><div className="container metrics-grid"><div><strong data-testid="metric-rating">4.9</strong><span>Google rating</span></div><div><strong data-testid="metric-reviews">288</strong><span>Public reviews</span></div><div><strong>01</strong><span>New Delhi location</span></div><div><strong>WA</strong><span>Easy WhatsApp booking</span></div></div></section>

    {/* Services Carousel Section Matching Editorial Polish with 4 Cards and Navigation */}
    <ServicesCarouselSection />

    {/* WHY / Experience the Difference Section (Editorial 3-Column Comparison Table) */}
    <WhySection />

    <section id="reviews" className="reviews"><div className="container reviews-grid"><div className="review-score"><p className="eyebrow red">Public Google trust</p><strong>4.9</strong><span>★ ★ ★ ★ ★</span><p>Across 288 public reviews</p><Button testid="reviews-google-button" href={maps}>View Google listing</Button></div><div className="review-quote"><span className="quote-mark">“</span><blockquote>We’re collecting a small selection of real Google reviews to share here, with the clinic team’s approval.</blockquote><small data-testid="review-confirmation-note">Real patient words · being reviewed with the clinic</small></div></div></section>

    <section id="gallery" className="section gallery"><div className="container"><div className="section-heading"><div><p className="eyebrow red">Inside DENTAL CLINICa</p><h2>A space made<br/><em>for ease.</em></h2></div><span className="heading-note">Clinic imagery<br/>from our space</span></div><div className="gallery-grid"><figure className="gallery-large"><img src={photos[0]} alt="DENTAL CLINICa treatment room"/><figcaption data-testid="gallery-caption-1">Treatment room · DENTAL CLINICa</figcaption></figure><figure><img src={photos[1]} alt="DENTAL CLINICa dental chair"/><figcaption data-testid="gallery-caption-2">Clinical setting · DENTAL CLINICa</figcaption></figure><figure><img src={photos[2]} alt="DENTAL CLINICa interior"/><figcaption data-testid="gallery-caption-3">Care environment · DENTAL CLINICa</figcaption></figure></div><p data-testid="gallery-confirmation-note" className="gallery-note">Gallery captions and imagery shown from the supplied clinic set · final approval pending</p></div></section>

    <section className="team"><div className="container team-inner"><div><p className="eyebrow red">The people behind the care</p><h2>Meet your<br/><em>care team.</em></h2><p className="lead">Doctor profiles and biographies will be added once confirmed by the clinic.</p></div><div className="team-placeholders"><div><span>01</span><b>Doctor profile</b><small>Details to be confirmed</small></div><div><span>02</span><b>Care team</b><small>Details to be confirmed</small></div></div></div></section>

    <section id="contact" className="dark contact"><div className="container contact-grid"><div><p className="eyebrow red">Visit DENTAL CLINICa</p><h2>Let’s find<br/><em>your next step.</em></h2><p className="dark-lead">Questions are welcome. Reach out in the way that feels easiest.</p><div className="contact-actions"><Button testid="contact-book-button" href={whatsapp}>Book on WhatsApp</Button><a data-testid="contact-phone-button" href={phone} className="text-link light-link"><Phone size={15}/> +91 83687 84559</a></div><form data-testid="appointment-enquiry-form" className="enquiry-form" onSubmit={submitEnquiry}><p className="eyebrow">Written enquiry</p><h3>Prefer to type first?</h3><label>Name<input data-testid="enquiry-name-input" name="name" required placeholder="Your name"/></label><label>Phone<input data-testid="enquiry-phone-input" name="phone" required type="tel" placeholder="Your phone number"/></label><label>What would you like to discuss?<select data-testid="enquiry-concern-select" name="concern" defaultValue="General consultation"><option>General consultation</option><option>Cleaning and check-up</option><option>Restorative care</option><option>Smile enhancement</option></select></label><label>Reply via<select data-testid="enquiry-preference-select" name="preference" defaultValue="WhatsApp"><option>WhatsApp</option><option>Phone call</option></select></label><button data-testid="enquiry-submit-button" className="button" type="submit"><AnimatedButtonContent>Prepare enquiry</AnimatedButtonContent></button>{formStatus && <p data-testid="enquiry-success-message" className="form-success">{formStatus}</p>}</form></div><div className="map-panel"><MapPin size={20}/><p>Fa-99, Thokar -4<br/>Abul Fazal Enclave, Jamia Nagar<br/>Okhla, New Delhi, Delhi 110025, India</p><span>Plus Code · H74X+26</span><small data-testid="hours-confirmation-note" className="hours-note">Clinic hours · pending confirmation</small><a data-testid="contact-directions-button" href={maps} target="_blank" rel="noreferrer">Open directions <ArrowRight/></a></div></div></section>

    <section className="section faq"><div className="container faq-grid"><div><p className="eyebrow red">Good to know</p><h2>Questions,<br/><em>answered.</em></h2><p className="lead">The practical details, before you arrive.</p></div><div>{faqs.map(([q,a], i) => <div className="faq-item" key={q}><button data-testid={`faq-question-${i}`} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span><ChevronDown className={openFaq === i ? "rotate" : ""}/></button>{openFaq === i && <p data-testid={`faq-answer-${i}`}>{a}</p>}</div>)}</div></div></section>
    <section className="journal"><div className="container"><div className="section-heading"><div><p className="eyebrow red">From the journal</p><h2>Small notes on<br/><em>better care.</em></h2></div><span className="heading-note">Helpful reading<br/>coming soon</span></div><div className="journal-grid">{["How to prepare for your first visit", "Questions worth asking your dentist", "Keeping your smile comfortable"].map((item, i) => <article key={item}><span>0{i + 1} · JOURNAL</span><h3>{item}</h3><p>Helpful guidance from DENTAL CLINICa, coming soon.</p><ArrowDownRight/></article>)}</div></div></section>
    <footer className="footer"><div className="container footer-grid"><div><img src={logoImg} alt="DENTAL CLINICa logo" className="footer-logo"/><p>A considered dental experience<br/>in Jamia Nagar, Okhla.</p></div><div><span className="footer-label">Visit</span><a data-testid="footer-address" href={maps} target="_blank" rel="noreferrer">Fa-99, Thokar -4<br/>Abul Fazal Enclave, Jamia Nagar<br/>Okhla, New Delhi, Delhi 110025, India</a></div><div><span className="footer-label">Connect</span><a data-testid="footer-phone" href={phone}>+91 83687 84559</a><a data-testid="footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp booking</a><a data-testid="footer-maps" href={maps} target="_blank" rel="noreferrer">Google Maps</a></div><div><span className="footer-label">Explore</span><a href="#about">About</a><a href="#treatments">Treatments</a><a href="#reviews">Reviews</a><a href="#contact">Contact</a></div></div><div className="container footer-bottom"><span>© 2026 DENTAL CLINICa</span><span>Some content pending clinic confirmation</span><span>Privacy · Terms</span></div></footer>
    <div className="mobile-actions"><a data-testid="mobile-call-action" href={phone}><Phone/>Call</a><a data-testid="mobile-whatsapp-action" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a data-testid="mobile-book-action" href={whatsapp}>Book</a></div>
  </main>;
}

export default App;
