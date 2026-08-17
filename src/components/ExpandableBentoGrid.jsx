import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../hooks/use-outside-click';
import { X } from 'lucide-react';

export default function ExpandableBentoGrid({ items }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') setActive(null);
    }

    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm h-full w-full z-[10000]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 grid place-items-center z-[10001] p-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-start p-6 border-b border-zinc-800">
                <div className="flex items-center space-x-4">
                  <motion.div 
                    layoutId={`image-${active.title}-${id}`}
                    className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0"
                  >
                    {active.icon}
                  </motion.div>
                  <div>
                    <motion.h3 
                      layoutId={`title-${active.title}-${id}`}
                      className="text-base font-bold text-white uppercase tracking-wider"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p 
                      layoutId={`subtitle-${active.title}-${id}`}
                      className="text-xs font-mono text-zinc-500"
                    >
                      {active.subtitle}
                    </motion.p>
                  </div>
                </div>
                
                <button
                  onClick={() => setActive(null)}
                  className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <motion.p className="text-sm text-zinc-400 leading-relaxed">
                  {active.description}
                </motion.p>
                <div className="pt-2 border-t border-zinc-900">
                  {active.content}
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            layoutId={`card-${item.title}-${id}`}
            key={item.id}
            onClick={() => setActive(item)}
            className="border border-zinc-800 bg-[#121214] p-6 rounded-xl hover:border-zinc-700 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center space-x-4 mb-4">
              <motion.div 
                layoutId={`image-${item.title}-${id}`}
                className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-zinc-700 transition-colors"
              >
                {item.icon}
              </motion.div>
              <div>
                <motion.h3 
                  layoutId={`title-${item.title}-${id}`}
                  className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors"
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  layoutId={`subtitle-${item.title}-${id}`}
                  className="text-[10px] font-mono text-zinc-500 uppercase"
                >
                  {item.subtitle}
                </motion.p>
              </div>
            </div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block pt-2 border-t border-zinc-900/50">
              Expand Details →
            </span>
          </motion.div>
        ))}
      </div>
    </>
  );
}