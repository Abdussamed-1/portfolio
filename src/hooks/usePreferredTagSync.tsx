"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk/config";

const STORAGE_KEY = "weekly:preferred-tags";

function mergeTags(a: string[], b: string[]): string[] {
  return Array.from(new Set([...a, ...b].map((t) => t.trim()).filter(Boolean)));
}

type BridgeProps = {
  selectedTags: string[];
  setSelectedTags: (tags: string[] | ((prev: string[]) => string[])) => void;
  hydrated: boolean;
};

/** Must render only inside ClerkProvider (when configured). */
function PreferredTagSyncBridge({ selectedTags, setSelectedTags, hydrated }: BridgeProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const remoteLoaded = useRef(false);
  const skipNextPush = useRef(false);

  useEffect(() => {
    if (!hydrated || !isLoaded || !isSignedIn || remoteLoaded.current) return;
    let cancelled = false;

    fetch("/api/community/tags", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const remote = Array.isArray(data.tags) ? (data.tags as string[]) : [];
        remoteLoaded.current = true;
        skipNextPush.current = true;
        setSelectedTags((prev) => {
          const merged = mergeTags(prev, remote);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          } catch {
            // ignore
          }
          return merged;
        });
      })
      .catch(() => {
        remoteLoaded.current = true;
      });

    return () => {
      cancelled = true;
    };
  }, [hydrated, isLoaded, isSignedIn, setSelectedTags]);

  useEffect(() => {
    if (!hydrated || !isLoaded || !isSignedIn) return;
    if (skipNextPush.current) {
      skipNextPush.current = false;
      return;
    }

    const timer = setTimeout(() => {
      fetch("/api/community/tags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: selectedTags }),
      }).catch(() => {});
    }, 600);

    return () => clearTimeout(timer);
  }, [selectedTags, hydrated, isLoaded, isSignedIn]);

  return null;
}

/** Syncs preferred tags to /api/community/tags when the user is signed in. */
export function PreferredTagSync(props: BridgeProps) {
  if (!isClerkConfigured()) return null;
  return <PreferredTagSyncBridge {...props} />;
}
