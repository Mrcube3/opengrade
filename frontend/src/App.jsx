import { useEffect, useRef } from "react";
import ClaimForm from "./components/ClaimForm";

export default function App() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        // Updated to a black glow to match the new dynamic colorful background
        glowRef.current.style.background = `radial-gradient(350px circle at ${e.clientX}px ${e.clientY}px, rgba(0, 0, 0, 0.35), transparent 80%)`;
      }
      
      const offsetX = (e.clientX - window.innerWidth / 2) * -0.05;
      const offsetY = (e.clientY - window.innerHeight / 2) * -0.05;
      document.body.style.setProperty('--dot-x', `${offsetX}px`);
      document.body.style.setProperty('--dot-y', `${offsetY}px`);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen py-8 sm:py-12 relative z-0">
      {/* Interactive Mouse Glow */}
      <div 
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-[-1]"
      />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <ClaimForm />
      </div>
    </div>
  );
}
