import React, { useEffect, useRef, useState } from 'react';
import Waitlist from './components/waitlist';

// Import your certificate images from the assets folder
import anthropicsImg from "./assets/anthropics.png";
import deloitteImg from "./assets/deloitte.png";
import courseraImg from "./assets/coursera.png";

// REUSABLE MINIMALIST SCROLL-REVEAL WRAPPER
function Reveal({ children, direction = 'up' }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { 
        threshold: 0.15, 
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getDirectionClass = () => {
    if (isIntersecting) return 'opacity-100 translate-x-0 translate-y-0';
    switch (direction) {
      case 'left': return 'opacity-0 -translate-x-12';
      case 'right': return 'opacity-0 translate-x-12';
      case 'up':
      default: return 'opacity-0 translate-y-12';
    }
  };

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out will-change-transform ${getDirectionClass()}`}>
      {children}
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentView, setCurrentView] = useState('portfolio'); 
  
  // MODAL STATE
  const [selectedCert, setSelectedCert] = useState(null);

  const handleScroll = (e, id) => {
    e.preventDefault();
    setAnimationKey(prev => prev + 1);
    setIsMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Certificate Data Array with imported image variables and descriptions
  const certificates = [
    {
      id: 1,
      name: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic",
      date: "Aug 2026",
      image: anthropicsImg,
      link: "#",
      description: "A foundational certification verifying core competencies in artificial intelligence frameworks. Covers the structural understanding of AI models, their practical implementations, and the technical fluency required to leverage modern AI tools."
    },
    {
      id: 2,
      name: "Data Analytics Job Simulation",
      issuer: "Deloitte",
      date: "Jan 2025",
      image: deloitteImg,
      link: "#",
      description: "A practical job simulation verifying capabilities in enterprise-level data analysis and forensic technology. Demonstrated proficiency in extracting actionable insights and handling complex datasets within a simulated corporate environment."
    },
    {
      id: 3,
      name: "Build a free website with WordPress",
      issuer: "Coursera",
      date: "Mar 2026",
      image: courseraImg,
      link: "#",
      description: "A project-based certification demonstrating the ability to design, build, and launch a fully functional website utilizing the WordPress Content Management System, focusing on layout structure and content management."
    }
  ];

  return (
    <div>
      {/* FLOATING VIEW CONTROLLER BUTTON BOX */}
      <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-800 p-2 flex space-x-2 text-[10px] font-mono uppercase tracking-widest text-white rounded shadow-2xl">
        <button 
          onClick={() => setCurrentView('portfolio')} 
          className={`px-3 py-1.5 rounded transition-all ${currentView === 'portfolio' ? 'bg-white text-black font-bold' : 'hover:bg-zinc-800 text-zinc-400'}`}
        >
          [ View Portfolio ]
        </button>
        <button 
          onClick={() => setCurrentView('waitlist')} 
          className={`px-3 py-1.5 rounded transition-all ${currentView === 'waitlist' ? 'bg-white text-black font-bold' : 'hover:bg-zinc-800 text-zinc-400'}`}
        >
          [ View Waitlist UI ]
        </button>
      </div>

      {/* FIXED WRAPPER CONTROLLER SWITCH */}
      {currentView === 'portfolio' ? (
        <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-zinc-800 selection:text-white antialiased font-sans">
          
          {/* GLOBAL NAVIGATION BAR */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-900 px-6 md:px-16 py-4 flex justify-between items-center">
            <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="text-xs font-bold tracking-widest uppercase text-white hover:text-zinc-400 transition-colors z-50">
              ALI DEV
            </a>

            <div className="hidden md:flex items-center space-x-8 text-[10px] font-medium tracking-widest uppercase text-zinc-400">
              <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="hover:text-white transition-colors">Home</a>
              <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="hover:text-white transition-colors">Work</a>
              <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className="hover:text-white transition-colors">Skills</a>
              <a href="#testimonials" onClick={(e) => handleScroll(e, 'testimonials')} className="hover:text-white transition-colors">Testimonials</a>
              <a href="#experience" onClick={(e) => handleScroll(e, 'experience')} className="hover:text-white transition-colors">Resume</a>
              <a href="#certifications" onClick={(e) => handleScroll(e, 'certifications')} className="hover:text-white transition-colors">Certs</a>
              <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="border border-zinc-800 px-3 py-1.5 text-white hover:bg-white hover:text-black transition-all">Contact</a>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden flex flex-col justify-center items-center space-y-1.5 z-50 w-6 h-6 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            <div className={`fixed top-0 right-0 bottom-0 w-[75vw] max-w-[320px] bg-[#0c0c0e] border-l border-zinc-900 z-40 p-12 pt-28 flex flex-col space-y-8 text-sm font-semibold tracking-widest uppercase text-zinc-400 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="hover:text-white transition-colors py-2 border-b border-zinc-950">Home</a>
              <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="hover:text-white transition-colors py-2 border-b border-zinc-950">Work</a>
              <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className="hover:text-white transition-colors py-2 border-b border-zinc-950">Skills</a>
              <a href="#testimonials" onClick={(e) => handleScroll(e, 'testimonials')} className="hover:text-white transition-colors py-2 border-b border-zinc-950">Testimonials</a>
              <a href="#experience" onClick={(e) => handleScroll(e, 'experience')} className="hover:text-white transition-colors py-2 border-b border-zinc-950">Resume</a>
              <a href="#certifications" onClick={(e) => handleScroll(e, 'certifications')} className="hover:text-white transition-colors py-2 border-b border-zinc-950">Certs</a>
              <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="border border-zinc-800 p-3 text-center text-white hover:bg-white hover:text-black transition-all mt-4">Contact</a>
            </div>

            {isMenuOpen && (
              <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden" />
            )}
          </nav>

          {/* 1. HERO SECTION */}
          <section id="hero" className="w-full min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-6xl mx-auto pt-20">
            <Reveal direction="up" key={`hero-${animationKey}`}>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-4">// BRAND ARCHITECTURE v1.0</span>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white uppercase leading-none mb-6">
                ALI DEV <br /><span className="text-zinc-700">FRONTEND ENGINEER.</span>
              </h1>
              <p className="text-base md:text-xl text-zinc-400 leading-relaxed max-w-3xl font-normal mb-8">
                I build complex, data-intensive user interfaces, scalable frontend architectures, and optimized application layers for global technology teams and scaling remote digital agencies.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="bg-white text-black text-[10px] font-bold tracking-widest uppercase px-6 py-4 hover:bg-zinc-200 transition-colors">
                  View Enterprise Systems
                </a>
                <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="border border-zinc-800 text-white text-[10px] font-bold tracking-widest uppercase px-6 py-4 hover:bg-zinc-900 transition-colors">
                  Discuss Project Scope
                </a>
              </div>
            </Reveal>
          </section>

          {/* 2. SELECTED PRODUCTION ARCHITECTURES SECTION */}
          <section id="projects" className="w-full py-32 border-t border-zinc-900 scroll-mt-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 md:px-16">
              <Reveal direction="up" key={`proj-title-${animationKey}`}>
                <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-12">// PRODUCTION SYSTEM ARCHITECTURES</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* LIVE PROJECT 1 INTERACTIVE VIEWPORT */}
                <Reveal direction="left" key={`proj-1-${animationKey}`}>
                  <div className="bg-[#121214] border border-zinc-900 p-8 rounded-lg group hover:border-zinc-800 transition-all">
                    <div className="w-full h-64 bg-zinc-950 rounded border border-zinc-900 mb-6 relative overflow-hidden shadow-inner">
                      <iframe 
                        src="https://alidev-asset-ledger.vercel.app/" 
                        title="Live Asset Ledger Hub" 
                        className="w-full h-full border-none pointer-events-auto scale-95 origin-top rounded"
                        loading="lazy"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">Enterprise Resource Hub & Asset Ledger</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      A high-performance interface engineered to manage complex business resource records. Features a mobile-responsive layout utilizing state-controlled data tables to execute structural validation checks and rapid cascade row deletions.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[9px] font-mono uppercase text-zinc-500 mb-6">
                      <span>React.js</span><span>JavaScript</span><span>Tailwind CSS v4</span>
                    </div>
                    <div className="flex space-x-6 text-xs font-bold tracking-widest uppercase">
                      <a href="https://alidev-asset-ledger.vercel.app/" target="_blank" rel="noreferrer" className="text-white hover:underline">Open Full Screen →</a>
                    </div>
                  </div>
                </Reveal>

                {/* LIVE PROJECT 2 INTERACTIVE VIEWPORT */}
                <Reveal direction="right" key={`proj-2-${animationKey}`}>
                  <div className="bg-[#121214] border border-zinc-900 p-8 rounded-lg group hover:border-zinc-800 transition-all">
                    <div className="w-full h-64 bg-[#f9f9f3] rounded border border-zinc-900 mb-6 relative overflow-hidden shadow-inner">
                      <iframe 
                        src="https://alidev-monolith-restaurant.vercel.app/" 
                        title="Live Experiential Restaurant Manifesto" 
                        className="w-full h-full border-none pointer-events-auto scale-95 origin-top rounded"
                        loading="lazy"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">The Monolith Culinary Residence</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      An experiential web presentation layer inspired by Noma, built on clean responsive grid components. Features an integrated asynchronous cover allocation simulator, menu matrices, and premium typography scales.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[9px] font-mono uppercase text-zinc-500 mb-6">
                      <span>React.js</span><span>Tailwind v4</span><span>State Controls</span>
                    </div>
                    <div className="flex space-x-6 text-xs font-bold tracking-widest uppercase">
                      <a href="https://alidev-monolith-restaurant.vercel.app/" target="_blank" rel="noreferrer" className="text-white hover:underline">Open Full Screen →</a>
                    </div>
                  </div>
                </Reveal>

              </div>
            </div>
          </section>

          {/* 3. TECHNICAL COMPETENCIES SECTION */}
          <section id="skills" className="w-full py-32 border-t border-zinc-900 bg-[#0c0c0e] scroll-mt-20">
            <div className="max-w-6xl mx-auto px-6 md:px-16">
              <Reveal direction="up" key={`skills-title-${animationKey}`}>
                <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-12">// CORE TECHNICAL COMPETENCIES</p>
              </Reveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Reveal direction="up" key={`skill-1-${animationKey}`}>
                  <div className="border border-zinc-800 bg-[#121214] p-6 rounded hover:border-zinc-700 transition-colors h-full">
                    <span className="text-sm font-bold text-white block mb-2">Frontend Stack</span>
                    <span className="text-xs text-zinc-400 leading-relaxed block font-mono">React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</span>
                  </div>
                </Reveal>
                <Reveal direction="up" key={`skill-2-${animationKey}`}>
                  <div className="border border-zinc-800 bg-[#121214] p-6 rounded hover:border-zinc-700 transition-colors h-full">
                    <span className="text-sm font-bold text-white block mb-2">Backend Logic</span>
                    <span className="text-xs text-zinc-400 leading-relaxed block font-mono">Node.js, Express.js, REST API Development, Routing Orchestration</span>
                  </div>
                </Reveal>
                <Reveal direction="up" key={`skill-3-${animationKey}`}>
                  <div className="border border-zinc-800 bg-[#121214] p-6 rounded hover:border-zinc-700 transition-colors h-full">
                    <span className="text-sm font-bold text-white block mb-2">Database Systems</span>
                    <span className="text-xs text-zinc-400 leading-relaxed block font-mono">MongoDB, Data Schemas, Query Optimization, Dynamic Storage</span>
                  </div>
                </Reveal>
                <Reveal direction="up" key={`skill-4-${animationKey}`}>
                  <div className="border border-zinc-800 bg-[#121214] p-6 rounded hover:border-zinc-700 transition-colors h-full">
                    <span className="text-sm font-bold text-white block mb-2">Developer Tools</span>
                    <span className="text-xs text-zinc-400 leading-relaxed block font-mono">Git, GitHub, Terminal Interface, automated QA testing workflows</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 4. CLIENT VERIFICATIONS SECTION */}
          <section id="testimonials" className="w-full py-32 border-t border-zinc-900 scroll-mt-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 md:px-16">
              <Reveal direction="up" key={`testimonials-title-${animationKey}`}>
                <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-12">// RECENT CLIENT VERIFICATIONS</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Reveal direction="left" key={`testimonial-1-${animationKey}`}>
                  <div className="border border-zinc-900 bg-[#121214] p-8 rounded">
                    <p className="text-sm text-zinc-400 italic leading-relaxed mb-6">
                      "Ali delivered clean modular architectural loops for our backend routing stack. His validation setup was exactly what our core engineering guidelines demanded."
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-mono font-bold text-white">S</div>
                      <div>
                        <h5 className="text-sm font-bold text-white">Senior Web Lead</h5>
                        <span className="text-[10px] text-zinc-500 font-mono block">Co Dev Operations Team</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal direction="right" key={`testimonial-2-${animationKey}`}>
                  <div className="border border-zinc-900 bg-[#121214] p-8 rounded">
                    <p className="text-sm text-zinc-400 italic leading-relaxed mb-6">
                      "Outstanding code precision during his engineering tasks. He values layout performance standards and communicates blockers immediately without guessing."
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-mono font-bold text-white">M</div>
                      <div>
                        <h5 className="text-sm font-bold text-white">Project Supervisor</h5>
                        <span className="text-[10px] text-zinc-500 font-mono block">Technical Delivery Unit</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 5. HISTORY TIMELINE SECTION */}
          <section id="experience" className="w-full py-32 border-t border-zinc-900 bg-[#0c0c0e] scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6 md:px-16">
              <Reveal direction="up" key={`experience-timeline-${animationKey}`}>
                <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-12">// EDUCATION & CONTRACT TIMELINE</p>
                <div className="border-l border-zinc-800 pl-8 space-y-12 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1.5 w-2 h-2 bg-white rounded-full ring-4 ring-[#0c0c0e]" />
                    <span className="text-xs font-mono text-zinc-500 block mb-1">2025 — PRESENT</span>
                    <h4 className="text-lg font-bold text-white">Full-Stack MERN Developer Intern — Co Dev</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed mt-2">
                      Engineered modular code segments, integrated isolated database schemas, fixed production layout breaks, and verified component alignment behaviors across active client architectures.
                    </p>
                  </div> 
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1.5 w-2 h-2 bg-zinc-800 rounded-full ring-4 ring-[#0c0c0e]" />
                    <span className="text-xs font-mono text-zinc-500 block mb-1">2024 — 2025</span>
                    <h4 className="text-lg font-bold text-white">Web & Mobile Application Specialization — Saylani SMIT</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed mt-2">
                      Completed an exhaustive professional engineering program focusing on advanced script structures, client data grids, state controllers, and deployment strategies.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* 6. CERTIFICATIONS SECTION */}
          <section id="certifications" className="w-full py-32 border-t border-zinc-900 scroll-mt-20">
            <div className="max-w-6xl mx-auto px-6 md:px-16">
              <Reveal direction="up" key={`certs-title-${animationKey}`}>
                <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-12">// CERTIFICATIONS</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {certificates.map((cert, i) => (
                  <Reveal direction="up" key={`cert-${i}-${animationKey}`}>
                    <div 
                      onClick={() => setSelectedCert(cert)}
                      className="group block border border-zinc-800 bg-[#121214] rounded overflow-hidden hover:border-zinc-700 transition-colors h-full cursor-pointer flex flex-col"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden border-b border-zinc-900 bg-zinc-950">
                        <img 
                          src={cert.image} 
                          alt={cert.name} 
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-sm font-bold text-white block mb-1">{cert.name}</span>
                          <span className="text-xs text-zinc-400 block font-mono mb-3">{cert.issuer}</span>
                        </div>
                        <span className="text-[9px] text-zinc-500 font-mono uppercase">{cert.date} · View Details →</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 7. DIRECT CONNECT CONTACT FORM */}
          <section id="contact" className="w-full py-32 border-t border-zinc-900 scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6 md:px-16">
              <Reveal direction="up" key={`contact-form-wrapper-${animationKey}`}>
                <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-6">// DATA LAYER DIRECT CONNECT</p>
                <div className="bg-[#121214] border border-zinc-900 p-8 rounded-lg">
                  <h4 className="text-xl font-bold text-white mb-2">Initiate System Requirements</h4>
                  <p className="text-sm text-zinc-400 mb-8">Drop your details below to map out a scalable project structure.</p>
                  
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const button = e.target.querySelector('button[type="submit"]');
                      const originalText = button.innerText;
                      button.innerText = "TRANSMITTING...";
                      button.disabled = true;

                      const formData = new FormData(e.target);
                      formData.append("access_key", "88ceeda0-153d-407e-a28a-b7ebe46c9979");

                      try {
                        const res = await fetch("https://api.web3forms.com/submit", {
                          method: "POST",
                          body: formData
                        });
                        const data = await res.json();
                        if (data.success) {
                          button.innerText = "TRANSMITTED SUCCESSFULLY ✓";
                          e.target.reset();
                        } else {
                          button.innerText = "TRANSMIT FAILED";
                        }
                      } catch (err) {
                        button.innerText = "NETWORK ERROR";
                      } finally {
                        setTimeout(() => {
                          button.disabled = false;
                          button.innerText = originalText;
                        }, 4000);
                      }
                    }} 
                    className="space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" name="name" required placeholder="Name" className="w-full bg-[#09090b] border border-zinc-800 p-4 rounded text-white focus:outline-none focus:border-zinc-500 transition-colors" />
                      <input type="email" name="email" required placeholder="Email" className="w-full bg-[#09090b] border border-zinc-800 p-4 rounded text-white focus:outline-none focus:border-zinc-500 transition-colors" />
                    </div>
                    <textarea rows="5" name="message" required placeholder="Project Specifications / Scope Description" className="w-full bg-[#09090b] border border-zinc-800 p-4 rounded text-white focus:outline-none focus:border-zinc-500 transition-colors"></textarea>
                    
                    <button type="submit" className="bg-white text-black font-bold tracking-widest uppercase px-6 py-4 hover:bg-zinc-200 transition-colors text-[10px] disabled:bg-zinc-800 disabled:text-zinc-500">
                      Transmit Requirement
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="w-full border-t border-zinc-900 px-6 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono tracking-wider text-zinc-500 space-y-4 md:space-y-0 max-w-6xl mx-auto">
            <span>&copy; {new Date().getFullYear()} ALI DEV. ENGINE OPERATIONAL.</span>
            <div className="flex space-x-6 uppercase font-bold text-zinc-400">
              <a href="https://github.com/Alihaidercr3" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </footer>

          {/* --- EXPANDABLE CERTIFICATE MODAL --- */}
          {selectedCert && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={() => setSelectedCert(null)}
              ></div>
              
              <div className="relative w-full max-w-2xl bg-[#0c0c0e] border border-zinc-800 rounded-lg shadow-2xl p-8 md:p-12 transform transition-all duration-300 max-h-[90vh] overflow-y-auto">
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-zinc-500 hover:text-white transition-colors p-2 text-xl"
                >
                  ✕
                </button>

                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-4 block">
                  // CREDENTIAL DETAILS
                </span>
                
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4">
                  {selectedCert.name}
                </h3>
                
                <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono text-zinc-400">
                  <span className="border border-zinc-800 px-3 py-1 bg-[#121214] rounded">ISSUER: {selectedCert.issuer}</span>
                  <span className="border border-zinc-800 px-3 py-1 bg-[#121214] rounded">DATE: {selectedCert.date}</span>
                </div>

                <div className="w-full bg-[#121214] border border-zinc-900 rounded mb-8 overflow-hidden">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.name} 
                    className="w-full h-auto object-contain max-h-[350px]"
                  />
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-8">
                  {selectedCert.description}
                </p>

                <div className="flex justify-start">
                  <a 
                    href={selectedCert.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-white text-black text-[10px] font-bold tracking-widest uppercase px-6 py-4 hover:bg-zinc-200 transition-colors"
                  >
                    Verify Source File →
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : (
        <Waitlist />
      )}
    </div>
  );
}