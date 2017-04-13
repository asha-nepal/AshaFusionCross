/* @flow */
/* global emit */
declare function emit(key: string | Array<any>): void;

/* istanbul ignore next */
function map(doc) {
  const idPartials = doc._id.split('_');
  const type = idPartials[0];
  const patientId = idPartials[1];

  if (type === 'patient') {
    emit([patientId, null, null]);
  } else if (type === 'record') {
    const createdAt = idPartials[2];
    emit([patientId, createdAt, doc.$updated_at]);
  }
}

const ddocName = 'patients_records_00000';

const ddoc = {
  _id: `_design/${ddocName}`,
  views: {
    [ddocName]: {
      map: `(${map.toString()})`,
    },
  },
};

function reduceRecordsAndSetLastRecordUpdatedAt(patientsAndRecords) {
  const records = patientsAndRecords.rows.reduce((a, b) => {
    if (b.key[1] == null) {
      // patient
      return a.concat(b.doc);
    }

    // record related to the patient
    const lastPatient = a[a.length - 1];

    const updatedAt = b.key[2] || b.key[1];

    if (!lastPatient.$last_record_updated_at) {
      lastPatient.$last_record_updated_at = updatedAt;
    } else if (lastPatient.$last_record_updated_at < updatedAt) {
      lastPatient.$last_record_updated_at = updatedAt;
    }

    return a;
  }, []);

  return records;
}

export function pouchFetchPatientList(db: PouchInstance): Promise<Array<PatientObject>> {
  return db.query(`${ddocName}/${ddocName}`, { include_docs: true })
    .then(reduceRecordsAndSetLastRecordUpdatedAt)
    .catch(() => db.put(ddoc)
      .then(() => db.query(`${ddocName}/${ddocName}`, { include_docs: true }))
      .then(reduceRecordsAndSetLastRecordUpdatedAt)
    );
}
