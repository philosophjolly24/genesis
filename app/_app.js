// _app.tsx
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration.scope);
        })
        .catch((err) => console.error("SW registration failed:", err));
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
