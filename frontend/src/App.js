import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, ChevronDown, Menu, Phone, MapPin, X } from "lucide-react";
import "@/App.css";
import "@/Enquiry.css";

const logo = "https://customer-assets-wrfwihn1.emergentagent.net/job_58267dcc-e88f-40f4-9dc7-e543556b9ed8/artifacts/ffpfut3t_4ca5f714-79cd-4bd3-84cc-ecc1bfb5e1d1.webp";
const photos = [
  "https://customer-assets-wrfwihn1.emergentagent.net/job_58267dcc-e88f-40f4-9dc7-e543556b9ed8/artifacts/fp78lijx_WhatsApp%20Image%202026-08-15%20at%206.13.27%20PM.webp",
  "https://customer-assets-wrfwihn1.emergentagent.net/job_58267dcc-e88f-40f4-9dc7-e543556b9ed8/artifacts/h2fngxq3_WhatsApp%20Image%202026-08-15%20at%206.13.27%20PM%20%281%29.webp",
  "https://customer-assets-wrfwihn1.emergentagent.net/job_58267dcc-e88f-40f4-9dc7-e543556b9ed8/artifacts/s5o3v421_WhatsApp%20Image%202026-08-15%20at%206.13.26%20PM.webp",
];
const whatsapp = "https://wa.me/message/MWF3LLCPQ53NL1";
const maps = "https://www.google.com/maps/search/?api=1&query=Fa-99%2C+Thokar+-4%2C+Abul+Fazal+Enclave%2C+Jamia+Nagar%2C+Okhla%2C+New+Delhi%2C+Delhi+110025%2C+India";
const phone = "tel:+918368784559";

