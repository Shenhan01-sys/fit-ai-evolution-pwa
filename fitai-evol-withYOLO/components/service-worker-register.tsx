"use client"

import { useEffect } from "react"

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("[v0] Service Worker registered:", registration)
        })
        .catch((error) => {
          console.warn("[v0] Service Worker registration failed:", error)
        })
    }
  }, [])

  return null
}
