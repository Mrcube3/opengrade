import { motion } from "framer-motion";

export default function LoadingScanner() {
  return (
    <div className="mt-6 px-6 py-4 rounded-xl glass-card border neon/50">
      <div className="relative h-12 overflow-hidden rounded-lg bg-slate-900/70">
        <motion.div
          className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.35, repeat: Infinity }}
        />
      </div>
      <p className="mt-3 text-sm text-cyan-200">Scanning claim integrity... TEE verification in progress.</p>
    </div>
  );
}
