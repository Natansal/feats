import { useCallback, useEffect, useMemo, useRef } from "react";

/**
 * Represents an interval controller with manual control.
 * - `set` starts a new interval (clearing any existing one).
 * - `clear` stops the current interval.
 */
export interface Interval {
   /**
    * Starts a new interval with the given handler and delay (in ms).
    * Automatically clears any previously set interval.
    */
   set: (handler: VoidFunction, interval: number) => void;

   /**
    * Clears the currently active interval, if any.
    */
   clear: VoidFunction;
}

interface IntervalRef {
   id: ReturnType<typeof setInterval>;
   method: VoidFunction;
}

/**
 * React hook for managing an interval with manual control.
 * Automatically clears the interval on component unmount.
 */
export function useInterval(): Interval {
   const intervalRef = useRef<IntervalRef | null>(null);

   useEffect(() => clear, []);

   const clear = useCallback(() => {
      if (intervalRef.current) {
         clearInterval(intervalRef.current.id);
         intervalRef.current = null;
      }
   }, []);

   const set = useCallback<Interval["set"]>(
      (handler, interval) => {
         clear();
         const id = setInterval(() => {
            intervalRef.current?.method();
         }, interval);
         intervalRef.current = {
            id,
            method: handler,
         };
      },
      [clear],
   );

   return useMemo(() => ({ set, clear }), [set, clear]);
}
