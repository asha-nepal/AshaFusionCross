/* @flow */

export default function (db: PouchInstance, prefix: string): Promise<Array<PouchDocType>> {
  return db.allDocs({
    include_docs: true,
    startkey: prefix,
    endkey: `${prefix}\uffff`,
  })
  .then(res => res.rows.map(r => r.doc));
}
