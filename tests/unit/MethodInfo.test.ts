import "../common";
import MethodInfo from "../../src/gram-reflect/MethodInfo";
import MethodArgumentInfo from "../../src/gram-reflect/MethodArgumentInfo";
import NoEmitMetadataException from "../../src/gram-reflect/exceptions/NoEmitMetadataException";
import * as Classes from "../fixtures/Classes";

describe("MethodInfo", function() {
    describe("#containsMetadata", function() {
        it("returns true when method has given metadata key", function() {
            expect(new MethodInfo(Classes.GreetingUser.prototype, "greet").containsMetadata("decorated")).toBe(true);
            expect(new MethodInfo(Classes.GreetingUser.prototype, "greet").containsMetadata("notFound")).toBe(false);
            expect(new MethodInfo(Classes.GreetingUser.prototype, "greetAnonymous").containsMetadata("decorated")).toBe(false);
        });
    });

    describe("#getName", function() {
        it("returns the name of wrapped method", function() {
            expect(new MethodInfo(Classes.GreetingUser.prototype, "greet").getName()).toBe("greet");
            expect(new MethodInfo(Classes.GreetingUser.prototype, "greetAnonymous").getName()).toBe("greetAnonymous");
        });
    });

    describe("#getType", function() {
        it("returns the type of wrapped method", function() {
            expect(new MethodInfo(Classes.GreetingUser.prototype, "greet").getType()).toBe(String);
        });

        it("throws an error when no \"design:returntype\" metadata is defined", function() {
            expect(() => new MethodInfo(Classes.GreetingUser.prototype, "greetAnonymous").getType()).toThrowError(NoEmitMetadataException);
        });
    });

    describe("#getArgument", function() {
        it("returns a MethodArgumentInfo of argument of method at given index", function() {
            const arg = new MethodInfo(Classes.GreetingUser.prototype, "greet").getArgument(0);
            expect(arg).toBeInstanceOf(MethodArgumentInfo);
        });

        it("throws an error when no \"design:paramtypes\" metadata is defined", function() {
            expect(() => new MethodInfo(Classes.GreetingUser.prototype, "greetAnonymous").getArgument(0)).toThrow();
        });

        it("throws an error when argument at index does not exist", function() {
            expect(() => new MethodInfo(Classes.GreetingUser.prototype, "greet").getArgument(1)).toThrow();
        });
    });

    describe("#getArguments", function() {
        it("returns a list of MethodArgumentInfo wrapping all arguments defined in method", function() {
            const args = new MethodInfo(Classes.GreetingUser.prototype, "greet").getArguments();
            expect(args.map(arg => arg.getType())).toEqual([String]);
        });

        it("throws an error when no \"design:paramtypes\" metadata is defined", function() {
            expect(() => new MethodInfo(Classes.GreetingUser.prototype, "greetAnonymous").getArguments()).toThrow();
        });
    });

    describe("#getArgumentsLength", function() {
        it("returns the length of declared arguments in method", function() {
            const len = new MethodInfo(Classes.GreetingUser.prototype, "greet").getArgumentsLength();
            expect(len).toBe(1);
        });

        it("throws an error when no \"design:paramtypes\" metadata is defined", function() {
            expect(() => new MethodInfo(Classes.GreetingUser.prototype, "greetAnonymous").getArgumentsLength()).toThrow();
        });
    });

    describe("#invoke", function() {
        it("invokes the wrapped method with original scope", function() {
            expect(new MethodInfo(Classes.GreetingUser.prototype, "greet").invoke("name")).toBe("Hi, name");
        });
    });

    describe("#invokeWithScope", function() {
        it("invokes the wrapped method with given scope", function() {
            const scope = {greetingMessage: "Hello, :user"};
            expect(new MethodInfo(Classes.GreetingUser.prototype, "greet").invokeWithScope(scope, "name")).toBe("Hello, name");
        });
    });
});
