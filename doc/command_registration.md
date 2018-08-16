
## Command Registration

It all begins with a registrar...

```js
bot.register(registrar => {
    // register commands here
});
```

The `register` method will generate a new `Registrar` for you to use to register your commands with.

The registrar gives you many different options when it comes to registering commands. Anywhere from a simple callback function, to creating your own Command object and authorization requirements.

### Callback Functions

The simplemest way to register a command is to use a callback function

#### `register(command, callback, [context])`

- `command: string` The name of the command
- `callback: function(CommandInvocation): void` The callback invoked when the command is executed
- `context: any` The context to use for the callback function

#### Example

```ts
var myCallback = (invocation) => {
    // Do stuff...
};

bot.register(registrar => {
    registrar.register("testcmd", myCallback);
});
```

In some cases, you may need to specify the context of your callback function, especially when using a class method as the callback function.

```ts
class MyClass {
    myCommand (invocation) {
        // Do stuff...
    }
}

var myClass = new MyClass();

bot.register(registrar => {
    // Pass in `myClass` as the context of the callback function
    registrar.register("mycmd", myClass.myCommand, myClass);
});
```

### Multiple Callback Functions

In some cases, you may want to register a group of callback functions at once, or even group them all under a specific context

**Usage:** `register(map, [context])`

- `map: JSON Object<string, function(CommandInvocation): void>` The commands to register
- `context: any` The context to use for the callback functions

#### Example

```ts
const myCallback1 = (invocation) => { console.log("Callback 1"); };
const myCallback2 = (invocation) => { console.log("Callback 2"); };

bot.register(registrar => {
    registrar.register({
        "mycmd1": myCallback1,
        "mycmd2": myCallback2
    });
});
```

### Command Module Registration

In an object oriented approach, it can get a bit tedious having to alwasy include the context for class methods. Luckily, there's an interface to help you out!

#### `register(commandRegistrar)`

- `commandRegistrar` [ICommandRegistrar]()

#### Example

```ts
class MyModule implements ICommandRegistrar {
    myCallback (invocation) {
        // Do stuff
    }

    // Invoked upon module registration
    register (registrar) {
        // The context for this class is passed implicitly
        registrar.register("mycmd", this.myCallback);
    }
}

var myModule = new MyModule();

bot.register(registrar => {
    // Register the module
    registrar.register(myModule);
});
```

And like before, you may register multiple modules at a time

```ts
bot.register(registrar => {
    registrar.register([
        myModule1,
        myModule2,
        // ...
    ]);
});
```
