"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

/**
 * The dedicated offline page component for the Next.js App Router.
 * This page is served by the Service Worker when a navigation attempt fails due
 * to lack of network connectivity (matching the /_offline path in next.config.js fallbacks).
 */
export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Initial check and set up listeners
    const checkOnline = () => setIsOnline(navigator.onLine);
    checkOnline();

    window.addEventListener("online", checkOnline);
    window.addEventListener("offline", checkOnline);

    return () => {
      window.removeEventListener("online", checkOnline);
      window.removeEventListener("offline", checkOnline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8 text-center border-t-4 border-indigo-500">
        <div
          className="text-6xl mb-4"
          role="img"
          aria-label="Cloud and slash emoji"
        >
          ☁️ /
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          You are Currently Offline
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          It looks like you have lost your internet connection. The page you
          requested could not be loaded because it has not been cached yet.
        </p>

        <p className="text-sm font-medium text-gray-500 mb-6">
          {isOnline ? (
            <span className="text-green-600">
              You are back online! Try reloading the page.
            </span>
          ) : (
            <span className="text-red-600">Status: Offline</span>
          )}
        </p>

        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Go to Homepage (Cached)
        </Link>

        <div className="mt-8 text-sm text-gray-400">
          Tip: You can visit any pages you loaded previously while offline!
        </div>
      </div>
    </div>
  );
}
