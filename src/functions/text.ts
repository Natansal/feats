/**
 * The underlying class for the `text()` factory function. 🧱
 * It provides a fluent API for building strings step-by-step.
 *
 * It's recommended to use the `text()` factory function to create new instances.
 */
export class TextBuilder {
   private text: string = "";

   /**
    * Returns the final built string. 🚀
    * This is the recommended way to get the result.
    *
    * @returns The final string.
    *
    * @example
    * ```ts
    * const builder = text();
    * const result = builder.add("Done building!").done();
    * // result will be "Done building!"
    * ```
    */
   done() {
      return this.text;
   }

   /**
    * An alias for the `done()` method. 📝
    * It returns the current state of the built string.
    *
    * @returns The final string.
    *
    * @example
    * ```ts
    * const builder = text().add("Here's the string.").toString();
    * // result will be "Here's the string."
    * ```
    */
   toString() {
      return this.text;
   }

   /**
    * Adds one or more new lines to the string. ✍️
    *
    * @param count The number of new lines to add. Defaults to 1.
    * @returns The `TextBuilder` instance for chaining.
    *
    * @example
    * ```ts
    * const myString = text().add("First line.").newLine(2).add("Third line.").done();
    * // myString will be "First line.\n\nThird line."
    * ```
    */
   newLine(count = 1) {
      this.text += "\n".repeat(count);
      return this;
   }

   /**
    * Adds a string to the builder. ➕
    *
    * @param text The string to add.
    * @returns The `TextBuilder` instance for chaining.
    *
    * @example
    * ```ts
    * const myString = text().add("Hello").add("World").done();
    * // myString will be "HelloWorld"
    * ```
    */
   add(text: string) {
      this.text += text;
      return this;
   }

   /**
    * Adds a single space to the string. ➡️
    *
    * @returns The `TextBuilder` instance for chaining.
    *
    * @example
    * ```ts
    * const myString = text().add("Hello").space().add("World").done();
    * // myString will be "Hello World"
    * ```
    */
   space() {
      this.text += " ";
      return this;
   }

   /**
    * Adds a string followed by a new line. ➡️✍️
    * This is a convenient shortcut for `add(text).newLine()`.
    *
    * @param text The string to add before the new line.
    * @returns The `TextBuilder` instance for chaining.
    *
    * @example
    * ```ts
    * const myString = text().line("Line 1").line("Line 2").done();
    * // myString will be "Line 1\nLine 2\n"
    * ```
    */
   line(text: string) {
      this.text += text;
      return this.newLine();
   }

   /**
    * Conditionally adds a string or executes a function. 🚦
    * This method has two overloads for flexibility: one with an object parameter and one with positional arguments.
    *
    * @param params An object containing the `condition`, `then` value, and an optional `else` value.
    * @param condition The boolean condition to check.
    * @param then The string or function to execute if the condition is `true`.
    * @param otherwise An optional string or function to execute if the condition is `false`.
    * @returns The `TextBuilder` instance for chaining.
    *
    * @example
    * // Using the object syntax
    * ```ts
    * const userIsAdmin = true;
    * const myString = text()
    * .if({
    * condition: userIsAdmin,
    * then: (b) => b.add("Admin Panel").newLine(),
    * else: "Guest Access"
    * })
    * .done();
    * // myString will be "Admin Panel\n"
    * ```
    *
    * @example
    * // Using the positional argument syntax
    * ```ts
    * const isLoggedIn = false;
    * const myString = text()
    * .if(
    * isLoggedIn,
    * "Welcome back!",
    * (b) => b.add("Please log in.")
    * )
    * .done();
    * // myString will be "Please log in."
    * ```
    */
   if(
      condition:
         | boolean
         | {
              condition: boolean;
              then: string | ((builder: TextBuilder) => void);
              else?: string | ((builder: TextBuilder) => void);
           },
      then?: string | ((builder: TextBuilder) => void),
      otherwise?: string | ((builder: TextBuilder) => void),
   ): TextBuilder {
      let cond: boolean;
      let onThen: string | ((builder: TextBuilder) => void);
      let onElse: string | ((builder: TextBuilder) => void) | undefined;

      if (typeof condition === "object") {
         cond = condition.condition;
         onThen = condition.then;
         onElse = condition.else;
      } else {
         cond = condition;
         onThen = then!;
         onElse = otherwise;
      }

      if (cond) {
         typeof onThen === "function" ? onThen(this) : this.add(onThen);
      } else if (onElse !== undefined) {
         typeof onElse === "function" ? onElse(this) : this.add(onElse);
      }

      return this;
   }

   /**
    * Trims whitespace from the beginning and end of each line in the string. ✂️
    *
    * @returns The `TextBuilder` instance for chaining.
    *
    * @example
    * ```ts
    * const myString = text().add("   Hello   ").newLine().add(" World ").trimLines().done();
    * // The final string will be "Hello\nWorld"
    * ```
    */
   trimLines() {
      this.text = this.text
         .split("\n")
         .map((line) => line.trim())
         .join("\n");
      return this;
   }

   /**
    * Gets an array of the current string's lines. 📚
    *
    * @returns An array of strings, where each element is a line.
    *
    * @example
    * ```ts
    * const builder = text().line("First").line("Second");
    * const myLines = builder.lines;
    * // myLines is ["First", "Second", ""]
    * ```
    */
   get lines() {
      return this.text.split("\n");
   }

   /**
    * Checks if the built string is empty or contains only whitespace. 🕵️
    *
    * @returns `true` if the trimmed string is empty, otherwise `false`.
    *
    * @example
    * ```ts
    * const builder1 = text();
    * console.log(builder1.isEmpty); // true
    *
    * const builder2 = text().add("Hello");
    * console.log(builder2.isEmpty); // false
    * ```
    */
   get isEmpty() {
      return this.text.trim() === "";
   }

   /**
    * Gets the total length of the built string. 📏
    *
    * @returns The number of characters in the string.
    *
    * @example
    * ```ts
    * const builder = text().add("test");
    * console.log(builder.length); // 4
    * ```
    */
   get length() {
      return this.text.length;
   }
}

/**
 * A factory function to create a new `TextBuilder` instance. 🏭
 * This is the preferred way to start building a new string, providing a clean, fluent API.
 *
 * @returns A new `TextBuilder` instance.
 *
 * @example
 * // A basic example of building a string
 * ```ts
 * const myString = text()
 * .add("Hello")
 * .space()
 * .add("World!")
 * .newLine()
 * .add("This is a new line.")
 * .done();
 *
 * // myString is now "Hello World!\nThis is a new line."
 * ```
 *
 * @example
 * // Using conditional logic
 * ```ts
 * const user = { name: "Alice", isAdmin: true };
 *
 * const welcomeMessage = text()
 * .add(`Welcome, ${user.name}!`)
 * .if(user.isAdmin, (builder) => {
 * builder.newLine().add("You have admin access.");
 * })
 * .done();
 *
 * // welcomeMessage is now "Welcome, Alice!\nYou have admin access."
 * ```
 */
export function text() {
   return new TextBuilder();
}
