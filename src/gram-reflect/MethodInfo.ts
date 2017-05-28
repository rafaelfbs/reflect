import MetadataKey from "./MetadataKey";
import MethodArgumentInfo from "./MethodArgumentInfo";
import * as MetadataInvariants from "./invariants/metadata";

export default class MethodInfo<T extends object> {
    private ref: T;
    private key: string;

    constructor(ref: T, key: string) {
        this.ref = ref;
        this.key = key;
    }

    containsMetadata(metadataKey: string) {
        return Reflect.hasMetadata(metadataKey, this.ref, this.key);
    }

    getName() {
        return this.key;
    }

    getType() {
        MetadataInvariants.checkReturnTypeInvariant(this.ref, this.key);
        return Reflect.getMetadata(MetadataKey.RETURN_TYPE, this.ref, this.key);
    }

    getArgument(index: number) {
        MetadataInvariants.checkParamTypesInvariance(this.ref, this.key);
        MetadataInvariants.checkArgumentExistsInvariance(this.ref, this.key, index);
        return new MethodArgumentInfo(this.ref, this.key, index);
    }

    getArguments(): Array<MethodArgumentInfo<T>> {
        MetadataInvariants.checkParamTypesInvariance(this.ref, this.key);
        const args = Reflect.getMetadata(MetadataKey.PARAM_TYPES, this.ref, this.key);
        return args.map((_: any, index: number) => new MethodArgumentInfo(this.ref, this.key, index));
    }

    getArgumentsLength() {
        MetadataInvariants.checkParamTypesInvariance(this.ref, this.key);
        return Reflect.getMetadata(MetadataKey.PARAM_TYPES, this.ref, this.key).length;
    }

    invoke(...args: any[]) {
        return this.invokeWithScope(this.ref, ...args);
    }

    invokeWithScope(scope: object, ...args: any[]) {
        return Reflect.apply(Reflect.get(this.ref, this.key), scope, args);
    }
}