const AnimatedButtonContent = ({ children }) => <><span className="button-label"><span className="button-label-current">{children}</span><span aria-hidden="true" className="button-label-next">{children}</span></span><span aria-hidden="true" className="button-arrow"><ArrowUpRight /></span></>;
const Button = ({ children, href = "#contact", light = false, testid }) => <a data-testid={testid} className={`button ${light ? "button-light" : ""}`} href={href}><AnimatedButtonContent>{children}</AnimatedButtonContent></a>;
const ArrowUpRight = () => <ArrowRight size={15} />;

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
    const header = document.querySelector(".header");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        header.classList.toggle("scrolled", y > 8);
        if (y < window.innerHeight) heroImg.style.transform = `translateY(${y * 0.22}px) scale(1.08)`;
        const r = finalImg.parentElement.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) finalImg.style.transform = `translateY(${(r.top - window.innerHeight / 2) * -0.06}px) scale(1.18)`;
        ticking = false;
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
    <div className="utility"><div className="container utility-inner"><span data-testid="utility-location"><MapPin size={13}/> Jamia Nagar, Okhla · New Delhi</span><div className="utility-links"><a data-testid="utility-phone" href={phone}><Phone size={13}/> +91 83687 84559</a><a data-testid="utility-directions" href={maps} target="_blank" rel="noreferrer">Directions <ArrowUpRight/></a><a data-testid="utility-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp booking <ArrowUpRight/></a></div></div></div>
    <header className="header"><div className="container header-inner"><a data-testid="brand-logo-link" href="#top" className="brand"><img src={logo} alt="DENTAL CLINICa logo"/></a><nav className={menuOpen ? "nav nav-open" : "nav"}>{nav.map((item) => <a data-testid={`nav-${item.toLowerCase()}`} key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav><div className="header-actions"><a data-testid="header-phone" href={phone}><Phone size={15}/><span>+91 83687 84559</span></a><Button testid="header-book-cta" href={whatsapp}>Book appointment</Button><button data-testid="mobile-menu-button" className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button></div></div></header>

    <section id="top" className="hero"><img className="hero-image" src={photos[0]} alt="DENTAL CLINICa treatment room"/><div className="hero-shade"/><div className="container hero-content"><p className="eyebrow">DENTAL CLINICa · NEW DELHI</p><h1>Care that makes<br/><em>room for confidence.</em></h1><p className="hero-copy">A considered dental experience in Jamia Nagar, Okhla — clear guidance, modern surroundings, and a calmer way forward.</p><div className="hero-buttons"><Button testid="hero-book-button" href={whatsapp}>Book an appointment</Button><a data-testid="hero-call-button" className="text-link light-link" href={phone}>Call the clinic <ArrowRight/></a></div><a data-testid="hero-rating-pill" className="hero-rating-pill" href={maps} target="_blank" rel="noreferrer"><span className="pill-star">★</span><strong>4.9 on Google</strong><small>288 reviews</small><ArrowUpRight/></a></div><div className="hero-bottom"><div className="container hero-bottom-inner"><span>Precise care. Human conversation.</span><span>Fa-99, Thokar -4 · Plus Code H74X+26</span></div></div></section>

    <section id="about" className="section intro"><div className="container intro-grid"><div><p className="eyebrow red">A quieter kind of clinic</p><h2>Good care begins<br/>with being <em>heard.</em></h2><p className="lead">DENTAL CLINICa is a dental clinic in Jamia Nagar, Okhla, New Delhi. We believe the first step is a clear conversation — one that gives you context, confidence, and a plan that feels right.</p><a data-testid="about-contact-link" className="text-link" href="#contact">Meet us at the clinic <ArrowRight/></a></div><div className="intro-images"><img className="intro-main" src={photos[1]} alt="Dental chair and clinic interior"/><div className="image-note"><span>01</span><span>A considered space<br/>for your next step</span></div><img className="intro-small" src={photos[2]} alt="DENTAL CLINICa treatment space"/></div></div></section>

    <section className="metrics"><div className="container metrics-grid"><div><strong data-testid="metric-rating">4.9</strong><span>Google rating</span></div><div><strong data-testid="metric-reviews">288</strong><span>Public reviews</span></div><div><strong>01</strong><span>New Delhi location</span></div><div><strong>WA</strong><span>Easy WhatsApp booking</span></div></div></section>
    <section className="statement"><div className="container statement-inner"><p className="eyebrow">THE DENTAL CLINICa APPROACH</p><h2>Clear answers.<br/><em>Calmer decisions.</em></h2><img src={photos[2]} alt="Clinic environment"/><span className="statement-number">02 / 04</span></div></section>

    <section className="dark philosophy"><div className="container philosophy-inner"><div><p className="eyebrow red">A better first impression</p><h2>We make the<br/><em>next step simple.</em></h2></div><p className="dark-lead">From your first message to the moment you leave, we want dental care to feel clear, comfortable, and human.</p></div><div className="container philosophy-points"><div><span>01</span><h3>Clear conversations</h3><p>We explain the options so you can make a decision with confidence.</p></div><div><span>02</span><h3>A calmer visit</h3><p>A welcoming environment designed around your questions and comfort.</p></div><div><span>03</span><h3>Thoughtful care</h3><p>A modern clinical setting in the heart of Okhla.</p></div></div></section>

    <section id="treatments" className="section care"><div className="container care-grid"><div className="care-intro"><p className="eyebrow red">Scope of care</p><h2>Find your<br/><em>way forward.</em></h2><p className="lead">A simple starting point for exploring the conversations your smile may need. Confirm the right treatment path with the clinic team.</p><span data-testid="treatments-confirmation-note" className="confirmation-note">Treatment list · pending clinic confirmation</span><img src={photos[1]} alt="Dental consultation setting"/></div><div className="accordion">{services.map((service, i) => <div className={`accordion-item ${openService === i ? "expanded" : ""}`} key={service}><button data-testid={`service-accordion-${i}`} onClick={() => setOpenService(openService === i ? -1 : i)}><span>0{i + 1}</span><b>{service}</b><ChevronDown/></button>{openService === i && <p data-testid={`service-detail-${i}`}>A considered conversation about {service.toLowerCase()}, tailored to your questions and confirmed by the clinic team.</p>}</div>)}</div></div></section>

    <section className="dark service-cards"><div className="container"><div className="section-heading"><div><p className="eyebrow red">A framework, not a formula</p><h2>Care that meets<br/><em>you where you are.</em></h2></div><span className="heading-note">Three ways to begin<br/>a better conversation.</span></div><div className="card-grid">{[["Prevent", "Keep small concerns from becoming bigger decisions.", photos[2]], ["Restore", "A clear, considered route back to comfort.", photos[1]], ["Enhance", "Explore what feeling good about your smile means to you.", photos[0]]].map(([title, text, image], i) => <article className="service-card" key={title}><img src={image} alt={`${title} dental care`} /><div className="service-card-content"><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p><a data-testid={`service-card-${title.toLowerCase()}`} href={whatsapp} target="_blank" rel="noreferrer">Start a conversation <ArrowRight/></a></div></article>)}</div></div></section>

    <section className="section difference"><div className="container"><div className="center-heading"><p className="eyebrow red">Why begin here</p><h2>A more considered<br/><em>way to care.</em></h2></div><div className="compare"><div className="compare-head"><span></span><b>DENTAL CLINICa</b><span>What matters</span></div>{[["Clear communication", "A conversation before a recommendation"], ["Easy WhatsApp booking", "Reach us in the way that feels easiest"], ["Verified Google trust", "4.9 rating · 288 public reviews"], ["Clear directions", "Jamia Nagar, Okhla · H74X+26"]].map(([a,b], i) => <div className="compare-row" key={a}><span>{a}</span><strong>✓</strong><em>{b}</em></div>)}</div></div></section>

    <section id="reviews" className="reviews"><div className="container reviews-grid"><div className="review-score"><p className="eyebrow red">Public Google trust</p><strong>4.9</strong><span>★ ★ ★ ★ ★</span><p>Across 288 public reviews</p><Button testid="reviews-google-button" href={maps}>View Google listing</Button></div><div className="review-quote"><span className="quote-mark">“</span><blockquote>We’re collecting a small selection of real Google reviews to share here, with the clinic team’s approval.</blockquote><small data-testid="review-confirmation-note">Real patient words · being reviewed with the clinic</small></div></div></section>

    <section id="gallery" className="section gallery"><div className="container"><div className="section-heading"><div><p className="eyebrow red">Inside DENTAL CLINICa</p><h2>A space made<br/><em>for ease.</em></h2></div><span className="heading-note">Clinic imagery<br/>from our space</span></div><div className="gallery-grid"><figure className="gallery-large"><img src={photos[0]} alt="DENTAL CLINICa treatment room"/><figcaption data-testid="gallery-caption-1">Treatment room · DENTAL CLINICa</figcaption></figure><figure><img src={photos[1]} alt="DENTAL CLINICa dental chair"/><figcaption data-testid="gallery-caption-2">Clinical setting · DENTAL CLINICa</figcaption></figure><figure><img src={photos[2]} alt="DENTAL CLINICa interior"/><figcaption data-testid="gallery-caption-3">Care environment · DENTAL CLINICa</figcaption></figure></div><p data-testid="gallery-confirmation-note" className="gallery-note">Gallery captions and imagery shown from the supplied clinic set · final approval pending</p></div></section>

    <section className="team"><div className="container team-inner"><div><p className="eyebrow red">The people behind the care</p><h2>Meet your<br/><em>care team.</em></h2><p className="lead">Doctor profiles and biographies will be added once confirmed by the clinic.</p></div><div className="team-placeholders"><div><span>01</span><b>Doctor profile</b><small>Details to be confirmed</small></div><div><span>02</span><b>Care team</b><small>Details to be confirmed</small></div></div></div></section>

    <section id="contact" className="dark contact"><div className="container contact-grid"><div><p className="eyebrow red">Visit DENTAL CLINICa</p><h2>Let’s find<br/><em>your next step.</em></h2><p className="dark-lead">Questions are welcome. Reach out in the way that feels easiest.</p><div className="contact-actions"><Button testid="contact-book-button" href={whatsapp}>Book on WhatsApp</Button><a data-testid="contact-phone-button" href={phone} className="text-link light-link"><Phone size={15}/> +91 83687 84559</a></div><form data-testid="appointment-enquiry-form" className="enquiry-form" onSubmit={submitEnquiry}><p className="eyebrow">Written enquiry</p><h3>Prefer to type first?</h3><label>Name<input data-testid="enquiry-name-input" name="name" required placeholder="Your name"/></label><label>Phone<input data-testid="enquiry-phone-input" name="phone" required type="tel" placeholder="Your phone number"/></label><label>What would you like to discuss?<select data-testid="enquiry-concern-select" name="concern" defaultValue="General consultation"><option>General consultation</option><option>Cleaning and check-up</option><option>Restorative care</option><option>Smile enhancement</option></select></label><label>Reply via<select data-testid="enquiry-preference-select" name="preference" defaultValue="WhatsApp"><option>WhatsApp</option><option>Phone call</option></select></label><button data-testid="enquiry-submit-button" className="button" type="submit"><AnimatedButtonContent>Prepare enquiry</AnimatedButtonContent></button>{formStatus && <p data-testid="enquiry-success-message" className="form-success">{formStatus}</p>}</form></div><div className="map-panel"><MapPin size={20}/><p>Fa-99, Thokar -4<br/>Abul Fazal Enclave, Jamia Nagar<br/>Okhla, New Delhi, Delhi 110025, India</p><span>Plus Code · H74X+26</span><small data-testid="hours-confirmation-note" className="hours-note">Clinic hours · pending confirmation</small><a data-testid="contact-directions-button" href={maps} target="_blank" rel="noreferrer">Open directions <ArrowRight/></a></div></div></section>

    <section className="section faq"><div className="container faq-grid"><div><p className="eyebrow red">Good to know</p><h2>Questions,<br/><em>answered.</em></h2><p className="lead">The practical details, before you arrive.</p></div><div>{faqs.map(([q,a], i) => <div className="faq-item" key={q}><button data-testid={`faq-question-${i}`} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span><ChevronDown className={openFaq === i ? "rotate" : ""}/></button>{openFaq === i && <p data-testid={`faq-answer-${i}`}>{a}</p>}</div>)}</div></div></section>
    <section className="journal"><div className="container"><div className="section-heading"><div><p className="eyebrow red">From the journal</p><h2>Small notes on<br/><em>better care.</em></h2></div><span className="heading-note">Helpful reading<br/>coming soon</span></div><div className="journal-grid">{["How to prepare for your first visit", "Questions worth asking your dentist", "Keeping your smile comfortable"].map((item, i) => <article key={item}><span>0{i + 1} · JOURNAL</span><h3>{item}</h3><p>Helpful guidance from DENTAL CLINICa, coming soon.</p><ArrowDownRight/></article>)}</div></div></section>
    <section className="final-cta"><img src={photos[0]} alt="DENTAL CLINICa clinic interior"/><div className="final-shade"/><div className="container final-content"><p className="eyebrow">DENTAL CLINICa · OKHLA</p><h2>Start with a<br/><em>conversation.</em></h2><div><Button testid="final-book-button" href={whatsapp}>Book an appointment</Button><a data-testid="final-call-link" href={phone} className="text-link light-link">Call +91 83687 84559 <ArrowRight/></a></div></div></section>
    <footer className="footer"><div className="container footer-grid"><div><img src={logo} alt="DENTAL CLINICa logo" className="footer-logo"/><p>A considered dental experience<br/>in Jamia Nagar, Okhla.</p></div><div><span className="footer-label">Visit</span><a data-testid="footer-address" href={maps} target="_blank" rel="noreferrer">Fa-99, Thokar -4<br/>Abul Fazal Enclave, Jamia Nagar<br/>Okhla, New Delhi, Delhi 110025, India</a></div><div><span className="footer-label">Connect</span><a data-testid="footer-phone" href={phone}>+91 83687 84559</a><a data-testid="footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp booking</a><a data-testid="footer-maps" href={maps} target="_blank" rel="noreferrer">Google Maps</a></div><div><span className="footer-label">Explore</span><a href="#about">About</a><a href="#treatments">Treatments</a><a href="#reviews">Reviews</a><a href="#contact">Contact</a></div></div><div className="container footer-bottom"><span>© 2026 DENTAL CLINICa</span><span>Some content pending clinic confirmation</span><span>Privacy · Terms</span></div></footer>
    <div className="mobile-actions"><a data-testid="mobile-call-action" href={phone}><Phone/>Call</a><a data-testid="mobile-whatsapp-action" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a data-testid="mobile-book-action" href={whatsapp}>Book</a></div>
  </main>;
}

export default App;
