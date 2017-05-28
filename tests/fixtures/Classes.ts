
function decorated(target: object, key: string) {
    Reflect.defineMetadata("decorated", true, target, key);
}

export class IdentityClass {
    constructor(data: object = {}) {
        Object.assign(this, data);
    }
}

export class SuperClass {
    foo() {}
}

export class GreetingUser extends SuperClass {
    get greetingMessage() {
        return 'Hi, :user'
    }

    @decorated greet(user: string): string {
        return this.greetingMessage.replace(':user', user);
    }

    greetAnonymous() {
        return this.greet('User');
    }
}

export class ClassWithInstanceMethods {
    a = () => {};
}

export class SubClassWithInstanceMethods extends ClassWithInstanceMethods {
    b = () => {};
}

export class ClassWithInstanceMethodsDecorated {
    @decorated methodDecorated = () => {};
    otherMethod = () => {};
}
