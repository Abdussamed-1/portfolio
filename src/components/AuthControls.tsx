"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { Button, Row } from "@once-ui-system/core";
import { isClerkConfigured } from "@/lib/clerk/config";

type AuthControlsProps = {
  locale?: "en" | "tr";
};

function AuthControlsClerk({ locale }: { locale: "en" | "tr" }) {
  const { isSignedIn, isLoaded } = useAuth();
  const signInLabel = locale === "tr" ? "Giriş" : "Sign in";

  if (!isLoaded) {
    return (
      <Button size="s" variant="tertiary" disabled>
        …
      </Button>
    );
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <Button size="s" variant="secondary">
          {signInLabel}
        </Button>
      </SignInButton>
    );
  }

  return <UserButton />;
}

export function AuthControls({ locale = "en" }: AuthControlsProps) {
  const signInLabel = locale === "tr" ? "Giriş" : "Sign in";
  const soonLabel = locale === "tr" ? "Giriş yakında" : "Sign in soon";

  if (!isClerkConfigured()) {
    return (
      <Button size="s" variant="tertiary" disabled title={soonLabel}>
        {signInLabel}
      </Button>
    );
  }

  return (
    <Row vertical="center" gap="4">
      <AuthControlsClerk locale={locale} />
    </Row>
  );
}
