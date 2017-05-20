import math from 'lib/mathjs';

export default {
  'asha:bmi': (height, weight) => {
    try {
      const h = math.unit(height.value, height.unit).toNumber('m');
      const w = math.unit(weight.value, weight.unit).toNumber('kg');
      return w / h ** 2;
    } catch (e) {
      return null;
    }
  },
};
