import { useState } from "react";
import LoadingScanner from "./LoadingScanner";
import ResultCard from "./ResultCard";

export default function ClaimForm() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const runFactCheck = async () => {
    if (!claim.trim()) {
      setError("Enter a claim");
      return;
    }
    setError("");
    setStatus("loading");
    setResult(null);

    try {
      const resp = await fetch("http://localhost:8000/fact-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.detail || "Unable to fact check");
      }

      setResult(data);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      runFactCheck();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="glass-card border neon/30 p-6 md:p-10">
        <h1 className="text-4xl font-bold text-cyan-200 mb-3">Check</h1>
        <p className="text-slate-300">Paste a controversial claim and get a TEE-backed verification output with transaction proof.</p>

        <textarea
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter claim here"
          className="w-full mt-5 p-4 rounded-xl border border-cyan-300/20 bg-slate-900/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent min-h-[160px]"
        />

        <button
          onClick={runFactCheck}
          className="mt-4 w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
        >
          Verify Claim
        </button>

        {error && <p className="mt-3 text-red-400">{error}</p>}
      </div>

      {status === "loading" && <LoadingScanner />}
      {status === "done" && result && <ResultCard result={result} />}
      {status === "error" && !result && <p className="mt-4 text-pink-300">Unable to complete. Try again.</p>}
    </div>
  );
}
