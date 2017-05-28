import MethodInfo from "./MethodInfo";

export default class ClassInfo<T extends object> {
    private ref: T;

    constructor(ref: T) {
        this.ref = ref;
    }

    construct(...args: any[]) {
        return Reflect.construct(this.getType(), args);
    }

    getType() {
        return Reflect.getPrototypeOf(this.ref).constructor;
    }

    getOwnMethods() {
        return ClassInfo.getOwnMethodsOf(this.ref);
    }

    getOwnMethodsWithMetadata(metadataKey: string) {
        return ClassInfo.filterMethodsWithMetadata<T>(this.getOwnMethods(), metadataKey);
    }

    getOwnPrototypeMethods() {
        const proto = <T>Reflect.getPrototypeOf(this.ref);
        return ClassInfo.getOwnMethodsOf(proto);
    }

    getOwnPrototypeMethodsWithMetadata(metadataKey: string) {
        return ClassInfo.filterMethodsWithMetadata<T>(this.getOwnPrototypeMethods(), metadataKey);
    }

    static getOwnMethodsOf<T extends object>(ref: T) {
        return Reflect.ownKeys(ref)
            .filter(it => it !== "constructor")
            .map(key => new MethodInfo(ref, <string>key));
    }

    static filterMethodsWithMetadata<T extends object>(methods: MethodInfo<T>[], metadataKey: string) {
        return methods.filter(method => method.containsMetadata(metadataKey));
    }
}
