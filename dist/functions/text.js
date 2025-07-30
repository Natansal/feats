"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBuilder = void 0;
exports.text = text;
class TextBuilder {
    constructor() {
        this.text = "";
    }
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
    add(text) {
        this.text += text;
        return this;
    }
    space() {
        this.text += " ";
        return this;
    }
    line(text) {
        this.text += text;
        return this.newLine();
    }
    if(condition, then, otherwise) {
        let cond;
        let onThen;
        let onElse;
        if (typeof condition === "object") {
            cond = condition.condition;
            onThen = condition.then;
            onElse = condition.else;
        }
        else {
            cond = condition;
            onThen = then;
            onElse = otherwise;
        }
        if (cond) {
            typeof onThen === "function" ? onThen(this) : this.add(onThen);
        }
        else if (onElse !== undefined) {
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
exports.TextBuilder = TextBuilder;
function text() {
    return new TextBuilder();
}
