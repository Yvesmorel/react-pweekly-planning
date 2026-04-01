import { useEffect, useState, useRef } from "react";

interface UseIntersectionObserverProps extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: UseIntersectionObserverProps = {}
): { entry: IntersectionObserverEntry | undefined; height: number } {

  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [height, setHeight] = useState<number>(60);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);

    if (entry.boundingClientRect) {
      if (entry.boundingClientRect.height > 0) {
        setHeight(entry.boundingClientRect.height);
      }
    }
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen]);

  return { entry, height };
}
