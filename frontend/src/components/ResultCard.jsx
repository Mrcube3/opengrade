import { motion } from "framer-motion";
import { txHashExplorerUrl } from "../utils/blockExplorer";

export default function ResultCard({ result }) {
  const transaction_url = txHashExplorerUrl(result.transaction_hash);

  return (
    <motion.div
      className="mt-8 p-6 glass-card border neon/40"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center gap-3">
        <div className="flex flex-col">
          <span className="text-sm text-cyan-300 uppercase tracking-widest">Verification Result</span>
          <h3 className="text-xl font-semibold text-white">TEE Secured Fact Check</h3>
        </div>
        <div className="px-3 py-1 rounded-full border border-cyan-400/70 bg-cyan-500/10 text-cyan-100 text-xs">TEE Secured</div>
      </div>

      <div className="mt-4 text-slate-200 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-7">
          <span className="text-9xl font-extrabold text-cyan-500/25 select-none">VERIFIED</span>
        </div>
        <div className="relative p-4 bg-slate-900/50 rounded-xl border border-cyan-400/25">
          <p className="whitespace-pre-wrap overflow-auto text-sm text-slate-100">{result.analysis}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-2">
        <a
          href={transaction_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500/30 text-cyan-100 px-4 py-2 hover:bg-cyan-400/35 transition"
        >
          View Tx {result.transaction_hash ? `${result.transaction_hash.slice(0, 10)}...` : "unknown"}
        </a>

        <div className="rounded-lg border border-cyan-300/25 bg-slate-950/40 p-3">
          <p className="text-xs text-cyan-200">TEE status:</p>
          <p className="font-semibold text-white">{result.tee_status || "unknown"}</p>
        </div>
      </div>
    </motion.div>
  );
}
