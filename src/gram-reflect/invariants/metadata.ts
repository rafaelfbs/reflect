import MetadataKey from "../MetadataKey";
import NoEmitMetadataException from "../exceptions/NoEmitMetadataException";
import ArgumentNotFoundException from "../exceptions/ArgumentNotFoundException";

export function checkReturnTypeInvariant(ref: object, key: string) {
    if (!Reflect.hasMetadata(MetadataKey.RETURN_TYPE, ref, key)) {
        throw new NoEmitMetadataException();
    }
}

export function checkParamTypesInvariance(ref: object, key: string) {
    if (!Reflect.hasMetadata(MetadataKey.PARAM_TYPES, ref, key)) {
        throw new NoEmitMetadataException();
    }
}

export function checkArgumentExistsInvariance(ref: object, key: string, index: number) {
    const paramTypes = Reflect.getMetadata(MetadataKey.PARAM_TYPES, ref, key);
    if (paramTypes.length <= index) {
        throw new ArgumentNotFoundException(index);
    }
}
