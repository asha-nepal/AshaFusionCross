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
