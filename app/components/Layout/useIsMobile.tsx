"use client";

import { signal, effect } from "@preact/signals-react";

function useIsMobile(): boolean {
  const isMobile = signal(false);

  effect(() => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i,
        ),
      );
      isMobile.value = mobile;
    }
  });

  return isMobile.value;
}

export default useIsMobile;
