import { useEffect, useRef, useState } from "react";

const useMinimumLoading = (isLoading: boolean, minimumMs = 500) => {
  const [showLoading, setShowLoading] = useState(isLoading);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      const timeoutId = window.setTimeout(() => {
        startedAt.current = Date.now();
        setShowLoading(true);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    if (!showLoading) {
      return;
    }

    const elapsed = startedAt.current ? Date.now() - startedAt.current : 0;
    const remaining = Math.max(0, minimumMs - elapsed);

    const timeoutId = window.setTimeout(() => {
      setShowLoading(false);
      startedAt.current = null;
    }, remaining);

    return () => window.clearTimeout(timeoutId);
  }, [isLoading, minimumMs, showLoading]);

  return showLoading;
};

export default useMinimumLoading;
