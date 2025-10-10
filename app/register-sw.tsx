// app/register-sw.tsx
"use client";
import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("✅ SW registered:", registration.scope);
        })
        .catch((err) => console.error("❌ SW failed:", err));
    }
  }, []);

  return null; // this component just runs the effect
}
