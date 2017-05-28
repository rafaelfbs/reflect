import ExtendableError from "extendable-error";

export default class ArgumentNotFoundException extends ExtendableError {
    constructor(index: number) {
        super(`Method has no argument with index ${index}.`);
    }
}
