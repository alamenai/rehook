import { useEffect, useRef, useState, useCallback } from 'react';

type IntervalFunction = () => void;

interface IntervalHookResult {
  isRunning: boolean;
  delay: number;
  startInterval: () => void;
  stopInterval: () => void;
  updateDelay: (newDelay: number) => void;
}

export const useInterval = (initialCallback: IntervalFunction, initialDelay: number): IntervalHookResult => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [delay, setDelay] = useState<number>(initialDelay);
  const savedCallback = useRef<IntervalFunction>(initialCallback);

  useEffect(() => {
    savedCallback.current = initialCallback;
  }, [initialCallback]);

  useEffect(() => {
    if (!isRunning) return undefined;

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay, isRunning]);

  const startInterval = useCallback((): void => {
    setIsRunning(true);
  }, []);

  const stopInterval = useCallback((): void => {
    setIsRunning(false);
  }, []);

  const updateDelay = useCallback((newDelay: number): void => {
    setDelay(newDelay);
  }, []);

  return {
    isRunning,
    delay,
    startInterval,
    stopInterval,
    updateDelay,
  };
};