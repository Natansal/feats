import { useCallback, useEffect, useMemo, useRef } from "react";

/**
 * Represents a timeout controller with manual control.
 * - `set` schedules a new timeout (clearing any existing one).
 * - `clear` cancels the current timeout if set.
 * - `dispatch` triggers the timeout callback immediately and clears it.
 */
export interface Timeout {
   /**
    * Sets a new timeout with the given handler and time (in ms).
    * Automatically clears any previously set timeout before setting the new one.
    */
   set: (handler: VoidFunction, time: number) => void;

   /**
    * Clears the currently scheduled timeout, if any.
    */
   clear: VoidFunction;

   /**
    * Immediately invokes the stored timeout callback and clears the timeout.
    * Does nothing if no timeout is set.
    */
   dispatch: VoidFunction;
}

interface TimeoutRef {
   id: ReturnType<typeof setTimeout>;
   method: VoidFunction;
}

/**
 * React hook for managing a single timeout with manual control.
 * Automatically clears the timeout on component unmount.
 */
export function useTimeout(): Timeout {
   const timeoutRef = useRef<TimeoutRef | null>(null);

   useEffect(() => {
      return clear;
   }, []);

   const handle = useCallback(() => {
      timeoutRef.current?.method();
      timeoutRef.current = null;
   }, []);

   const clear = useCallback(() => {
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current.id);
         timeoutRef.current = null;
      }
   }, []);

   const set = useCallback<Timeout["set"]>(
      (handler, time) => {
         clear();
         const id = setTimeout(handle, time);
         timeoutRef.current = {
            id,
            method: handler,
         };
      },
      [clear, handle],
   );

   const dispatch = useCallback(() => {
      const method = timeoutRef.current?.method;
      clear();
      method?.();
   }, [clear]);

   return useMemo(() => ({ set, clear, dispatch }), [set, clear, dispatch]);
}
