"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk/config";

export function ClerkProviderGate({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured()) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/weekly"
      signUpFallbackRedirectUrl="/weekly"
      afterSignOutUrl="/weekly"
    >
      {children}
    </ClerkProvider>
  );
}
