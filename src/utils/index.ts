import "./filter-and-map";
import "./partition";

declare global {
   interface Array<T> {
      /**
       * Calls a callback on each element, returns an array of results filtering out `undefined` values.
       * @param handler A function called for each element, returning a value or `undefined`.
       * @returns An array containing all defined results from the callback.
       */
      filterAndMap<U>(handler: (value: T, index: number, array: T[]) => U | undefined): Exclude<U, undefined>[];

      /**
       * Splits the array into two arrays: elements where the callback returns `true`, and those where it returns `false`.
       * @param handler A predicate function called on each element.
       * @returns A tuple with two arrays: `[elementsWhereTrue, elementsWhereFalse]`.
       */
      partition(handler: (value: T, index: number, array: T[]) => boolean): [T[], T[]];
   }
}

export {};
