import { signal, effect } from "@preact/signals-react";

function useIsMobile(): boolean {
  const isMobile = signal(false);

  effect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i,
      ),
    );
    isMobile.value = mobile;
  });

  return isMobile.value;
}

export default useIsMobile;
