/**
 * Copyright 2018 Yuichiro Tsuchiya
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

/* @flow */

import math from 'lib/mathjs';
import coefficients from './coefficients';

export default (
  value: ?ValueUnitType,
  dstUnitStr: ?string,
  coeffKey: ?string,
): ?number => {
  if (!value || !value.value || !value.unit) { return null; }
  if (!dstUnitStr) { return null; }
  if (value.unit === dstUnitStr) { return parseFloat(value.value); }

  const src = math.unit(value.value, value.unit);
  const dstUnit = math.unit(dstUnitStr);

  // When coefficient is not required
  if (src.equalBase(dstUnit)) {
    return src.toNumber(dstUnitStr);
  }

  // When coefficient is required (below)
  if (coeffKey == null) return null;

  const requiredCoeffUnit = dstUnit.divide(src);

  const coeffUnitStrs = Object.keys(coefficients);

  // Find coefficient e which satisfies dst = e * src
  const matchedCoeffUnitStr = coeffUnitStrs.find(coeffStr =>
    requiredCoeffUnit.equalBase(math.unit(coeffStr)));
  if (matchedCoeffUnitStr) {
    const matchedCoeffValue = coefficients[matchedCoeffUnitStr][coeffKey];
    if (matchedCoeffValue == null) return null;

    const coeff = math.unit(matchedCoeffValue, matchedCoeffUnitStr);
    return src.multiply(coeff).toNumber(dstUnitStr);
  }

  // Find coefficient e which satisfies dst = 1/e * src
  const matchedCoeffInvUnitStr = coeffUnitStrs.find(coeffStr =>
    requiredCoeffUnit.equalBase(math.unit(coeffStr).pow(-1)));
  if (matchedCoeffInvUnitStr) {
    const matchedCoeffValue = coefficients[matchedCoeffInvUnitStr][coeffKey];
    if (matchedCoeffValue == null) return null;

    const coeff = math.unit(matchedCoeffValue, matchedCoeffInvUnitStr);
    return src.divide(coeff).toNumber(dstUnitStr);
  }

  return null;
};
