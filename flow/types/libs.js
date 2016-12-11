// Work around to avoid conflict btwn immutable and fbjs type definitions
// http://stackoverflow.com/questions/40197377/flowtype-definition-of-iterable-from-immutable-js-breaks-other-libs-iterables#comment67662205_40197377
export type Iterable<+T> = $Iterable<T, void, void>;
