/**
 * Represents all valid input units for durations.
 * Includes both short and long forms (e.g. "s", "second", "seconds").
 */
export type DurationInputUnit =
   | "ms"
   | "millisecond"
   | "milliseconds"
   | "s"
   | "second"
   | "seconds"
   | "m"
   | "minute"
   | "minutes"
   | "h"
   | "hour"
   | "hours"
   | "d"
   | "day"
   | "days";

type NormalizedUnit = "milliseconds" | "seconds" | "minutes" | "hours" | "days";

/**
 * Maps normalized units to their equivalent in milliseconds.
 */
const unitToMs: Record<NormalizedUnit, number> = {
   milliseconds: 1,
   seconds: 1_000,
   minutes: 60_000,
   hours: 3_600_000,
   days: 86_400_000,
};

/**
 * Maps various input unit aliases to a normalized internal unit.
 */
const aliasMap: Record<DurationInputUnit, NormalizedUnit> = {
   ms: "milliseconds",
   millisecond: "milliseconds",
   milliseconds: "milliseconds",
   s: "seconds",
   second: "seconds",
   seconds: "seconds",
   m: "minutes",
   minute: "minutes",
   minutes: "minutes",
   h: "hours",
   hour: "hours",
   hours: "hours",
   d: "days",
   day: "days",
   days: "days",
};

/**
 * Creates an immutable duration object with fluent utilities.
 *
 * Example:
 * ```ts
 * const d = duration(2, "minutes");
 * d.as("seconds"); // 120
 * d.add(30, "seconds").milliseconds; // 150000
 * ```
 *
 * @param value - The numeric value of the duration
 * @param unit - The unit of the value (e.g. "minutes", "s", etc.)
 * @returns A duration instance with utility methods and accessors
 */
export function duration(value: number, unit: DurationInputUnit) {
   const ms = value * unitToMs[aliasMap[unit]];

   const methods = {
      /**
       * Converts the current duration to another unit.
       * @param targetUnit - The unit to convert to
       * @returns The converted value
       */
      as: (targetUnit: DurationInputUnit): number => {
         const target = aliasMap[targetUnit];
         return ms / unitToMs[target];
      },

      /**
       * Adds another duration and returns a new immutable duration.
       * @param addValue - The value to add
       * @param addUnit - The unit of the value to add
       */
      add: (addValue: number, addUnit: DurationInputUnit) => {
         return duration(ms + duration(addValue, addUnit).milliseconds, "milliseconds");
      },

      /**
       * Subtracts another duration and returns a new immutable duration.
       * @param subValue - The value to subtract
       * @param subUnit - The unit of the value to subtract
       */
      subtract: (subValue: number, subUnit: DurationInputUnit) => {
         return duration(ms - duration(subValue, subUnit).milliseconds, "milliseconds");
      },

      /**
       * Returns the internal value in milliseconds.
       */
      valueOf: () => ms,

      /**
       * Converts the duration to a string in milliseconds.
       * @returns A string like `"120000ms"`
       */
      toString: () => `${ms}ms`,

      /**
       * Returns a new duration instance with the same value.
       */
      clone: () => duration(ms, "milliseconds"),

      /**
       * Converts the duration to a primitive value (number or string).
       */
      [Symbol.toPrimitive]: (hint: string) => {
         if (hint === "string") return `${ms}ms`;
         return ms;
      },
   };

   type DurationInstance = typeof methods & {
      [K in DurationInputUnit]: number;
   };

   const proxy = new Proxy(
      {},
      {
         get(_: object, prop: string): any {
            if (prop in methods) return methods[prop as keyof typeof methods];

            if (prop in aliasMap) {
               const normalized = aliasMap[prop as DurationInputUnit];
               return ms / unitToMs[normalized];
            }

            throw new Error(`Invalid property access: ${prop}`);
         },
      },
   ) as DurationInstance;

   return proxy;
}

/**
 * Converts a duration to milliseconds.
 *
 * @param value - The numeric value of the duration
 * @param unit - The unit of the value (e.g. "seconds", "m", etc.)
 * @returns The equivalent duration in milliseconds
 */
export function millis(value: number, unit: DurationInputUnit) {
   return duration(value, unit).milliseconds;
}
