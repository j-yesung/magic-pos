import { MutableRefObject, useEffect, useState } from 'react';

interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseObserverParams {
  target: MutableRefObject<HTMLElement | null>;
  option: ObserverOptions;
}

export const useObserver = ({ target, option }: UseObserverParams) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentTarget = target.current;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(entry.isIntersecting);
        } else {
          setIsVisible(entry.isIntersecting);
        }
      });
    }, option);

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [option, target]);

  return { isVisible };
};
