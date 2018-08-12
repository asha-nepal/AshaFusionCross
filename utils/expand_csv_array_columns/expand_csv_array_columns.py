"""
This script loads csv files exported by ASHA fusion
and expand columns which contain array values to separate columns like below.

Example:
    This example converts `source.csv` containing `medicines` column
    whose value is JSON-encoded array to `converted.csv`
    in which `medicines` column is expanded to separate columns
    like `medicines_0` and `medicines_1`.

        $ python expand_csv_array_columns.py \
          source.csv converted.csv --array-columns medicines diagnoses

source.csv
----
id,medicines,diagnoses
1,"[""medicine-a"",""medicine-b""]","[""diagnosis-a"",""diagnosis-b"",""diagnosis-c""]"
2,"[""medicine-c""]",
----

converted.csv
----
id,medicines_0,medicines_1,diagnoses_0,diagnoses_1,diagnoses_2
1,medicine-a,medicine-b,diagnosis-a,diagnosis-b,diagnosis-c
2,medicine-c,,,,
----
"""

import argparse
import json

import pandas as pd


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('src', type=argparse.FileType('r'))
    parser.add_argument('dst', type=argparse.FileType('w'))
    parser.add_argument('--array-columns',
                        nargs='*',
                        default=[],
                        help='Name of column(s) which contain array values')
    args = parser.parse_args()

    data = pd.read_csv(args.src)

    for array_column in args.array_columns:
        decoded_array_column = data[array_column].map(
            lambda s: json.loads(s) if isinstance(s, str) else [])

        expanded_col_num = decoded_array_column.map(len).max()
        for col_i in range(expanded_col_num):
            col_name = f'{array_column}_{col_i}'
            data[col_name] = decoded_array_column.map(
                lambda arr: arr[col_i] if len(arr) > col_i else None)

        del data[array_column]

    data.to_csv(args.dst, index=False)
