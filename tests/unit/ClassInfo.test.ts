import "../common";
import ClassInfo from "../../src/gram-reflect/ClassInfo";
import MethodInfo from "../../src/gram-reflect/MethodInfo";
import * as Classes from "../fixtures/Classes";

describe("MethodInfo", function() {
    describe("#construct", function() {
        it("constructs an instance of given class", function() {
            const expected = new Classes.IdentityClass();
            const result = new ClassInfo(expected).construct();
            expect(result).not.toBe(expected);
            expect(result).toBeInstanceOf(Classes.IdentityClass);
        });

        it("constructs an instance of class with given params", function() {
            const key = `key${Math.random() * 10 | 0}`;
            const value = Math.random() * 1000 | 0;
            const expectedValues = { [key]: value };
            const expected = new Classes.IdentityClass(expectedValues);
            const result = new ClassInfo(expected).construct({ [key]: value });
            expect(result).toEqual(expectedValues);
        });
    });

    describe("#getType", function() {
        it("returns the type constructor of current class info", function() {
            const instance = new Classes.IdentityClass();
            const result = new ClassInfo(instance).getType();
            expect(result).toBe(Classes.IdentityClass);
        });
    });

    describe("#getOwnMethods", function() {
        it("returns a list of MethodInfo wrapping all methods defined in instance", function() {
            const instance = new Classes.SubClassWithInstanceMethods();
            const methods = new ClassInfo(instance).getOwnMethods();
            expect(methods.map(method => method.getName())).toEqual(["a", "b"]);
        });
    });

    describe("#getOwnMethodsWithMetdata", function() {
        it("returns a list of MethodInfo wrapping all methods defined in instance decorated with given metadata key", function() {
            const instance = new Classes.ClassWithInstanceMethodsDecorated();
            const methods = new ClassInfo(instance).getOwnMethodsWithMetadata("decorated");
            expect(methods.map(method => method.getName())).toEqual(["methodDecorated"]);
        });
    });

    describe("#getPrototypeMethods", function() {
        it("returns a list of MethodInfo wrapping all methods defined in class prototype", function() {
            const instance = new Classes.GreetingUser();
            const methods = new ClassInfo(instance).getOwnPrototypeMethods();
            expect(methods.map(method => method.getName())).toEqual(["greetingMessage", "greet", "greetAnonymous"]);
        });
    });

    describe("#getPrototypeMethodsWithMetadata", function() {
        it("returns a list of MethodInfo wrapping all methods defined in class prototype decorated with given metadata key", function() {
            const instance = new Classes.GreetingUser();
            const methods = new ClassInfo(instance).getOwnPrototypeMethodsWithMetadata("decorated");
            expect(methods.map(method => method.getName())).toEqual(["greet"]);
        });
    });

    describe("::getOwnMethodsOf", function() {
        it("returns a list of MethodInfo wrapping all methods defined in object reference", function() {
            const methods = ClassInfo.getOwnMethodsOf(Classes.GreetingUser.prototype);
            expect(methods.map(method => method.getName())).toEqual(["greetingMessage", "greet", "greetAnonymous"]);
        });
    });

    describe("::filterMethodsWithMetadata", function() {
        it("filters a list of MethodInfo with given metadata key", function() {
            const methods = ClassInfo.getOwnMethodsOf(Classes.GreetingUser.prototype);
            const filteredMethods = ClassInfo.filterMethodsWithMetadata(methods, "decorated");
            expect(filteredMethods.map(method => method.getName())).toEqual(["greet"]);
        });
    });
});
