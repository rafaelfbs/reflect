import ExtendableError from "extendable-error";

export default class NoEmitMetadataException extends ExtendableError {
    constructor() {
        super("Method has no metadata \"design:paramtypes\". Enable \"emitDecoratorMetadata\" on tsconfig.json");
    }
}
