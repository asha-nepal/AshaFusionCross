/**
 * Copyright 2016 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Work around to avoid conflict btwn immutable and fbjs type definitions
// http://stackoverflow.com/questions/40197377/flowtype-definition-of-iterable-from-immutable-js-breaks-other-libs-iterables#comment67662205_40197377
export type Iterable<+T> = $Iterable<T, void, void>;
