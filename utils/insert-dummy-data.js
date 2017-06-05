#!/usr/bin/env node

const argv = require('argv');
const PouchDB = require('pouchdb');
const Chance = require('chance');
const randomstringPromise = require('randomstring-promise').default;

argv.option([
  {
    name: 'database',
    short: 'd',
    type: 'string',
    description: 'Database name that PouchDB attempts to connect',
  },
  {
    name: 'n-patients',
    short: 'p',
    type: 'int',
    description: 'Number of patients to be generated',
  },
  {
    name: 'n-records',
    short: 'r',
    type: 'int',
    description: 'Number of records per patient',
  },
]);

const options = argv.run().options;
const database = options.database;
const nPatients = options['n-patients'];
const nRecordsPerPatient = options['n-records'];

if (!database || !nPatients || !nRecordsPerPatient) {
  argv.help();
  process.exit();
}

const db = new PouchDB(database);
const chance = new Chance();

function generateRandomPersonality() {
  const age = chance.age();
  const gender = chance.gender().toLowerCase();
  const name = chance.name({ gender });
  const address = chance.address();

  return {
    age,
    sex: gender,
    name,
    address,
  };
}

function generateRandomRecord() {
  return {
    height: { value: chance.integer({ min: 120, max: 200 }), unit: 'cm' },
    weight: { value: chance.integer({ min: 30, max: 80 }), unit: 'kg' },
    bp: {
      s: chance.integer({ min: 85, max: 150 }),
      d: chance.integer({ min: 60, max: 110 }),
    },
  };
}

const now = Date.now();

for (let iPatient = 0; iPatient < nPatients; ++iPatient) {
  randomstringPromise(16)
  .then((patientIdBody) => {
    const patient = Object.assign(generateRandomPersonality(), {
      _id: `patient_${patientIdBody}`,
      type: 'patient',
      $created_at: now,
      $updated_at: now,
    });

    db.put(patient)
    .then((resPatient) => {
      for (let iRecord = 0; iRecord < nRecordsPerPatient; ++iRecord) {
        randomstringPromise(16)
        .then((recordIdBody) => {
          const record = Object.assign(generateRandomRecord(), {
            _id: `record_${patientIdBody}_${recordIdBody}`,
            type: 'record',
            $created_at: now,
            $updated_at: now,
          });

          db.put(record)
          .then((resRecord) => {
            console.log(resRecord);
          });
        });
      }
      console.log(resPatient);
    });
  });
}
