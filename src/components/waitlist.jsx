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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getDirectionClass = () => {
    if (isIntersecting) return "opacity-100 translate-x-0 translate-y-0";
    switch (direction) {
      case "left":
        return "opacity-0 -translate-x-12";
      case "right":
        return "opacity-0 translate-x-12";
      case "up":
      default:
        return "opacity-0 translate-y-12";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out will-change-transform ${getDirectionClass()}`}
    >
      {children}
    </div>
  );
}

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa] antialiased font-sans select-none selection:bg-zinc-800 selection:text-white">
      {/* 1. MINIMAL AUTOMATION HEADER BAR */}
      <header className="w-full max-w-6xl mx-auto px-6 md:px-16 py-6 flex justify-between items-center border-b border-zinc-900/50">
        <span className="text-xs font-black tracking-widest text-white uppercase">
          ALI DESIGN CO. // STUDIO
        </span>
        <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
          [ STATUS: ACCESS OPEN ]
        </span>
      </header>

      {/* 2. CONVERSION-FOCUSED HERO BLOCK */}
      {/* 2. CONVERSION-FOCUSED HERO BLOCK */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center flex flex-col items-center justify-center w-full">
        {/* UPPER TEXT ELEMENT LAYERS */}
        <Reveal direction="up">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-4 block text-center">
            // PROTOCOL INCEPTION
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-tight max-w-3xl mb-6 text-center">
            Pixel-Perfect Frontend{" "}
            <span className="text-zinc-600">Layout Production.</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed mb-8 font-normal text-center mx-auto">
            We turn complex Figma design files and written briefs into
            ultra-fast, mobile-responsive, and conversion-focused websites.
            Built with zero performance lag.
          </p>
        </Reveal>

        {/* EMAIL CAPTURE INPUT FIELD CONTAINER (Safely wrapped inside the section parent) */}
        <Reveal direction="up">
          <div className="w-full max-w-md bg-[#09090b] border border-zinc-800 p-2 rounded-lg focus-within:border-zinc-500 transition-colors mx-auto text-center mt-4">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2 justify-center items-center w-full"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter institutional email..."
                  className="w-full bg-transparent px-3 py-2 text-xs text-white focus:outline-none placeholder-zinc-600 font-mono text-center sm:text-left"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-white text-black text-[10px] font-bold tracking-widest uppercase px-5 py-2.5 hover:bg-zinc-200 transition-all font-sans whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </form>
            ) : (
              <div className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase py-2.5 px-3 text-center">
                ✓ System verification sent. Terminal access pending.
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* 3. PERFORMANCE CARD GRID MATRIX */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-16 border-t border-zinc-900 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal direction="left">
            <div className="border border-zinc-900 bg-[#09090b] p-6 rounded-md hover:border-zinc-800 transition-colors h-full">
              <span className="text-xs font-mono text-zinc-600 uppercase block mb-3">
                [ 01 / INTEGRITY ]
              </span>
              <h3 className="text-sm font-bold text-white mb-2 uppercase">
                Figma To Code
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Translating visual design assets into highly structured,
                semantic code layouts that work cleanly across all devices.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up">
            <div className="border border-zinc-800 bg-[#0c0c0e] p-6 rounded-md hover:border-zinc-700 transition-colors h-full">
              <span className="text-xs font-mono text-zinc-500 uppercase block mb-3">
                [ 02 / METRICS ]
              </span>
              <h3 className="text-sm font-bold text-white mb-2 uppercase">
                Speed Optimized
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Lightweight layout architecture built without slow dependencies
                to ensure maximum scores on Core Web Vitals.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="border border-zinc-900 bg-[#09090b] p-6 rounded-md hover:border-zinc-800 transition-colors h-full">
              <span className="text-xs font-mono text-zinc-600 uppercase block mb-3">
                [ 03 / STABILITY ]
              </span>
              <h3 className="text-sm font-bold text-white mb-2 uppercase">
                Responsive QA
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Thoroughly audited layout components tested across Google
                Chrome, Safari, and small mobile viewports for perfect scaling.
              </p>
            </div> 
          </Reveal>
        </div>
      </section>
    </div>
  );
}
