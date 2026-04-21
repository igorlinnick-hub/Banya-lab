"use client";
import { useEffect } from "react";

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const STORAGE_KEY = "banya_utm";

export function UtmCapture() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const captured: Record<string, string> = {};
    for (const k of KEYS) {
      const v = url.searchParams.get(k);
      if (v) captured[k] = v;
    }
    if (Object.keys(captured).length > 0) {
      try {
        const existing = sessionStorage.getItem(STORAGE_KEY);
        const merged = {
          ...(existing ? JSON.parse(existing) : {}),
          ...captured,
          captured_at: new Date().toISOString(),
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {}
    }
  }, []);
  return null;
}

export function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
