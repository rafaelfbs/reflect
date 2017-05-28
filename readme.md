# Reflect

A reflection library for classes, methods and arguments.

## Instalation

```bash
$ npm install reflect-metadata minigram-reflect
```

## Usage

Use `getClass` to retrieve metadata information from instance class. To exemplify this library usage, we have a message bus implementation:

```typescript
import {getClass} from "minigram-reflect";

// A simple metadata decorator
function handler(target: any, key: string) {
    Reflect.defineMetadata("handler", true, target, key);
}

class MessageBus {
    dispatch(message: any) {
        // get class info
        const classInfo = getClass(this);

        // get own methods in prototype with "handler" metadata.
        const methods = classInfo.getOwnPrototypeMethodsWithMetadata("handler");
        const handler = methods.find(method => {
            // we can get the method's arity
            if (method.getArgumentsLength() > 1) return false;

            // get first argument type
            const messageArg = method.getArgument(0);
            const messageType = messageArg.getType();

            return message instanceof messageType;
        });

        if (!handler) {
            throw new Error('Handler not found for message');
        }

        // invoke method with "this" scope and some args
        return handler.invoke(message);
    }
}

class MyMessageBus extends MessageBus {
    @handler handleSomeMessage(event: SomeMessage) {
        // logic
    }
}

const messageBus = new MyMessageBus()
messageBus.dispatch(mySomeMessageInstance);
```

Without typescript, you must define metadata for parameters and return types using keys like "design:paramtypes", "design:returntype" and "design:type".

```javascript
// Calling defineMetadata
Reflect.defineMetadata("design:paramtypes", [SomeMessage], MyMessageBus.prototype, "handleSomeMessage");

// Or just write a decorator
function handlerFor(messageClass) {
    return function(target, key) {
        Reflect.defineMetadata("handler", true, target, key);
        Reflect.defineMetadata("design:paramtypes", [messageClass], target, key);
    }
}

class MyMessageBus extends MessageBus {
    @handlerFor(SomeMessage) handleSomeMessage(message) {
        // logic
    }
}
```
