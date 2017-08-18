#
# Copyright 2017 Yuichiro Tsuchiya
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

from os.path import join, normpath, abspath, dirname
import pandas as pd
import json

BASEPATH = normpath(join(dirname(abspath(__file__)), '..'))

INFILE = join(BASEPATH, 'data', 'icd10.csv')
OUTFILE = join(BASEPATH, 'assets', 'data', 'icd10.json')

df = pd.read_csv(INFILE)

data = [dict(row) for i, row in df.iterrows()]

out = json.dumps(data)

with open(OUTFILE, 'w') as f:
    f.write(out)
