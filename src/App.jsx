import React, { useEffect, useRef, useState } from 'react';

// Certificate Asset Imports
import anthropicsImg from "./assets/anthropics.png";
import deloitteImg from "./assets/deloitte.png";
import courseraImg from "./assets/coursera.png";

// REUSABLE SCROLL REVEAL WRAPPER
function Reveal({ children, direction = 'up' }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getDirectionClass = () => {
    if (isIntersecting) return 'opacity-100 translate-x-0 translate-y-0';
    switch (direction) {
      case 'left': return 'opacity-0 -translate-x-8';
      case 'right': return 'opacity-0 translate-x-8';
      case 'up':
      default: return 'opacity-0 translate-y-8';
    }
  };

  return (
    <div ref={ref} className={`transition-all duration-500 ease-out will-change-transform ${getDirectionClass()}`}>
      {children}
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio' | 'waitlist'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleScroll = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistStatus('submitting');
    setTimeout(() => {
      setWaitlistStatus('success');
    }, 1000);
  };

  const certificates = [
    {
      id: 1,
      name: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic",
      date: "Aug 2026",
      image: anthropicsImg,
      description: "Foundational certification verifying core competencies in artificial intelligence frameworks, model structure, and technical implementation."
    },
    {
      id: 2,
      name: "Data Analytics Simulation",
      issuer: "Deloitte",
      date: "Jan 2025",
      image: deloitteImg,
      description: "Practical job simulation covering enterprise data analysis, forensic technology, and handling complex datasets."
    },
    {
      id: 3,
      name: "WordPress Site Architecture",
      issuer: "Coursera",
      date: "Mar 2026",
      image: courseraImg,
      description: "Project-based certification demonstrating complete website design, CMS deployment, and layout optimization."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbf7e6] text-[#16140e] selection:bg-[#f3b44a] selection:text-[#16140e] antialiased font-sans">
      
      {/* HEADER NAVIGATION & VIEW TOGGLE */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fbf7e6]/90 backdrop-blur-md border-b border-[#16140e]/15 px-6 md:px-12 py-3 flex flex-wrap justify-between items-center gap-4">
        <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="text-xs font-bold tracking-wider uppercase text-[#16140e] hover:opacity-80 transition-opacity">
          Ali Haider <span className="text-[#57534a] font-normal">/ Frontend Engineer</span>
        </a>

        {/* VIEW TOGGLE SWITCHER */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-[#efe9d2]/60 border border-[#16140e]/20 rounded-[3px]">
          <button 
            onClick={() => setCurrentView('portfolio')} 
            className={`px-3 py-1 rounded-[3px] text-xs font-bold transition-all ${
              currentView === 'portfolio' 
                ? 'bg-[#f3b44a] text-[#16140e] border border-[#16140e] shadow-[2px_3px_0px_0px_#16140e] -translate-y-0.5' 
                : 'border border-transparent text-[#57534a] hover:bg-[#efe9d2] hover:text-[#16140e]'
            }`}
          >
            [ View Portfolio ]
          </button>
          <button 
            onClick={() => setCurrentView('waitlist')} 
            className={`px-3 py-1 rounded-[3px] text-xs font-bold transition-all ${
              currentView === 'waitlist' 
                ? 'bg-[#f3b44a] text-[#16140e] border border-[#16140e] shadow-[2px_3px_0px_0px_#16140e] -translate-y-0.5' 
                : 'border border-transparent text-[#57534a] hover:bg-[#efe9d2] hover:text-[#16140e]'
            }`}
          >
            [ View Waitlist UI ]
          </button>
        </div>

        {/* LINKS (PORTFOLIO VIEW ONLY) */}
        {currentView === 'portfolio' && (
          <div className="hidden lg:flex items-center space-x-6 text-[12.5px] font-medium text-[#57534a]">
            <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="hover:text-[#16140e] transition-colors">Work</a>
            <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className="hover:text-[#16140e] transition-colors">Skills</a>
            <a href="#experience" onClick={(e) => handleScroll(e, 'experience')} className="hover:text-[#16140e] transition-colors">Experience</a>
            <a href="#certifications" onClick={(e) => handleScroll(e, 'certifications')} className="hover:text-[#16140e] transition-colors">Certifications</a>
            <a 
              href="#contact" 
              onClick={(e) => handleScroll(e, 'contact')} 
              className="bg-[#f3b44a] text-[#16140e] border border-[#16140e] font-semibold px-3.5 py-1.5 rounded-[3px] shadow-[2px_3px_0px_0px_#16140e] hover:-translate-y-0.5 hover:shadow-[3px_4px_0px_0px_#16140e] transition-all"
            >
              Get in Touch
            </a>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        {currentView === 'portfolio' && (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden text-[#16140e] focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        )}
      </nav>

      {/* MOBILE MENU FLYOUT */}
      {isMenuOpen && currentView === 'portfolio' && (
        <div className="fixed inset-0 z-40 bg-[#fbf7e6] px-8 pt-28 flex flex-col space-y-6 text-lg font-medium border-b border-[#16140e]/20 lg:hidden">
          <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="text-[#16140e]">Work</a>
          <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className="text-[#16140e]">Skills</a>
          <a href="#experience" onClick={(e) => handleScroll(e, 'experience')} className="text-[#16140e]">Experience</a>
          <a href="#certifications" onClick={(e) => handleScroll(e, 'certifications')} className="text-[#16140e]">Certifications</a>
          <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="text-[#16140e] font-bold">Get in Touch →</a>
        </div>
      )}

      {/* CONDITIONAL VIEW RENDER */}
      {currentView === 'portfolio' ? (
        <>
          {/* HERO SECTION */}
          <section id="hero" className="w-full min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto pt-32 pb-16">
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[50px] bg-[#efe9d2] border border-[#16140e]/20 text-[12px] text-[#57534a] mb-6 w-fit shadow-[2px_3px_0px_0px_rgba(22,20,14,0.07)]">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /> Available for frontend roles & contract work
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#16140e] mb-6 leading-[1.1]">
                Building fast, intuitive, <br />
                <span className="text-[#57534a]">and responsive web applications.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-[#57534a] leading-relaxed max-w-2xl mb-8 font-normal">
                Hi, I’m Ali. I’m a frontend developer specializing in React, JavaScript, and Tailwind CSS. I build high-performance user interfaces and responsive web systems.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="#projects" 
                  onClick={(e) => handleScroll(e, 'projects')} 
                  className="bg-[#f3b44a] text-[#16140e] border border-[#16140e] text-sm font-semibold px-6 py-3 rounded-[3px] shadow-[3px_5px_0px_0px_#16140e] hover:-translate-y-0.5 hover:shadow-[4px_6px_0px_0px_#16140e] transition-all"
                >
                  Explore Featured Work
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => handleScroll(e, 'contact')} 
                  className="bg-[#efe9d2] border border-[#16140e] text-[#16140e] text-sm font-medium px-6 py-3 rounded-[3px] shadow-[3px_5px_0px_0px_rgba(22,20,14,0.15)] hover:bg-[#e8e0c3] transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </Reveal>
          </section>

          {/* FEATURED PROJECTS */}
          <section id="projects" className="w-full py-24 border-t border-[#16140e]/15 bg-[#efe9d2]/40">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
              <Reveal direction="up">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#57534a] mb-2">// FEATURED PROJECTS</h2>
                <p className="text-2xl font-bold text-[#16140e] mb-12">Selected Applications & Production Builds</p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* PROJECT 1 CARD */}
                <Reveal direction="left">
                  <div className="bg-[#efe9d2] border border-[#16140e] rounded-[3px] p-6 shadow-[3px_5px_0px_0px_#16140e] hover:-translate-y-0.5 hover:shadow-[4px_6px_0px_0px_#16140e] transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="w-full h-52 bg-[#fbf7e6] rounded-[3px] border border-[#16140e]/30 mb-6 relative overflow-hidden group">
                        <iframe 
                          src="https://alidev-asset-ledger.vercel.app/" 
                          title="Live Asset Ledger Hub" 
                          className="w-full h-full border-none pointer-events-none scale-95 origin-top opacity-90 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                        <a 
                          href="https://alidev-asset-ledger.vercel.app/" 
                          target="_blank" 
                          rel="noreferrer"
                          className="absolute inset-0 bg-[#16140e]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-white backdrop-blur-xs"
                        >
                          Open Live Site ↗
                        </a>
                      </div>

                      <h3 className="text-lg font-bold text-[#16140e] mb-2">Enterprise Resource & Asset Ledger</h3>
                      <p className="text-xs text-[#57534a] leading-relaxed mb-6">
                        A responsive resource management interface engineered with state-controlled data grids, automated validation checks, and rapid row deletion workflows.
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#57534a] mb-6">
                        <span className="bg-[#fbf7e6] border border-[#16140e]/20 px-2.5 py-0.5 rounded-[50px]">React.js</span>
                        <span className="bg-[#fbf7e6] border border-[#16140e]/20 px-2.5 py-0.5 rounded-[50px]">JavaScript</span>
                        <span className="bg-[#fbf7e6] border border-[#16140e]/20 px-2.5 py-0.5 rounded-[50px]">Tailwind CSS</span>
                      </div>
                      <a href="https://alidev-asset-ledger.vercel.app/" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#16140e] underline decoration-[#f3b44a] underline-offset-4 hover:text-[#57534a] inline-flex items-center gap-1">
                        View Live Project ↗
                      </a>
                    </div>
                  </div>
                </Reveal>

                {/* PROJECT 2 CARD */}
                <Reveal direction="right">
                  <div className="bg-[#efe9d2] border border-[#16140e] rounded-[3px] p-6 shadow-[3px_5px_0px_0px_#16140e] hover:-translate-y-0.5 hover:shadow-[4px_6px_0px_0px_#16140e] transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="w-full h-52 bg-[#fbf7e6] rounded-[3px] border border-[#16140e]/30 mb-6 relative overflow-hidden group">
                        <iframe 
                          src="https://alidev-monolith-restaurant.vercel.app/" 
                          title="Live Experiential Restaurant Manifesto" 
                          className="w-full h-full border-none pointer-events-none scale-95 origin-top opacity-90 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                        <a 
                          href="https://alidev-monolith-restaurant.vercel.app/" 
                          target="_blank" 
                          rel="noreferrer"
                          className="absolute inset-0 bg-[#16140e]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-white backdrop-blur-xs"
                        >
                          Open Live Site ↗
                        </a>
                      </div>

                      <h3 className="text-lg font-bold text-[#16140e] mb-2">The Monolith Culinary Experience</h3>
                      <p className="text-xs text-[#57534a] leading-relaxed mb-6">
                        An experiential web application featuring asynchronous cover allocation simulation, dynamic menu matrices, and custom typography scaling.
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#57534a] mb-6">
                        <span className="bg-[#fbf7e6] border border-[#16140e]/20 px-2.5 py-0.5 rounded-[50px]">React.js</span>
                        <span className="bg-[#fbf7e6] border border-[#16140e]/20 px-2.5 py-0.5 rounded-[50px]">Tailwind CSS</span>
                        <span className="bg-[#fbf7e6] border border-[#16140e]/20 px-2.5 py-0.5 rounded-[50px]">State Management</span>
                      </div>
                      <a href="https://alidev-monolith-restaurant.vercel.app/" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#16140e] underline decoration-[#f3b44a] underline-offset-4 hover:text-[#57534a] inline-flex items-center gap-1">
                        View Live Project ↗
                      </a>
                    </div>
                  </div>
                </Reveal>

              </div>
            </div>
          </section>

          {/* TECHNICAL COMPETENCIES */}
          <section id="skills" className="w-full py-24 border-t border-[#16140e]/15">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
              <Reveal direction="up">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#57534a] mb-2">// SKILLS & TOOLKIT</h2>
                <p className="text-2xl font-bold text-[#16140e] mb-12">Technical Competencies</p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#efe9d2] border border-[#16140e] p-5 rounded-[3px] shadow-[2px_3px_0px_0px_#16140e]">
                  <h4 className="text-sm font-bold text-[#16140e] mb-2">Frontend Stack</h4>
                  <p className="text-xs text-[#57534a] leading-relaxed">React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</p>
                </div>
                <div className="bg-[#efe9d2] border border-[#16140e] p-5 rounded-[3px] shadow-[2px_3px_0px_0px_#16140e]">
                  <h4 className="text-sm font-bold text-[#16140e] mb-2">Backend & APIs</h4>
                  <p className="text-xs text-[#57534a] leading-relaxed">Node.js, Express.js, REST API Integration, JSON Data handling</p>
                </div>
                <div className="bg-[#efe9d2] border border-[#16140e] p-5 rounded-[3px] shadow-[2px_3px_0px_0px_#16140e]">
                  <h4 className="text-sm font-bold text-[#16140e] mb-2">Database & Tools</h4>
                  <p className="text-xs text-[#57534a] leading-relaxed">MongoDB, Git, GitHub, Vite, Vercel Deployment, npm</p>
                </div>
                <div className="bg-[#efe9d2] border border-[#16140e] p-5 rounded-[3px] shadow-[2px_3px_0px_0px_#16140e]">
                  <h4 className="text-sm font-bold text-[#16140e] mb-2">UI & Workflow</h4>
                  <p className="text-xs text-[#57534a] leading-relaxed">Responsive Web Design, Component Architecture, Cross-Browser Testing</p>
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCE & EDUCATION */}
          <section id="experience" className="w-full py-24 border-t border-[#16140e]/15 bg-[#efe9d2]/40">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
              <Reveal direction="up">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#57534a] mb-2">// EXPERIENCE</h2>
                <p className="text-2xl font-bold text-[#16140e] mb-12">Career & Training Timeline</p>

                <div className="border-l-2 border-[#16140e] pl-6 space-y-10 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[32px] top-1.5 w-3 h-3 bg-[#f3b44a] border border-[#16140e] rounded-full" />
                    <span className="text-xs font-mono text-[#57534a] block mb-1">2025 — PRESENT</span>
                    <h3 className="text-base font-bold text-[#16140e]">Full-Stack MERN Intern <span className="text-[#57534a] font-normal">at Co Dev</span></h3>
                    <p className="text-xs text-[#57534a] leading-relaxed mt-2">
                      Building modular frontend components, integrating API endpoints, fixing responsive layout regressions, and maintaining clean code standards.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[32px] top-1.5 w-3 h-3 bg-[#efe9d2] border border-[#16140e] rounded-full" />
                    <span className="text-xs font-mono text-[#57534a] block mb-1">2024 — 2025</span>
                    <h3 className="text-base font-bold text-[#16140e]">Web & Mobile Application Specialization <span className="text-[#57534a] font-normal">at Saylani SMIT</span></h3>
                    <p className="text-xs text-[#57534a] leading-relaxed mt-2">
                      Completed hands-on software development training focused on modern JavaScript, React ecosystem, and responsive layout architectures.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section id="certifications" className="w-full py-24 border-t border-[#16140e]/15">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
              <Reveal direction="up">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#57534a] mb-2">// CREDENTIALS</h2>
                <p className="text-2xl font-bold text-[#16140e] mb-12">Verified Certifications</p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <Reveal direction="up" key={cert.id}>
                    <div 
                      onClick={() => setSelectedCert(cert)}
                      className="bg-[#efe9d2] border border-[#16140e] rounded-[3px] overflow-hidden shadow-[3px_5px_0px_0px_#16140e] hover:-translate-y-0.5 hover:shadow-[4px_6px_0px_0px_#16140e] transition-all cursor-pointer flex flex-col justify-between h-full group"
                    >
                      <div className="aspect-video w-full bg-[#fbf7e6] overflow-hidden border-b border-[#16140e]/20">
                        <img src={cert.image} alt={cert.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#16140e] mb-1">{cert.name}</h4>
                          <p className="text-xs text-[#57534a] mb-4">{cert.issuer} • {cert.date}</p>
                        </div>
                        <span className="text-[11px] font-bold text-[#16140e]">View Details →</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT FORM */}
          <section id="contact" className="w-full py-24 border-t border-[#16140e]/15 bg-[#efe9d2]/40">
            <div className="max-w-2xl mx-auto px-6 md:px-12">
              <Reveal direction="up">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#57534a] mb-2">// CONTACT</h2>
                <p className="text-2xl font-bold text-[#16140e] mb-4">Let's Build Something Together</p>
                <p className="text-xs text-[#57534a] mb-8">Have a project in mind or an open frontend role? Send a message below.</p>

                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const button = e.target.querySelector('button[type="submit"]');
                    button.innerText = "Sending...";
                    button.disabled = true;

                    const formData = new FormData(e.target);
                    formData.append("access_key", "88ceeda0-153d-407e-a28a-b7ebe46c9979");

                    try {
                      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
                      const data = await res.json();
                      if (data.success) {
                        button.innerText = "Message Sent ✓";
                        e.target.reset();
                      } else {
                        button.innerText = "Send Failed";
                      }
                    } catch {
                      button.innerText = "Error Occurred";
                    } finally {
                      setTimeout(() => {
                        button.disabled = false;
                        button.innerText = "Send Message";
                      }, 4000);
                    }
                  }} 
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="name" required placeholder="Your Name" className="w-full bg-[#fbf7e6] border border-[#16140e] p-3.5 rounded-[3px] text-[#16140e] placeholder-[#57534a] focus:outline-none focus:ring-2 focus:ring-[#f3b44a] transition-colors shadow-[2px_3px_0px_0px_rgba(22,20,14,0.07)]" />
                    <input type="email" name="email" required placeholder="Your Email" className="w-full bg-[#fbf7e6] border border-[#16140e] p-3.5 rounded-[3px] text-[#16140e] placeholder-[#57534a] focus:outline-none focus:ring-2 focus:ring-[#f3b44a] transition-colors shadow-[2px_3px_0px_0px_rgba(22,20,14,0.07)]" />
                  </div>
                  <textarea rows="4" name="message" required placeholder="Project details or inquiry..." className="w-full bg-[#fbf7e6] border border-[#16140e] p-3.5 rounded-[3px] text-[#16140e] placeholder-[#57534a] focus:outline-none focus:ring-2 focus:ring-[#f3b44a] transition-colors shadow-[2px_3px_0px_0px_rgba(22,20,14,0.07)]" />
                  
                  <button 
                    type="submit" 
                    className="bg-[#f3b44a] text-[#16140e] border border-[#16140e] text-xs font-semibold px-6 py-3 rounded-[3px] shadow-[3px_5px_0px_0px_#16140e] hover:-translate-y-0.5 hover:shadow-[4px_6px_0px_0px_#16140e] transition-all disabled:opacity-50"
                  >
                    Send Message
                  </button>
                </form>
              </Reveal>
            </div>
          </section>
        </>
      ) : (
        /* WAITLIST UI VIEW */
        <section className="w-full min-h-screen flex items-center justify-center px-6 pt-32 pb-16">
          <Reveal direction="up">
            <div className="max-w-xl mx-auto bg-[#efe9d2] border border-[#16140e] rounded-[3px] p-8 md:p-12 shadow-[6px_8px_0px_0px_#16140e]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[50px] bg-[#fbf7e6] border border-[#16140e]/20 text-[11px] font-mono uppercase tracking-wider text-[#57534a] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f3b44a] animate-ping" /> Early Access V1.0
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#16140e] mb-4 leading-tight">
                Get priority access to our next web product.
              </h2>
              
              <p className="text-xs sm:text-sm text-[#57534a] leading-relaxed mb-8">
                We're crafting an intuitive developer workspace designed for frontend performance tracking and real-time layout validation. Join the waitlist today.
              </p>

              {waitlistStatus === 'success' ? (
                <div className="bg-[#fbf7e6] border border-[#16140e] p-4 rounded-[3px] text-xs font-bold text-[#16140e] shadow-[2px_3px_0px_0px_#16140e] flex items-center gap-2">
                  <span className="text-emerald-600 font-bold text-base">✓</span> You've been added to the early access queue!
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      required 
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="Enter your work email" 
                      className="flex-1 bg-[#fbf7e6] border border-[#16140e] p-3 rounded-[3px] text-xs text-[#16140e] placeholder-[#57534a] focus:outline-none focus:ring-2 focus:ring-[#f3b44a] shadow-[2px_3px_0px_0px_rgba(22,20,14,0.07)]"
                    />
                    <button 
                      type="submit" 
                      disabled={waitlistStatus === 'submitting'}
                      className="bg-[#f3b44a] text-[#16140e] border border-[#16140e] text-xs font-bold px-6 py-3 rounded-[3px] shadow-[3px_4px_0px_0px_#16140e] hover:-translate-y-0.5 hover:shadow-[4px_5px_0px_0px_#16140e] transition-all whitespace-nowrap disabled:opacity-50"
                    >
                      {waitlistStatus === 'submitting' ? 'Joining...' : 'Join Waitlist →'}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#57534a] font-mono">No spam. Unsubscribe anytime with one click.</p>
                </form>
              )}

              <div className="mt-10 pt-6 border-t border-[#16140e]/15 grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="block text-lg font-bold text-[#16140e]">1,200+</span>
                  <span className="text-[10px] text-[#57534a] font-mono uppercase tracking-wider">Developers</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-[#16140e]">Q4 2026</span>
                  <span className="text-[10px] text-[#57534a] font-mono uppercase tracking-wider">Target Launch</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-[#16140e]">100%</span>
                  <span className="text-[10px] text-[#57534a] font-mono uppercase tracking-wider">Open Source</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* FOOTER */}
      <footer className="w-full border-t border-[#16140e]/15 px-6 md:px-12 py-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#57534a] space-y-4 sm:space-y-0 max-w-5xl mx-auto">
        <span>&copy; {new Date().getFullYear()} Ali Haider. All rights reserved.</span>
        <div className="flex space-x-6">
          <a href="https://github.com/Alihaidercr3" target="_blank" rel="noreferrer" className="hover:text-[#16140e] transition-colors">GitHub</a>
          <a href="#" className="hover:text-[#16140e] transition-colors">LinkedIn</a>
        </div>
      </footer>

      {/* CERTIFICATE MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#16140e]/60 backdrop-blur-xs" onClick={() => setSelectedCert(null)} />
          
          <div className="relative w-full max-w-lg bg-[#fbf7e6] border border-[#16140e] rounded-[3px] p-6 shadow-[6px_8px_0px_0px_#16140e] z-10">
            <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 text-[#57534a] hover:text-[#16140e]">✕</button>
            
            <h3 className="text-xl font-bold text-[#16140e] mb-1">{selectedCert.name}</h3>
            <p className="text-xs text-[#57534a] mb-4">{selectedCert.issuer} — {selectedCert.date}</p>
            
            <div className="w-full bg-[#efe9d2] border border-[#16140e]/20 rounded-[3px] mb-4 overflow-hidden">
              <img src={selectedCert.image} alt={selectedCert.name} className="w-full h-auto object-contain max-h-60" />
            </div>

            <p className="text-xs text-[#57534a] leading-relaxed mb-6">{selectedCert.description}</p>
            
            <button onClick={() => setSelectedCert(null)} className="bg-[#efe9d2] text-[#16140e] border border-[#16140e] text-xs font-semibold px-4 py-2 rounded-[3px] hover:bg-[#e8e0c3]">
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
}