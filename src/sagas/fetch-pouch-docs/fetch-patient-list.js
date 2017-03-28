/* @flow */
/* global emit */
declare function emit(key: string | Array<any>): void;

export function pouchFetchPatientList(db: PouchInstance): Promise<Array<PatientObject>> {
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

  return db.query({
    map: `(${map.toString()})`,
  }, { include_docs: true })
  .then(res => {
    const records = res.rows.reduce((a, b) => {
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
  });
}
