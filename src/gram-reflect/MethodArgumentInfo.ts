import MetadataKey from "./MetadataKey";
import {checkParamTypesInvariance} from "./invariants/metadata";

export default class MethodArgumentInfo<T extends object> {
    private ref: T;
    private key: string;
    private index: number;

    constructor(ref: T, key: string, index: number) {
        this.ref = ref;
        this.key = key;
        this.index = index;
    }

    getType() {
        checkParamTypesInvariance(this.ref, this.key);
        return Reflect.getMetadata(MetadataKey.PARAM_TYPES, this.ref, this.key)[this.index];
    }
}
