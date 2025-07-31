import "./array-utils";

import "./object-utils";
import type { ToStringKey } from "./types";
export * from "./types";
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

      /**
       * Groups elements by the key returned by the given function.
       * @param keyFn A function that returns a group key for each element.
       * @returns An object where each key is a group and its value is an array of grouped items.
       */
      groupBy<K extends PropertyKey>(keyFn: (item: T) => K): Record<K, T[]>;

      /**
       * Removes duplicate entries (using strict equality).
       * @returns A new array with unique elements.
       */
      unique(): T[];

      /**
       * Removes duplicate entries using a custom key function.
       * @param keyFn A function that returns the deduplication key.
       * @returns A new array with unique elements.
       */
      uniqBy<K>(keyFn: (item: T) => K): T[];

      /**
       * Breaks the array into chunks of the given size.
       * @param size Number of elements per chunk.
       * @returns An array of chunks (arrays).
       */
      chunk(size: number): T[][];

      /**
       * Returns elements common to both arrays.
       * @param other The other array to compare against.
       * @returns An array of shared elements.
       */
      intersect(other: T[]): T[];

      /**
       * Returns elements from the current array not present in the other.
       * @param other The other array to compare against.
       * @returns An array of differing elements.
       */
      difference(other: T[]): T[];

      /**
       * Combines elements from both arrays, removing duplicates.
       * @param other The other array to combine with.
       * @returns A new array with all unique values from both arrays.
       */
      union(other: T[]): T[];

      /**
       * Extracts the specified property from each element in the array.
       * @param key The property name to pluck from each element.
       * @returns An array of property values.
       */
      pluck<K extends keyof T>(key: K): T[K][];
   }

   interface ObjectConstructor {
      /**
       * Logically the same as `Object.keys` - but type safe
       * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
       * @returns An array containing the names of the enumerable string properties and methods of an object.
       */
      typedKeys<T extends object>(object: T): ToStringKey<keyof T>[];

      /**
       * Creates a shallow copy of an object with only the specified keys.
       * @param obj The source object.
       * @param keys An array of keys to include in the result.
       */
      pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;

      /**
       * Creates a shallow copy of an object excluding the specified keys.
       * @param obj The source object.
       * @param keys An array of keys to omit from the result.
       */
      omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
   }
}
