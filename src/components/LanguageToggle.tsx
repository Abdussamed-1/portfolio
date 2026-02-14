"use client";

import { ToggleButton, HoverCard, Tooltip } from "@once-ui-system/core";
import { useLocale, useSetLocale } from "@/contexts/LocaleContext";
import styles from "./LanguageToggle.module.scss";

export const LanguageToggle = () => {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const isEn = locale === "en";

  const button = (
    <ToggleButton
      className={styles.roundButton}
      label={isEn ? "EN" : "TR"}
      size="s"
      variant="ghost"
      selected
      onClick={() => setLocale(isEn ? "tr" : "en")}
      aria-label={isEn ? "English – Switch to Turkish" : "Turkish – Switch to English"}
    />
  );

  return (
    <HoverCard
      trigger={button}
      placement="bottom"
      fade={0}
      scale={0.9}
      duration={200}
      offsetDistance="4"
    >
      <Tooltip label={isEn ? "Switch to TR" : "Switch to EN"} />
    </HoverCard>
  );
};
