import React, { useEffect, useRef, useState } from "react";

// REUSABLE NATIVE REVEAL WRAPPER
function Reveal({ children, direction = "up" }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getDirectionClass = () => {
    if (isIntersecting) return "opacity-100 translate-x-0 translate-y-0";
    switch (direction) {
      case "left":
        return "opacity-0 -translate-x-8";
      case "right":
        return "opacity-0 translate-x-8";
      case "up":
      default:
        return "opacity-0 translate-y-8";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out will-change-transform ${getDirectionClass()}`}
    >
      {children}
    </div>
  );
}

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
        setEmail("");
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7e6] text-[#16140e] antialiased font-sans selection:bg-[#f3b44a] selection:text-[#16140e]">
      {/* 1. HEADER BAR */}
      <header className="w-full max-w-5xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center border-b border-[#16140e]/15">
        <span className="text-xs font-bold tracking-wider uppercase text-[#16140e]">
          Ali Haider <span className="text-[#57534a] font-normal">// Studio Access</span>
        </span>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[50px] bg-[#efe9d2] border border-[#16140e]/20 text-[11px] text-[#57534a] font-mono shadow-[2px_3px_0px_0px_rgba(22,20,14,0.07)]">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          STATUS: ACCESS OPEN
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center flex flex-col items-center justify-center w-full">
        <Reveal direction="up">
          <span className="text-xs font-mono uppercase tracking-widest text-[#57534a] mb-3 block text-center">
            // PROTOCOL INCEPTION
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#16140e] uppercase leading-[1.1] mb-6 text-center">
            Pixel-Perfect Frontend <br />
            <span className="text-[#57534a]">Layout Production</span>
          </h1>
          <p className="text-sm sm:text-base text-[#57534a] max-w-xl leading-relaxed mb-8 font-normal text-center mx-auto">
            We convert complex Figma design files and architectural specs into ultra-fast, WCAG-compliant, and conversion-focused web applications.
          </p>
        </Reveal>

        {/* EMAIL CAPTURE FORM */}
        <Reveal direction="up">
          <div className="w-full max-w-md bg-[#efe9d2] border border-[#16140e] p-3 rounded-[3px] shadow-[3px_5px_0px_0px_#16140e] mx-auto text-center mt-2">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2.5 justify-center items-center w-full"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter institutional email..."
                  className="w-full bg-[#fbf7e6] border border-[#16140e] px-3.5 py-2.5 text-xs text-[#16140e] placeholder-[#57534a] rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#f3b44a] font-mono"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#f3b44a] text-[#16140e] border border-[#16140e] text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-[3px] hover:-translate-y-0.5 hover:shadow-[3px_4px_0px_0px_#16140e] shadow-[2px_3px_0px_0px_#16140e] transition-all whitespace-nowrap disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Processing..." : "Join Waitlist"}
                </button>
              </form>
            ) : (
              <div className="text-xs font-mono tracking-wide text-[#16140e] py-3 px-3 text-center bg-[#fbf7e6] border border-[#16140e] rounded-[3px]">
                ✓ System verification sent. Terminal access pending.
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* 3. PERFORMANCE MATRIX */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-[#16140e]/15">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal direction="left">
            <div className="bg-[#efe9d2] border border-[#16140e] p-6 rounded-[3px] shadow-[3px_5px_0px_0px_#16140e] hover:-translate-y-0.5 transition-all h-full">
              <span className="text-xs font-mono text-[#57534a] uppercase block mb-3">
                [ 01 / INTEGRITY ]
              </span>
              <h3 className="text-sm font-bold text-[#16140e] mb-2 uppercase">
                Figma To Code
              </h3>
              <p className="text-xs text-[#57534a] leading-relaxed">
                Translating visual design assets into highly structured, semantic React layout architectures that scale cleanly across viewports.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up">
            <div className="bg-[#efe9d2] border border-[#16140e] p-6 rounded-[3px] shadow-[3px_5px_0px_0px_#16140e] hover:-translate-y-0.5 transition-all h-full">
              <span className="text-xs font-mono text-[#57534a] uppercase block mb-3">
                [ 02 / METRICS ]
              </span>
              <h3 className="text-sm font-bold text-[#16140e] mb-2 uppercase">
                Speed Optimized
              </h3>
              <p className="text-xs text-[#57534a] leading-relaxed">
                Lightweight layout engines built without bloated dependencies to ensure peak performance scores across Core Web Vitals.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="bg-[#efe9d2] border border-[#16140e] p-6 rounded-[3px] shadow-[3px_5px_0px_0px_#16140e] hover:-translate-y-0.5 transition-all h-full">
              <span className="text-xs font-mono text-[#57534a] uppercase block mb-3">
                [ 03 / STABILITY ]
              </span>
              <h3 className="text-sm font-bold text-[#16140e] mb-2 uppercase">
                Responsive QA
              </h3>
              <p className="text-xs text-[#57534a] leading-relaxed">
                Thoroughly audited layout components tested across desktop and mobile viewports for strict WCAG AA accessibility compliance.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}