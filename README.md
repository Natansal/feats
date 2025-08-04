# 🚀 Feats

> A lightweight TypeScript library offering a collection of versatile helper functions and React hooks—perfect for both React and non-React projects.

[![npm version](https://img.shields.io/npm/v/feats.svg)](https://www.npmjs.com/package/feats)
[![License](https://img.shields.io/npm/l/feats.svg)](https://github.com/your-username/feats/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- **🧱 Text Builder** - Fluent string building with conditional logic
- **🛠️ Type-Safe Switcher** - Powerful alternative to switch statements
- **⏱️ Duration Utilities** - Immutable duration objects with conversions
- **⚛️ React Hooks** - `useTimeout` and `useInterval` with manual control
- **🔧 Array & Object Utils** - Extended prototypes with useful methods
- **📦 Zero Dependencies** - Lightweight and tree-shakeable
- **🔒 TypeScript First** - Full type safety and IntelliSense support

## 📦 Installation

```bash
npm install feats
# or
yarn add feats
# or
pnpm add feats
```

## 🚀 Quick Start

```typescript
import { text, switcher, duration, useTimeout } from 'feats';

// Text building
const message = text()
  .add("Hello")
  .space()
  .add("World!")
  .if(user.isAdmin, (builder) => {
    builder.newLine().add("You have admin access.");
  })
  .done();

// Type-safe switching
const status = switcher(user.role)
  .case("admin", "full-access")
  .case("user", "limited-access")
  .default("read-only");

// Duration utilities
const timeout = duration(30, "seconds");
const inMs = timeout.milliseconds; // 30000
const inMinutes = timeout.as("minutes"); // 0.5
```

## 📚 Documentation

### 🧱 Text Builder

Build strings fluently with conditional logic and formatting:

```typescript
import { text } from 'feats';

// Basic usage
const greeting = text()
  .add("Hello")
  .space()
  .add("World!")
  .newLine()
  .add("Welcome to our app!")
  .done();

// Conditional text
const welcomeMessage = text()
  .add(`Welcome, ${user.name}!`)
  .if(user.isAdmin, (builder) => {
    builder.newLine().add("You have admin privileges.");
  })
  .if(user.isNew, "This is your first visit!")
  .done();

// Multi-line formatting
const formattedText = text()
  .line("First line")
  .line("Second line")
  .trimLines() // Removes leading/trailing whitespace from each line
  .done();
```

**Available Methods:**
- `add(text)` - Add text to the builder
- `space()` - Add a single space
- `newLine(count?)` - Add new lines (default: 1)
- `line(text)` - Add text followed by new line
- `if(condition, then, else?)` - Conditional text building
- `trimLines()` - Trim whitespace from each line
- `done()` / `toString()` - Get the final string

### 🛠️ Type-Safe Switcher

Replace switch statements with a fluent, type-safe API:

```typescript
import { switcher } from 'feats';

// Basic usage
const day = "Monday";
const greeting = switcher(day)
  .case("Monday", "Hello, Monday!")
  .case("Tuesday", "Happy Tuesday!")
  .case(["Saturday", "Sunday"], "Weekend vibes!")
  .default("Have a great day!");

// With custom equality check
const user = { id: 1, name: "Alice" };
const selectedUser = switcher(user, { 
  equalityCheck: (v1, v2) => v1.id === v2.id 
})
  .case({ id: 1, name: "Alice" }, "It's Alice")
  .case({ id: 2, name: "Bob" }, "It's Bob")
  .done();

// Type-safe with exhaustiveness checking
const status = switcher(user.status)
  .case("active", "User is active")
  .case("inactive", "User is inactive")
  .case("pending", "User is pending")
  .done(); // TypeScript will warn if not all cases are handled
```

### ⏱️ Duration Utilities

Work with time durations in a type-safe, immutable way:

```typescript
import { duration, millis } from 'feats';

// Create durations
const timeout = duration(30, "seconds");
const meeting = duration(1, "hour");
const vacation = duration(2, "weeks");

// Convert between units
timeout.milliseconds; // 30000
timeout.as("minutes"); // 0.5
timeout.as("hours"); // 0.008333...

// Arithmetic operations
const totalTime = duration(1, "hour")
  .add(30, "minutes")
  .add(15, "seconds");

const remaining = duration(2, "hours")
  .subtract(45, "minutes");

// Quick millisecond conversion
const ms = millis(5, "minutes"); // 300000
```

**Supported Units:**
- `ms`, `millisecond`, `milliseconds`
- `s`, `second`, `seconds`
- `m`, `minute`, `minutes`
- `h`, `hour`, `hours`
- `d`, `day`, `days`

### ⚛️ React Hooks

#### useTimeout

Manage timeouts with manual control:

```typescript
import { useTimeout } from 'feats/react';

function MyComponent() {
  const timeout = useTimeout();

  const handleClick = () => {
    // Set a timeout
    timeout.set(() => {
      console.log('Timeout fired!');
    }, 5000);

    // Clear it if needed
    // timeout.clear();

    // Or dispatch it immediately
    // timeout.dispatch();
  };

  return <button onClick={handleClick}>Start Timeout</button>;
}
```

#### useInterval

Manage intervals with manual control:

```typescript
import { useInterval } from 'feats/react';

function MyComponent() {
  const interval = useInterval();

  const startPolling = () => {
    interval.set(() => {
      fetchData();
    }, 1000);
  };

  const stopPolling = () => {
    interval.clear();
  };

  return (
    <div>
      <button onClick={startPolling}>Start Polling</button>
      <button onClick={stopPolling}>Stop Polling</button>
    </div>
  );
}
```

### 🔧 Array & Object Utilities

Extended prototypes for common array and object operations:

```typescript
// Array utilities (automatically available)
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "admin" }
];

// Filter and map in one operation
const adminNames = users.filterAndMap(user => 
  user.role === "admin" ? user.name : undefined
); // ["Alice", "Charlie"]

// Partition arrays
const [admins, regularUsers] = users.partition(user => user.role === "admin");

// Group by property
const usersByRole = users.groupBy(user => user.role);
// { admin: [...], user: [...] }

// Remove duplicates
const uniqueRoles = users.pluck("role").unique(); // ["admin", "user"]

// Array operations
const chunked = users.chunk(2); // [[user1, user2], [user3]]
const intersection = users1.intersect(users2);
const difference = users1.difference(users2);
const union = users1.union(users2);

// Object utilities
const user = { id: 1, name: "Alice", email: "alice@example.com" };

const picked = Object.pick(user, ["name", "email"]);
const omitted = Object.omit(user, ["id"]);
const keys = Object.typedKeys(user); // Type-safe keys
```

## 📦 Package Exports

```typescript
// Main exports
import { text, switcher, duration } from 'feats';

// React-specific exports
import { useTimeout, useInterval } from 'feats/react';

// Internal classes (advanced usage)
import { TextBuilder, Switcher } from 'feats/internals';
```

## 🎯 Use Cases

- **String Building**: Generate dynamic messages, templates, or configuration files
- **State Management**: Replace complex switch statements with type-safe alternatives
- **Time Handling**: Work with durations in a consistent, immutable way
- **React Development**: Manage timeouts and intervals with better control
- **Data Processing**: Extended array and object utilities for common operations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with TypeScript for type safety
- Zero dependencies for minimal bundle size
- Tree-shakeable for optimal performance
