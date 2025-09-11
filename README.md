import React from "react"; import { motion } from "framer-motion"; import { Mail } from "lucide-react";

// Usage: Drop this file into a React + Tailwind project (e.g. create-react-app + Tailwind). // Dependencies: framer-motion, lucide-react, tailwindcss. // Install: npm i framer-motion lucide-react

export default function ComingSoon() { return ( <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden relative text-white"> {/* animated soft-glow radial gradients */} <div className="absolute inset-0 pointer-events-none"> <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full opacity-30 blur-3xl bg-purple-500 animate-blob" /> <div className="absolute -right-40 -bottom-40 w-96 h-96 rounded-full opacity-30 blur-3xl bg-emerald-400 animate-blob animation-delay-2000" /> </div>

{/* subtle star field */}
  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
    <defs>
      <radialGradient id="g1" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* generate decorative dots */}
    {Array.from({ length: 40 }).map((_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const r = Math.random() * 1.6 + 0.2;
      const op = Math.random() * 0.7 + 0.1;
      return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill={`url(#g1)`} opacity={op} />;
    })}
  </svg>

  <div className="relative z-10 max-w-3xl w-full px-6 py-12 text-center">
    <motion.h1
      initial={{ opacity: 0, y: -20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 leading-none"
    >
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-indigo-400 to-cyan-300 drop-shadow-[0_8px_40px_rgba(99,102,241,0.12)] neon-glow">
        Coming
      </span>
      <span className="block text-4xl md:text-6xl font-semibold mt-2">soon</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
    >
      We're putting the finishing touches on something awesome. Sign up and we'll let you know when we launch.
    </motion.p>

    {/* animated progress dots */}
    <div className="flex items-center justify-center gap-3 mb-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.12 }}
          className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg"
        />
      ))}
    </div>

    {/* subscription form */}
    <motion.form
      onSubmit={(e) => e.preventDefault()}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      className="mx-auto max-w-lg w-full flex flex-col sm:flex-row gap-3"
    >
      <div className="flex-1 relative">
        <input
          aria-label="Email address"
          type="email"
          required
          placeholder="Enter your email"
          className="w-full rounded-lg py-3 px-4 bg-white/6 backdrop-blur-sm placeholder:text-gray-300 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-400 transition"
        />
        <div className="absolute right-3 top-3 text-white/70 hidden sm:block">
          <Mail size={18} />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 bg-gradient-to-r from-indigo-500 to-emerald-400 font-semibold shadow-2xl hover:scale-[1.02] active:scale-95 transition"
      >
        Notify me
      </button>
    </motion.form>

    {/* countdown chips (purely decorative) */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="mt-10 flex items-center justify-center gap-4"
    >
      {[
        ["12", "Days"],
        ["08", "Hours"],
        ["32", "Minutes"],
        ["45", "Seconds"],
      ].map(([num, label], idx) => (
        <div key={idx} className="text-center">
          <div className="px-4 py-3 rounded-xl bg-white/6 ring-1 ring-white/8 backdrop-blur-sm font-mono text-2xl md:text-3xl font-semibold">{num}</div>
          <div className="mt-2 text-xs text-gray-400 uppercase">{label}</div>
        </div>
      ))}
    </motion.div>
  </div>

  {/* footer-ish subtle message */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.8 }}
    transition={{ delay: 1.6 }}
    className="absolute bottom-6 w-full text-center text-xs text-gray-500"
  >
    Built with care — launch date coming soon.
  </motion.div>

  {/* small animated sparkles using absolutely positioned elements */}
  <div className="absolute inset-0 pointer-events-none">
    {Array.from({ length: 12 }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const dur = 4 + Math.random() * 6;
      const size = Math.random() * 6 + 2;
      return (
        <motion.div
          key={i}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6], rotate: [0, 45, 0] }}
          transition={{ repeat: Infinity, duration: dur, delay: i * 0.3 }}
          style={{ left: `${left}%`, top: `${top}%` }}
          className="absolute bg-white/90 rounded-full"
          aria-hidden
        />
      );
    })}
  </div>

  {/* extra style tag so this component is drop-in without additional CSS files */}
  <style jsx>{`
    .neon-glow {
      text-shadow: 0 6px 30px rgba(99,102,241,0.18), 0 2px 8px rgba(99,102,241,0.15);
    }

    /* blob animation */
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -20px) scale(1.05);
      }
      66% {
        transform: translate(-20px, 30px) scale(0.95);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }

    .animate-blob {
      animation: blob 9s infinite;
    }

    .animation-delay-2000 {
      animation-delay: 2s;
    }

    /* subtle backdrop blur for supporting browsers */
    input::-webkit-input-placeholder {
      color: rgba(229,231,235,0.6);
    }

    /* sparkles size */
    .absolute > div[aria-hidden] {
      width: 6px;
      height: 6px;
      filter: blur(0.6px);
    }

    /* responsive tweaks */
    @media (max-width: 640px) {
      .neon-glow {
        text-shadow: 0 6px 24px rgba(99,102,241,0.14);
      }
    }
  `}</style>
</div>

); }

