# LoggerMixin Utility

🚀 A mixin for enhanced logging capabilities in Lightning Web Components (LWC). This utility provides configurable logging behavior tailored for **production** and **sandbox** environments.

---

## 📜 **Features**

- ✅ Enables or restricts `console.log` calls based on environment.
- 🔒 Restricts logging to specific components in production using `restrictedForceLogging`.
- 🌈 Customizable log styles (e.g., text color and prefix).
- 🛠 Simplifies debugging with sandbox-specific logging controls.
- 🔄 Easily reusable via mixin patterns for shared functionality.

---
## ⚠️ Important Note
This implementation is a prototype and is not production-ready. It serves as a foundational example and requires further refinement and testing before being deployed in a live environment. Users should review and adjust the code to meet their specific requirements and ensure it adheres to best practices and security standards.

---

## 🏗 **Usage**

```javascript
import { LightningElement } from 'lwc';
import { LoggerMixin } from 'c/loggerMixin';
class MyComponent extends LightningElement{
    connectedCallback() {
        // Example log
        this.log('This is a log message from MyComponent!');
    }
}
export default LoggerMixin(MyComponent);

```

### Alternate Ways to Use Mixins in LWC
Mixins in LWC offer flexibility in how they are applied. Below are some common approaches:

#### **1. Basic Mixin Application**
Define a mixin and apply it directly to your component:
```javascript
import { LightningElement } from 'lwc';
import { LoggerMixin } from 'c/loggerMixin';

export default class ExampleComponent extends LoggerMixin(LightningElement) {
    // Your component logic here
}
```

#### **2. Combining Multiple Mixins**
You can combine multiple mixins into a single component by chaining them:
```javascript
import { LightningElement } from 'lwc';
import { LoggerMixin } from 'c/loggerMixin';
import { AnotherMixin } from 'c/anotherMixin';

export default class CombinedComponent extends LoggerMixin(AnotherMixin(LightningElement)) {
    // Your component logic here
}
```

#### **3. Configurable Mixins**
Pass parameters to customize behavior when applying the mixin:
```javascript
import { LightningElement } from 'lwc';
import { LoggerMixin } from 'c/loggerMixin';

class ConfiguredComponent extends LoggerMixin(LightningElement, 'red', 'CustomPrefix') {
    connectedCallback() {
        this.log('This is a customized log message!');
    }
}
export default LoggerMixin(ConfiguredComponent);
```
Alternatively Method to pass parameters to customize behavior when applying the mixin:
```javascript
import { LightningElement } from 'lwc';
import { LoggerMixin } from 'c/loggerMixin';

export default class ConfiguredComponent extends LoggerMixin(LightningElement, 'red', 'CustomPrefix') {
    connectedCallback() {
        super.connectedCallback();
        this.log('This is a customized log message!');
    }
}
```


For more insights into mixins in LWC, refer to [Exploring Mixins in LWC by César Parra](https://cesarparra.github.io/blog/blog/exploring-mixins-in-lwc/).

---


## 🌍 **Environment-Specific Logging**

| Environment    | Logging Behavior                                                               |
|----------------|--------------------------------------------------------------------------------|
| **Production** | Logging can be globally enabled or restricted to specific components.          |
| **Sandbox**    | Logging is enabled based on `EnableSandboxLogConsoleLogs` configuration.       |

---

## 🛠 **Properties**

| Property                  | Type       | Description                                                                          |
|---------------------------|------------|--------------------------------------------------------------------------------------|
| `activateLogging`         | `boolean`  | Enables logging in sandbox environment. Controlled by `EnableSandboxLogConsoleLogs`. |
| `forceLogging`            | `boolean`  | Enables global logging in production if set to `true`.                               |
| `restrictedForceLogging`  | `string[]` | List of component names allowed to log in production.                                |
| `isProduction`            | `boolean`  | Determines if the environment is production (`true`) or sandbox (`false`).           |

---

## ✏️ **Customization**

- **`textColor`**: Define the color of log text for better visual identification.
- **`prefix`**: Add a prefix to logs for easier component traceability.

---
## ⚠️ **Notes**
- Ensure `@salesforce/label/c.EnableProductionConsoleLogs`, `@salesforce/label/c.EnableProductionConsoleLogsRetricted`, and `@salesforce/label/c.EnableSandboxLogConsoleLogs` are properly configured in your org.
---


## 🔍 **Debugging Examples**

### Example 1: Production Logging Enabled Globally
```javascript
forceLogging = true;
restrictedForceLogging = ''; // No restrictions
```
Output:
```
console.log's are enabled globally!
```

### Example 2: Restricted Logging in Production
```javascript
forceLogging = false;
restrictedForceLogging = 'MyComponent';
```
Output:
```
console.log's are restrictly enabled!
```

### Example 3: Sandbox Logging Enabled
```javascript
enableSandboxLogConsoleLogs = 'true';
```
Output:
```
console.log's are enabled in sandbox environment!
```

---

💡 **Enhance your debugging with LoggerMixin for LWC!**
