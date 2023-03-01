
export default function orderByPopularity(e1: any, e2: any) {
  return e1.popularity <= e2.popularity ? -1 : 1;
}
