/**
 * Options for customizing the behavior of the `Switcher` class. ⚙️
 *
 * @property equalityCheck - A custom function to compare values. By default, it uses a strict equality check (`===`).
 */
export type SwitcherOptions<T> = {
   equalityCheck: (v1: T, v2: T) => boolean;
};

/**
 * The underlying class for the `switcher` factory function. 🛠️
 * It provides a powerful, type-safe, and fluent API for handling conditional logic, acting as a robust alternative to traditional switch statements.
 *
 * It's recommended to use the `switcher()` factory function to create new instances.
 */
export class Switcher<TValue, TRet> {
   private readonly value: TValue;
   private readonly equalityCheck: SwitcherOptions<TValue>["equalityCheck"];
   private returnedValue: TRet | undefined = undefined;

   /**
    * Constructs a new `Switcher` instance.
    * * You should typically use the `switcher()` factory function instead of calling this constructor directly.
    *
    * @param value The value to be matched against.
    * @param options Optional configuration for the switcher, like a custom `equalityCheck`.
    */
   constructor(value: TValue, options: Partial<SwitcherOptions<TValue>> = {}) {
      const { equalityCheck } = options;
      this.value = value;
      this.equalityCheck = equalityCheck ?? ((v1, v2) => v1 === v2);
   }

   /**
    * Checks if the switcher's value matches a given condition or an array of conditions. ✅
    * If a match is found, it "locks in" the `then` value, and subsequent `.case()` calls are ignored.
    *
    * @param conditions The condition(s) to match against.
    * @param then The value to return if a condition matches.
    * @returns A new `Switcher` instance with a refined type, removing the matched value from the possible types.
    *
    * @example
    * ```ts
    * const pet = "cat";
    * const animalType = switcher(pet)
    * .case(["cat", "dog"], "Mammal")
    * .case(["snake", "lizard"], "Reptile")
    * .done();
    * // animalType is now "Mammal"
    * ```
    */
   case<V extends TValue>(conditions: V[], then: TRet): Switcher<Exclude<TValue, V>, TRet>;
   case<V extends TValue>(condition: V, then: TRet): Switcher<Exclude<TValue, V>, TRet>;
   case<V extends TValue>(condition: V | V[], then: TRet) {
      if (this.returnedValue === undefined) {
         const conditions = Array.isArray(condition) ? condition : [condition];
         for (const cond of conditions) {
            if (this.equalityCheck(this.value, cond)) {
               this.returnedValue = then;
               break;
            }
         }
      }

      return this as Switcher<Exclude<TValue, V>, TRet>;
   }

   /**
    * Finalizes the switcher and returns the result. 🎉
    *
    * If a `.case()` matched, it returns the corresponding value.
    * If no `.case()` matched and no `.default()` was called, it returns `undefined`.
    *
    * @returns The matched value or `undefined`. The return type is inferred by the TypeScript compiler.
    *
    * @example
    * ```ts
    * const status = "error";
    * const message = switcher(status)
    * .case("success", "Operation successful")
    * .case("pending", "Operation is pending")
    * .done();
    *
    * // message is now undefined
    * ```
    */
   done() {
      return this.returnedValue as [TValue] extends [never] ? TRet : TRet | undefined;
   }

   /**
    * Specifies a default value to be returned if no `.case()` condition matches. 🎁
    * This method should be called at the end of your `Switcher` chain.
    *
    * @param value The default value to return.
    * @returns The value from the first matching `.case()` or the provided `default` value.
    *
    * @example
    * ```ts
    * const role = "guest";
    * const accessLevel = switcher(role)
    * .case("admin", "full")
    * .case("user", "limited")
    * .default("read-only");
    *
    * // accessLevel is now "read-only"
    * ```
    */
   default(value: TRet) {
      this.returnedValue ??= value;
      return this.returnedValue;
   }
}

type ClassConstructorArgs<T> = T extends new (...args: infer A) => any ? A : never;

/**
 * A powerful factory function that creates a type-safe `Switcher` instance. 🚀
 * This is the recommended way to start a new switcher chain, providing a fluent, readable replacement for traditional `switch` statements.
 *
 * @param args The arguments to pass to the `Switcher` constructor.
 * @returns A new `Switcher` instance.
 *
 * @example
 * // Basic usage with strings
 * ```ts
 * const day = "Monday";
 * const greeting = switcher(day)
 * .case("Monday", "Hello, Monday!")
 * .case("Tuesday", "Happy Tuesday!")
 * .default("Have a great day!");
 *
 * // greeting will be "Hello, Monday!"
 * ```
 *
 * @example
 * // Using a custom equality check for objects
 * ```ts
 * const user = { id: 1, name: "Alice" };
 * const allUsers = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
 *
 * const selectedUser = switcher(user, { equalityCheck: (v1, v2) => v1.id === v2.id })
 * .case(allUsers[0], "It's Alice")
 * .case(allUsers[1], "It's Bob")
 * .done();
 *
 * // selectedUser will be "It's Alice"
 * ```
 */
export function switcher<TValue, TRet>(...args: ClassConstructorArgs<typeof Switcher<TValue, TRet>>) {
   return new Switcher<TValue, TRet>(...args);
}
