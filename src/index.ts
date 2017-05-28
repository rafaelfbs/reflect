import ClassInfo from "./gram-reflect/ClassInfo";

export { ClassInfo, getClass };

function getClass<T extends object>(target: T) {
    return new ClassInfo(target);
}
