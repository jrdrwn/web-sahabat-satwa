import { cookies } from 'next/headers';

import { columns, VisitDrug } from './columns';
import { DataTable } from './data-table';

export default async function ListVisitDrug() {
  const _cookies = await cookies();
  const res = await fetch(`${process.env.APP_URL}/api/vet/visit-drug`, {
    headers: {
      authorization: `Bearer ${_cookies.get('token')?.value}`,
    },
  });
  const json = await res.json();
  const data = json.data as VisitDrug[];
  return <DataTable data={data} columns={columns} />;
}
