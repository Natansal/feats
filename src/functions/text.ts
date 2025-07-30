export class TextBuilder {
   private text: string = "";

   done() {
      return this.text;
   }

   toString() {
      return this.text;
   }

   newLine(count = 1) {
      this.text += "\n".repeat(count);
      return this;
   }

   add(text: string) {
      this.text += text;
      return this;
   }

   space() {
      this.text += " ";
      return this;
   }

   line(text: string) {
      this.text += text;
      return this.newLine();
   }

   if(params: {
      condition: boolean;
      then: string | ((builder: TextBuilder) => void);
      else?: string | ((builder: TextBuilder) => void);
   }): TextBuilder;
   if(
      condition: boolean,
      then: string | ((builder: TextBuilder) => void),
      otherwise?: string | ((builder: TextBuilder) => void),
   ): TextBuilder;
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

   trimLines() {
      this.text = this.text
         .split("\n")
         .map((line) => line.trim())
         .join("\n");
      return this;
   }

   get lines() {
      return this.text.split("\n");
   }

   get isEmpty() {
      return this.text.trim() === "";
   }

   get length() {
      return this.text.length;
   }
}

export function text() {
   return new TextBuilder();
}
